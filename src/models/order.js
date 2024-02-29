"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "userId": "652d71b9c31f8eecbf12519b",
    "pizzaId": "652d71bfc31f8eecbf12519f",
    "size": "Small",
    "quantity": 2,
    "price": 99.99
}
/* ------------------------------------------------------- */
// Order Model:

const passwordEncrypt = require('../helpers/passwordEncrypt')

const OrderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reqired: true,
    },

    pizzaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pizza',
        reqired: true,
    },

    size: {
        type: String,
        trim: true,
        reqired: true,
        enum: ['Small', 'Medium', 'Large', 'XLarge']
    },

    quantity: {
        type: Number,
        default: 1
        // reqired: true,
    },

    price: {
        type: Number,
        default: 0
        // reqired: true,
    },

    totalPrice: Number

}, {collection: 'orders', timestamps: true})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Order', OrderSchema)