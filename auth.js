const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Store = mongoose.model('employee');

exports.authenticate = (username , password) => {
    return new Promise(async (resolve, reject) => {
        try{
            //Get employee by username
            const employee = await Store.findOne({username});

            //Match password
            bcrypt.compare(password, employee.password, (err, isMatch) => {
                if(err) throw err ;
                if(isMatch){
                    resolve(employee);
                } else {
                    //password didn't match
                    reject('Authenticate Faild');
                }
            });
        } catch (err){
            //username not Found
            reject('Authenticate Faild');
        }
    });
}