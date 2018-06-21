

const userController = require('./../controllers/user');
const productController = require('./../controllers/product');
const homeController = require('./../controllers/home');
const adminController = require('./../controllers/admin');
const orderController = require('./../controllers/order');

module.exports = (app) => {
    

    app.get('/', homeController.index);
    
    
    app.get('/admin/users', adminController.adminUsersGet);
    
    app.get('/order/:id', orderController.order);
    app.post('/order/:id', orderController.orderPost);

    app.get('/order/details/:id', orderController.details);
    
    app.post('/status', orderController.statusPost);
    
    app.get('/myOrders', orderController.myOrders);
    app.get('/allOrders', orderController.allOrders);

    
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);
    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);
    app.get('/user/logout', userController.logout);
    app.get('/user/details', userController.details);


    app.get('/product/create', productController.createGet);
    app.post('/product/create', productController.createPost);
    app.get('/product/details/:id', productController.details);
    app.get('/product/edit/:id', productController.editGet);
    app.post('/product/edit/:id', productController.editPost);
    app.get('/product/delete/:id', productController.deleteGet);
    app.post('/product/delete/:id', productController.deletePost);
    //app.get('/product/list', productController.list);
    
    

};


