const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const Store = require('../models/model');
const config = require('../config');


module.exports = server => {

    //get exporter
    server.get('/exporter', async (req ,res, next) =>{
        try{
            const exporters = await Store.exporter.find({});
            res.send(exporters);
        next();
        }
        catch (err) {
            return next(new errors.InvalidContentError(err))
        }
    });

    //get a single exporter
    server.get('/exporter/:id', async (req ,res, next) =>{
        try{
            const exporter = await Store.exporter.findById(req.params.id);
            res.send(exporter);
        next();
        }
        catch (err) {
            return next(new errors.ResourceNotFoundError(
                `There is no product with the id of ${req.param.id}`
            )
            );
        }
    });

    //Add exporter
    server.post('/exporter', rjwt({secret: config.JWT_SECRET}), async (req ,res ,next) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
        }

const {name, tel, products} = req.body;
const exporter = new Store.exporter({
 name,
 tel,
 products
});

try{

    const newExporter = await exporter.save();
    res.send(201);
    next();
} catch (err){
    return next(new errors.InternalError(err.message));
}
    });

    //update exporter
    server.put('/exporter/:id',rjwt({secret: config.JWT_SECRET}), async (req ,res ,next) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return next( new errors.InvalidContentError("Expect 'application/json'"));
        }
try{

    const exporter = await Store.exporter.findOneAndUpdate({ _id: req.params.id}, 
        req.body);
    res.send(200);
    next();
} catch (err){
    return next(new errors.ResourceNotFoundError(
        `There is no exporter with the id of ${req.params.id}`
    )
        );
}
    });

    //delete exporter
    server.del('/exporter/:id',rjwt({secret: config.JWT_SECRET}), async (req, res, next) => {
        try{
            const exporter = await Store.exporter.findOneAndRemove({_id: req.params.id});
            res.send(204);
            next();
        }catch(err){
            return next(new errors.ResourceNotFoundError(
                `There is no exporter with the id of ${req.params.id}`
             )
                );
        }
    });
};