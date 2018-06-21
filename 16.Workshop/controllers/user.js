const User = require('mongoose').model('User');
const Role = require('mongoose').model('Role');
const Article = require('mongoose').model('Article');
const encryption = require('./../utilities/encryption');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },

    registerPost:(req, res) => {
        let registerArgs = req.body;

        User.findOne({email: registerArgs.email}).then(user => {

            let errorMsg = '';
            
            //validation
            if (user) {
                errorMsg = 'User with the same username exists!';
            } else if (registerArgs.password !== registerArgs.repeatedPassword) {
                errorMsg = 'Passwords do not match!'
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    email: registerArgs.email,
                    passwordHash: passwordHash,
                    fullName: registerArgs.fullName,
                    salt: salt
                };

                let roles = [];
                Role.findOne({name: 'User'}).then(role => {
                    
                    roles.push(role.id);
                    //save the role on the user
                    userObject.roles = roles;
                    
                    User.create(userObject).then(user => {
                        //pushe the users to the roles
                        role.users.push(user);
                        
                        role.save(err => {
                            if(err) {
                                registerArgs.error = err.message;
                                res.render('user/register', registerArgs);
                            }
                            else {

                                req.logIn(user, (err) => {
                                    if (err) {
                                        registerArgs.error = err.message;
                                        res.render('user/register', registerArgs);
                                        return;
                                    }

                                    res.redirect('/');
                                })
                            }
                        });
                    });
                });
            }
        })
    },

    loginGet: (req, res) => {
        res.render('user/login');
    },

    loginPost: (req, res) => {

        let loginArgs = req.body;
        
        User.findOne({email: loginArgs.email}).then(user => {

            if (!user ||!user.authenticate(loginArgs.password)) {
                let errorMsg = 'Either username or password is invalid!';
                loginArgs.error = errorMsg;
                res.render('user/login', loginArgs);
                return;
            }

            req.logIn(user, (err) => {
                if (err) {
                    res.render('/user/login', {error: err.message});
                    return;
                }

                let returnUrl = '/';
                if(req.session.returnUrl) {
                    returnUrl = req.session.returnUrl;
                    delete req.session.returnUrl;
                }

                res.redirect(returnUrl);
            })
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    },

    details: (req, res) => {

        let user = req.user;

        if(!user)
        {
            res.redirect("/user/login");
        }
        else
        {

            let roleId = user.roles[0].toString();
            Role.findById(roleId).then((role) => {

                let roleName = role.name;
                let userArticles = [];

                //take all articles
                Article.find({"author": user}).populate('author')
                .then(articles => {
                
                    
                    for (const articleObj of articles) {

                        let article = articleObj;

                        userArticles.push(article);
                    }
                    
                    res.render('user/details', {
                        user,
                        userArticles,
                        roleName
                    }); 


                });


            });
       
        }
    }

};
