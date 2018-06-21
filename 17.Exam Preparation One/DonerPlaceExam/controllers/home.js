const mongoose = require('mongoose');
const Product = mongoose.model('Product');

module.exports = {
    index: (req, res) => {

        Product.find({}).then(products => {

            let chickenDoners = products.filter(p => p.category === "chicken");
            let beefDoners = products.filter(p => p.category === "beef");
            let lambDoners = products.filter(p => p.category === "lamb");

            if (!req.isAuthenticated()) {
                res.render('home/index', {
                    chickenDoners,
                    beefDoners,
                    lambDoners
                });
                return;

            }
            req.user.isInRole('Admin').then(isAdmin => {

                if (isAdmin)
                {
                    res.render('home/index-admin', {
                        role:"Admin",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,   
                        chickenDoners,
                        beefDoners,
                        lambDoners
                    });
                }
                else
                {                    
                    res.render('home/index', {
                        role:"User",
                        username: req.user.fullName,
                        isAuthenticated: true,
                        isAdmin,   
                        chickenDoners,
                        beefDoners,
                        lambDoners
                    });
                }
                
            });



        });
    }
};