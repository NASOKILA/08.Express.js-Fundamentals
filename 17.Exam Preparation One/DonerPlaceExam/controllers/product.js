const Product = require('mongoose').model('Product');

module.exports = {
    createGet: (req, res) => {

        if (!req.isAuthenticated()) {
            let returnUrl = '/product/create';
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        req.user.isInRole('Admin').then(isAdmin => {

            if (isAdmin) {
                res.render('product/create-product', {
                    role: "Admin",
                    username: req.user.fullName,
                    isAuthenticated: true,
                    isAdmin
                });
            }
            else {
                res.render('product/create-product', {
                    role: "User",
                    username: req.user.fullName,
                    isAuthenticated: true,
                    isAdmin
                });
            }
        });
    },

    createPost: (req, res) => {
        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        const {
            category,
            size,
            imageUrl,
            toppings
        } = req.body;

        let productArgs = req.body;

        let errorMsg = '';
        if (productArgs.category !== "chicken" && productArgs.category !== "lamb" && productArgs.category !== "beef") {
            errorMsg = 'Invalid category!';
        } else if (!productArgs.imageUrl) {
            errorMsg = 'Invalid imageUrl!';
        } else if (!productArgs.size || Number(productArgs.size) < 17 || Number(productArgs.size) > 24) {
            errorMsg = 'Invalid size!';
        }

        if (errorMsg) {

            req.user.isInRole('Admin').then(isAdmin => {

                if (isAdmin) {
                    res.render('product/create-product', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        error: errorMsg
                    });
                }
                else {
                    res.render('product/create-product', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        error: errorMsg
                    });
                }

                return;
            });
        }

        //pravim gi v ravilniq format
        Product.create({

            category,
            size: Number(size),
            imageUrl,
            toppings: toppings.split(',')

        }).then(product => {

            res.redirect('/');

        }).catch(err => {
            console.log(err);
        });
    },

    details: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect("/user/login");
            return;
        }

        let id = req.params.id;

        //with .populate('author') we attach the author object in the article
        Product.findById(id).populate('author').then(article => {
            if (!req.user) {
                res.render('product/details', { procuct: article, isUserAuthorized: false });
                return;
            }

            //With .isInRole('Admin') we check if the user is an administrator
            req.user.isInRole('Admin').then(isAdmin => {

                //user.isAuthor(article) checks if we are the author if the article
                let isUserAuthorized = isAdmin || req.user.isAuthor(article);

                res.render('article/details', { article: article, isUserAuthorized: isUserAuthorized });
            });
        });
    },

    editGet: (req, res) => {

        let id = req.params.id;

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        Product.findById(id).then(product => {
            req.user.isInRole('Admin').then(isAdmin => {

                if (!isAdmin) {
                    res.redirect('/');
                    return;
                }



                if (isAdmin) {
                    res.render('product/edit-product', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        product
                    });
                }
                else {
                    res.render('product/edit-product', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        product
                    });
                }


            });
        });
    },

    editPost: (req, res) => {

        let id = req.params.id;

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        const {
            category,
            size,
            imageUrl,
            toppings
        } = req.body;

        let productArgs = req.body;

        let errorMsg = '';
        if (productArgs.category !== "chicken" && productArgs.category !== "lamb" && productArgs.category !== "beef") {
            errorMsg = 'Invalid category!';
        } else if (!productArgs.imageUrl) {
            errorMsg = 'Invalid imageUrl!';
        } else if (!productArgs.size || Number(productArgs.size) < 17 || Number(productArgs.size) > 24) {
            errorMsg = 'Invalid size!';
        }


        if (errorMsg) {

            req.user.isInRole('Admin').then(isAdmin => {

                if (isAdmin) {
                    res.render('product/create-product', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        error: errorMsg
                    });
                }
                else {
                    res.render('product/create-product', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        error: errorMsg
                    });
                }

                return;
            });
        }

        Product.update({ _id: id }, {
            $set: {
                category,
                size: Number(size),
                imageUrl,
                toppings: toppings.split(',')
            }
        })
            .then(updateStatus => {
                res.redirect(`/`);
            })

    },

    deleteGet: (req, res) => {

        let id = req.params.id;

        if (!req.isAuthenticated()) {
            res.redirect('/user/login');
            return;
        }

        Product.findById(id).then(product => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin && !req.user.isAuthor(product)) {
                    res.redirect('/');
                    return;
                }

                if (isAdmin) {
                    res.render('product/delete-product', {
                        role: "Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        product
                    });
                }
                else {
                    res.render('product/delete-product', {
                        role: "User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,
                        product
                    });
                }
            });
        });
    },

    deletePost: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()) {

            res.redirect('/user/login');
            return;
        }

        Product.findOneAndRemove({ _id: id }).populate('author').then(product => {
            
            res.redirect('/'); 
        
        });

    },

};