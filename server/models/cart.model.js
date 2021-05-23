const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item = new Schema({
    productid: String,
    quantity: Number
})

const cartSchema = new Schema({
        userid: String,
        cart:[ item ],
        method: String,
        totalprice: Number,
        complete: Boolean,
        delivered: Boolean
    }   
    ,{
        timestamps: true
    })

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart