const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    email:{
            type : String,
            require:true,
            unique:true,
    },

    
    phone:{
        type : String,
        require:true,
        unique:true,
    },
    password:{
        type :String,
        require:true,
    },
    upiId:{
        type:String,
        unique:true,

    },
    balance:{
        type:Number,
        default:0,
    },
    mpin:{
        type:String,
        
    }

}, {timestamps:true});

const User = mongoose.model('User',userSchema);
module.exports = User;