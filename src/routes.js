const express = require('express');

const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const UserController = require('./controllers/UserController');

//Product routes
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);
//User routes
routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user', UserController.store);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.destroy);
routes.post('/user/login', UserController.login);
routes.post('/user/login-facebook', UserController.loginWithFacebook);

module.exports = routes;