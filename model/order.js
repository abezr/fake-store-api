const mongoose = require('mongoose')
const Product = require("./product");
const schema = mongoose.Schema

const orderSchema = new schema({
    id:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    address:String,
    geolocation:{
        lat:String,
        long:String
    },
    phone:String,
    date:{
        type:Date,
        required:true
    },
    products:[
        {
            productId:{
                type:schema.Types.Number,
                ref:Product,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ]
    
})

module.exports = mongoose.model('order',orderSchema)