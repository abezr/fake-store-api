const mongoose = require('mongoose')
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
    phone:String
})

module.exports = mongoose.model('order',orderSchema)