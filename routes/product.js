const errors = require('http-errors');
const rjwt = require('restify-jwt-community');
const Store = require('../models/model');
const config = require('../config');


module.exports = server => {

    //get product
    server.get('/product', async (req ,res, next) =>{
        try{
            const products = await Store.product.find({});
            res.json(products);
        } catch (err) {
            return next(new errors(400, err))
        }
    });

    //get a single product
    server.get('/product/:id', async (req ,res, next) =>{
        try{
            const product = await Store.product.findById(req.params.id);
            res.json(product);
        } catch (err) {
            return next(new errors(404, `There is no product with the id of ${req.param.id}`));
        }
    });

    //Add product
    server.post('/product', rjwt({secret: config.JWT_SECRET}), async (req ,res ,next) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return next( new errors(400, "Expect 'application/json'"));
        }

        const {name, productionDate, expirationDate, quentity, type, price} = req.body;
        const product = new Store.product({
            name,
            productionDate,
            expirationDate,
            quentity,
            type,
            price
        });

        try{

            const newProdcut = await product.save();
            res.sendStatus(201);
        } catch (err){
            return next(new errors(500, err.message));
        }
    });

    //update product
    server.put('/product/:id',rjwt({secret: config.JWT_SECRET}), async (req ,res ,next) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return next( new errors(400, "Expect 'application/json'"));
        }
        try{

            const product = await Store.product.findOneAndUpdate({ _id: req.params.id}, 
                req.body);
            res.sendStatus(200);
        } catch (err){
            return next(new errors(404, `There is no Product with the id of ${req.params.id}`));
        }
    });

    //delete customer
    server.delete('/product/:id',rjwt({secret: config.JWT_SECRET}), async (req, res, next) => {
        try{
            const customer = await Store.product.findOneAndRemove({_id: req.params.id});
            res.sendStatus(204);
        }catch(err){
            return next(new errors(404, `There is no customer with the id of ${req.params.id}`));
        }
    });
};