const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const address = new Schema({
    street: { type:String, trim:true },
    zipcode: { type:Number },
    city: { type:String, trim:true }
})

const userSchema = new Schema({
    username: { type:String, required:true, trim:true, unique:true, minlength:6},
    email: { type:String, required:true, trim:true, tolowercase:true, unique:true, match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    password: { type:String, required:true, select:false, minlength:6 },
    phone: { type:String, trim:true },
    addresses: { address },
    role: { type:String, required:true, trim:true, tolowercase:true }
},{
    timestamps: true,
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next();
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE 
    })
}

const User = mongoose.model('User',userSchema);

module.exports = User;