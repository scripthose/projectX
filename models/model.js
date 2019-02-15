const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

//Employee Schem

const EmployeeSchema = new Schema({
    name:{
        type:String,
        required : true,
        trim: true
    },
    username:{
        type:String,
        required : true,
        trim: true
    },
    password:{
        type:String,
        required : true,
        trim: true
    },
    tel:{
        type:Number,
        required : true
    },
    catchTime:{
        default:Date.now
    }
});

//Store Schema
const StorageSchema = new Schema({
    address:{
        type:String,
        required : true
    },
    capacity:{
        type:Number,
        required : true
    },
    emp_id:{
        type:String,
        required:true
    },
    prod_id:{
        type:String
    }
});

//Product Schema
const ProductSchema = new Schema({
    name:{
        type:String,
        required : true
    },
    productionDate:{
        type:Date,
        required : true
    },
    expetDate:{
        type:Date,
        required : true
    },
    quentity:{
        type:Number,
        required : true
    },
    exporter:{
        type:Number,
        required : true
    },
    type:{
        type:String,
        required : true
    },
    price:{
        type:Number,
        required : true
    },
    name:{
        type:String,
        required : true
    },
    stor_id:{
        type:String,
        required : true
    }
});

const ExporterSchema  = new Schema({
    name:{
        type:String,
        required : true
    },
    tel:{
        type:Number,
        required : true
    },
    Prod_id:{
        type:String,
        required : true
    }
});

Employee.plugin(timestamp);

const employee = mongoose.model('employee', EmployeeSchema);
const storage = mongoose.model('storage', StorageSchema);
const product = mongoose.model('product', ProductSchema);
const exporter = mongoose.model('scriptors', ExporterSchema);


// exporting the models outside of the
module.exports = {
	employee,
	storage,
	product,
	exporter
}
