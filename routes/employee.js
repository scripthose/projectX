const errors = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Store = require('../models/model');
const auth = require('../auth');
const config = require('../config');

module.exports = server => {
    //Register employee
server.post('/register', (req, res, next) => {
    const {name, tel, username, password } = req.body;

    const employee = new Store.employee({
        username,
        password,
        name,
         tel
    });

    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(employee.password, salt, async (err, hash) =>{
            //Hash Password
            employee.password = hash;
            //Save Employee
            try {
                const newEmployee = await employee.save();
                res.send(201);
                next();
            }catch (err){
                return  next(new errors(500, err.message));
            }
        });
    });
});
    //Auth employee
    server.post('/auth', async (req, res, next) => {
        const {username, password} = req.body;
         try{
            //Authenticate employee
            const employee = await auth.authenticate(username, password);

            //Create Jwt
            const token = jwt.sign(employee.toJSON(), config.JWT_SECRET , {
                expiresIn: '15m'
            });

            const {iat, exp} = jwt.decode(token);
            //respond with token
            res.json({iat, exp, token});

            next();

         } catch (err){
            //Employee unauthorized
            return next(new errors(401, err));
         }
    });
};
