const errors = require('http-errors');
const rjwt = require('restify-jwt-community');
const Store = require('../models/model');
const config = require('../config');


module.exports = server => {

    //get exporter
    server.get('/exporter', async (req ,res, ) =>{
        try{
            const exporters = await Store.exporter.find({});
            res.json(exporters);
        }
        catch (err) {
            return (new errors(400, err))
        }
    });

    //get a single exporter
    server.get('/exporter/:id', async (req ,res, ) =>{
        try{
            const exporter = await Store.exporter.findById(req.params.id);
            res.json(exporter);
        }
        catch (err) {
            return (new errors(404,`There is no product with the id of ${req.param.id}`));
        }
    });

    //Add exporter
    server.post('/exporter', rjwt({secret: config.JWT_SECRET}), async (req ,res ,) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return (new errors(400, "Expect 'application/json'"));
        }

        const {name, tel, products} = req.body;
        const exporter = new Store.exporter({
            name,
            tel,
            products
        });

        try{
            const newExporter = await exporter.save();
            res.sendStatus(201);
        } catch (err){
            return (new errors(500, err.message));
        }
    });

    //update exporter
    server.put('/exporter/:id',rjwt({secret: config.JWT_SECRET}), async (req ,res ,) => {
        //check for JSON 
        if(!req.is('application/json')) {
            return ( new errors(400, "Expect 'application/json'"));
        }

        try{
            const exporter = await Store.exporter.findOneAndUpdate({ _id: req.params.id}, 
                req.body);
            res.sendStatus(200);
        } catch (err){
            return (new errors(404, `There is no exporter with the id of ${req.params.id}`));
        }
    });

    //delete exporter
    server.delete('/exporter/:id',rjwt({secret: config.JWT_SECRET}), async (req, res, ) => {
        try{
            const exporter = await Store.exporter.findOneAndRemove({_id: req.params.id});
            res.sendStatus(204);
        }catch(err){
            return (new errors(404, `There is no exporter with the id of ${req.params.id}`));
        }
    });
};