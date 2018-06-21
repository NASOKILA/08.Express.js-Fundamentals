const mongoose = require('mongoose');
const Article = mongoose.model('Article');

module.exports = {
    index: (req, res) => {


        Article.find({}).limit(6).populate('author').then(articles => {

            let user = req.user;

            if (!req.isAuthenticated()) {
                res.render('home/index', {
                    articles: articles,
                    user: user,
                    isAdmin: false
                });
            }
            else {

                user.isInRole('Admin').then(isAdmin => {


                    for (const article of articles) {
                        article.isAuthenticated = true
                    }

                    res.render('home/index', {
                        articles: articles,
                        user: user,
                        isAdmin,
                    });
                });
            }


        });

    }
};