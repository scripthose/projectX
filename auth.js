const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const employee = mongoose.model('employee');

exports.authenticate = (username , password) => {
    return new Promise(async (resolve, reject) => {
        try{
            //Get employee by username
            const emp = await employee.findOne({username});
            
            //Match password
            bcrypt.compare(password, emp.password, (err, isMatch) => {
                if (err) reject('Authenticate Faild');
                if(isMatch){
                    resolve(emp);
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
