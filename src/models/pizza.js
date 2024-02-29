"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
  "name": "Pizza Margarita",
  "price": 124.99,
  "toppings": [
    "652d71b9c31f8eecbf12519b",
    "652d71bcc31f8eecbf12519d",
    "652d71bfc31f8eecbf12519f"
  ]
}
/* ------------------------------------------------------- */
// Pizza Model:

const passwordEncrypt = require('../helpers/passwordEncrypt')

const PizzaSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        reqired: true,
        unique: true
    },

    image: {
        type: String,
        trim: true
    },

    price: {
        type: Number,
        reqired: true,
    },

    toppings: [ // push, pull
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topping'
        }
    ]


}, {collection: 'pizzas', timestamps: true})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Pizza', PizzaSchema)