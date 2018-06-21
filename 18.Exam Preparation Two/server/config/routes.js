const usersModule = require('../modules/usersModule');
const homeModule = require('../modules/homeModule');

const auth = require('../infrastructure/auth');

module.exports = (app) => {
    app.get('/', homeModule.index);
    app.get('/about', homeModule.about);

    app.get('/users/login', usersModule.loginGet);
    app.post('/users/login', usersModule.loginPost);
    app.get('/users/register', usersModule.registerGet);
    app.post('/users/register', usersModule.registerPost);
    app.get('/users/logout', usersModule.logout);

}
