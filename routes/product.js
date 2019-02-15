const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Store = require('../models/model');
const config = require('../config');


module.exports = server => {

    //get product
    server.get('/product', async (req ,res, next) =>{
        try{
            const products = await Store.product.find({});
            res.send(products);
        next();
        }
        catch (err) {
            return next(new errors.InvalidContentError(err))
        }
    });

    //get a single product
    server.get('/product/:id', async (req ,res, next) =>{
        try{
            const product = await Store.product.findById(req.params.id);
            res.send(product);
        next();
        }
        catch (err) {
            return next(new errors.ResourceNotFoundError(
                `There is no product with the id of ${req.param.id}`
            )
            );
        }
    });

    //Add product
    server.post('/product', rjwt({secret: config.JWT_SECRET}), async (req ,res ,next) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
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
    res.send(201);
    next();
} catch (err){
    return next(new errors.InternalError(err.message));
}
    });

    //update product
    server.put('/product/:id',rjwt({secret: config.JWT_SECRET}), async (req ,res ,next) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
        }
try{

    const product = await Store.product.findOneAndUpdate({ _id: req.params.id}, 
        req.body);
    res.send(200);
    next();
} catch (err){
    return next(new errors.ResourceNotFoundError(
        `There is no Product with the id of ${req.params.id}`
    )
        );
}
    });

    //delete customer
    server.del('/product/:id',rjwt({secret: config.JWT_SECRET}), async (req, res, next) => {
        try{
            const customer = await Store.product.findOneAndRemove({_id: req.params.id});
            res.send(204);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(
                `There is no customer with the id of ${req.params.id}`
             )
                );
        }
    });
};