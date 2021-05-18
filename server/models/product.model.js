const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: { type:String, required:true },
    name: { type:String, required:true, trim:true, lowercase:true },
    price: {type:Number, required:true },
    ingredients: [ String ]
},{
    timestamps: true,
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;