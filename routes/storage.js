const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Store = require('../models/model');
const config = require('../config');


module.exports = server => {

    //get storage
    server.get('/storage', async (req ,res, next) =>{
        try{
            const storages = await Store.storage.find({});
            res.send(storages);
        next();
        }
        catch (err) {
            return next(new errors.InvalidContentError(err))
        }
    });

    //get a single storage
    server.get('/storage/:id', async (req ,res, next) =>{
        try{
            const storage = await Store.storage.findById(req.params.id);
            res.send(storage);
        next();
        }
        catch (err) {
            return next(new errors.ResourceNotFoundError(
                `There is no storage with the id of ${req.param.id}`
            )
            );
        }
    });

    //Add storage
    server.post('/storage', rjwt({secret: config.JWT_SECRET}), async (req ,res ,next) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
        }

const {location, capacity, storageManger, products} = req.body;
const storage = new Store.storage({
 location,
 capacity,
 storageManger,
 products
});

try{

    const newStorag = await storage.save();
    res.send(201);
    next();
} catch (err){
    return next(new errors.InternalError(err.message));
}
    });

    //update storage
    server.put('/storage/:id',rjwt({secret: config.JWT_SECRET}), async (req ,res ,next) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
        }
try{

    const storage = await Store.storage.findOneAndUpdate({ _id: req.params.id}, 
        req.body);
    res.send(200);
    next();
} catch (err){
    return next(new errors.ResourceNotFoundError(
        `There is no Storage with the id of ${req.params.id}`
    )
        );
}
    });

    //delete storage
    server.del('/storage/:id',rjwt({secret: config.JWT_SECRET}), async (req, res, next) => {
        try{
            const storage = await Store.storage.findOneAndRemove({_id: req.params.id});
            res.send(204);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(
                `There is no storage with the id of ${req.params.id}`
             )
                );
        }
    });
};