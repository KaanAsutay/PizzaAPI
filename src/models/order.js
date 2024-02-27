"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
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
        reqired: true,
    },

    price: {
        type: Number,
        reqired: true,
    },

    totalPrice: Number

}, {collection: 'orders', timestamps: true})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Order', OrderSchema)