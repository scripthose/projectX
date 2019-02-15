const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

//Employee Schem

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tel: {
        type: Number,
        required: true
    },
    catchTime: {
        default: Date.now
    }
});

//Store Schema
const StorageSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    storageManger: {
        type: Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
});

//Product Schema
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    productionDate: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    quentity: {
        type: Number,
        required: true
    },
    exporter: {
        type: Schema.Types.ObjectId,
        ref: 'exporter',
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    stor_id: {
        type: Schema.Types.ObjectId,
        ref: 'storage',
        required: true
    }
});

const ExporterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    Prod_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }
});

EmployeeSchema.plugin(timestamp);

const employee = mongoose.model('employee', EmployeeSchema);
const storage = mongoose.model('storage', StorageSchema);
const product = mongoose.model('product', ProductSchema);
const exporter = mongoose.model('exporter', ExporterSchema);


// exporting the models outside of the
module.exports = {
    employee,
    storage,
    product,
    exporter
}
