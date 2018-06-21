const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Order = mongoose.model('Order');

module.exports = {
   
    statusPost: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect("/user/login");
            return;
        }

        let params = [];     
        for(let orderId in req.body){
        
            let newStatus = req.body[orderId]; 
            params.push({
                orderId,
                newStatus
            });

        }


        for(let i = 0; i < params.length; i++)
        {
                let orderId = params[i].orderId;
                let status = params[i].newStatus;



                Order.update({ _id: orderId }, {
                    $set: {
                        status:status,                    }
                })
                .then(orderUpdated => {

                    console.log("Order updated!")
                    if(i === params.length - 1)
                    {
                      res.redirect("/");
                      return;
                    }

                })
                .catch((err) => console.log(err));

        }
    },

    myOrders: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect("/user/login");
            return;
        }

        Order.find({ "creator": req.user }).populate('product').then(ordersArr => {

            req.user.isInRole('Admin').then(isAdmin => {


                let orders = ordersArr.filter(o => o.product !== null);


                if (isAdmin) {

                    res.render('order/order-status-admin', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        orders
                    });
                }
                else {

                    res.render('order/order-status', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        orders
                    });

                }

            });


        });

    },

    allOrders: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect("/user/login");
            return;
        }

        Order.find({}).populate('product').then(ordersArr => {

            req.user.isInRole('Admin').then(isAdmin => {


                let orders = ordersArr.filter(o => o.product !== null);


                let orderArr = orders;


                if (isAdmin) {

                    res.render('order/order-status-admin', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        orders

                    });
                }
                else {

                    res.render('order/order-status', {
                        orders,
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                    });

                }


            });
        });

    },

    order: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        let id = req.params.id;

        Product.findById(id).then((product) => {

            req.user.isInRole('Admin').then(isAdmin => {

                let role = "User";
                if (isAdmin)
                    role = "Admin";

                let toppings = [];

                for (const topp of product.toppings) {

                    toppings.push({ name: topp.toString() });
                }

                res.render('order/customize-order', {
                    role,
                    username: req.user.fullName,
                    isAuthenticated: true,
                    isAdmin,
                    product,
                    toppings
                });

            });


        });

    },

    orderPost: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }


        let params = req.body;

        let id = params["productId"];

        let date = new Date(Date.now()).toLocaleString();

        //let categoryName = product.category.charAt(0).toUpperCase() + product.category.slice(1);        

        let toppings = [];

        for (const index in params) {
            let topp = params[index];

            if (topp !== id)
                toppings.push(topp);
        }

        Product.findById(id).then((product) => {

            Order.create({
                creator: req.user,
                product: product,
                date,
                toppings

            }).then((order) => {

                res.redirect("/order/details/" + order.id)

            }).catch((err) => console.log(err));

        });

    },

    details: (req, res) => {


        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        let id = req.params["id"];

        Order.findById(id).then((order) => {

            req.user.isInRole('Admin').then(isAdmin => {

                let role = "User";
                if (isAdmin)
                    role = "Admin";

                let productId = order.product.toString();

                Product.findById(productId).then((product) => {

                    let categoryName = product.category.charAt(0).toUpperCase() +
                        product.category.slice(1);

                    let toppings = [];
                    let date = order.date;

                    for (let i = 0; i < order.toppings.length; i++) {
                        let topp = order.toppings[i];
                        toppings.push({ name: topp });
                    }

                    let status = "";
                    //to finish status
                    if (order.status === "Pending") {
                        status = '<div class="status-block">' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint current"></span><br>' +
                            'Pending' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'In progress' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'In transit' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'Delivered' +
                            '</div>'
                    } else if (order.status === "In Progress") {
                        status = '<div class="status-block">' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'Pending' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint current"></span><br>' +
                            'In progress' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'In transit' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'Delivered' +
                            '</div>'
                    } else if (order.status === "In Transit") {
                        status = '<div class="status-block">' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'Pending' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'In progress' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint current"></span><br>' +
                            'In transit' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'Delivered' +
                            '</div>'
                    } else if (order.status === "Delivered") {
                        status = '<div class="status-block">' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'Pending' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'In progress' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="progress-right"></span>' +
                            '<span class="checkpoint"></span><br>' +
                            'In transit' +
                            '</div>' +
                            '<div class="status-block">' +
                            '<span class="progress-left"></span>' +
                            '<span class="checkpoint current"></span><br>' +
                            'Delivered' +
                            '</div>'
                    }


                    res.render('order/order-details', {
                        role,
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        product,
                        categoryName,
                        toppings,
                        date,
                        status
                    });

                });
            });


        });


        //To finish

    }
};  