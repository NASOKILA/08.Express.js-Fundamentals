const Article = require('mongoose').model('Article');

module.exports = {
    createGet: (req, res) => {
        if (!req.isAuthenticated()) {
            let returnUrl = '/article/create';
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        res.render('article/create');
    },

    createPost: (req, res) => {
        if (!req.isAuthenticated()) {
            let returnUrl = '/article/create';
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        let articleArgs = req.body;

        let errorMsg = '';
        if (!articleArgs.title) {
            errorMsg = 'Invalid title!';
        } else if (!articleArgs.content) {
            errorMsg = 'Invalid content!';
        }

        if (errorMsg) {
            res.render('article/create', { error: errorMsg });
            return;
        }

        articleArgs.author = req.user.id;
        Article.create(articleArgs).then(article => {
            req.user.articles.push(article.id);
            req.user.save(err => {
                if (err) {
                    res.redirect('/', { error: err.message });
                } else {
                    res.redirect('/');
                }
            });
        })
    },

    details: (req, res) => {

        if(!req.isAuthenticated())
        {
            res.redirect("/user/login");
            return;
        }

        let id = req.params.id;

        //with .populate('author') we attach the author object in the article
        Article.findById(id).populate('author').then(article => {
            if (!req.user) {
                res.render('article/details', { article: article, isUserAuthorized: false });
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

    list: (req, res) => {

        if (!req.isAuthenticated()) {
            res.redirect("/user/login");
            return;
        }

        Article.find({}).limit(6).populate('author').then(articles => {

           
                req.user.isInRole('Admin').then(isAdmin => {

                    if(isAdmin)
                    {
                        //if we are admins we have CRUD authorization for all the articles
                        for (const article of articles) {
                                article.isUserAuthorized = true;
                        }
                    }
                    else
                    {
                        //if we are NOT admins we have CRUD credentials only for our articles
                        for (const article of articles) {
                            if (req.user.isAuthor(article)) {
                                article.isUserAuthorized = true;
                            }
                        }
                    }



                    res.render('article/list', {
                        articles: articles,
                        user: req.user,
                        isAdmin
                    });
                });
            


        });


    },

    editGet: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()) {
            let returnUrl = `/article/edit/${id}`;
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        Article.findById(id).then(article => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin && !req.user.isAuthor(article)) {
                    res.redirect('/');
                    return;
                }

                res.render('article/edit', article)
            });
        });
    },

    editPost: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()) {
            let returnUrl = `/article/edit/${id}`;
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        let articleArgs = req.body;

        let errorMsg = '';
        if (!articleArgs.title) {
            errorMsg = 'Article title cannot be empty!';
        } else if (!articleArgs.content) {
            errorMsg = 'Article content cannot be empty!'
        }

        if (errorMsg) {
            res.render('article/edit', { error: errorMsg })
        } else {
            Article.update({ _id: id }, { $set: { title: articleArgs.title, content: articleArgs.content } })
                .then(updateStatus => {
                    res.redirect(`/article/details/${id}`);
                })
        }
    },

    deleteGet: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()) {
            let returnUrl = `/article/delete/${id}`;
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        Article.findById(id).then(article => {
            req.user.isInRole('Admin').then(isAdmin => {
                if (!isAdmin && !req.user.isAuthor(article)) {
                    res.redirect('/');
                    return;
                }

                res.render('article/delete', article)
            });
        });
    },

    deletePost: (req, res) => {
        let id = req.params.id;

        if (!req.isAuthenticated()) {
            let returnUrl = `/article/delete/${id}`;
            req.session.returnUrl = returnUrl;

            res.redirect('/user/login');
            return;
        }

        Article.findOneAndRemove({ _id: id }).populate('author').then(article => {
            let author = article.author;

            // Index of the article's ID in the author's articles.
            let index = author.articles.indexOf(article.id);

            if (index < 0) {
                let errorMsg = 'Article was not found for that author!';
                res.render('article/delete', { error: errorMsg })
            } else {
                // Remove count elements after given index (inclusive).
                let count = 1;
                author.articles.splice(index, count);
                author.save().then((user) => {
                    res.redirect('/');
                });
            }
        })
    }
};