let User = require('../models/user.model');

exports.register = (req,res,next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const addresses = req.body.addresses;
    const role = "member";

    const newUser = new User({
        username,
        email,
        password,
        phone,
        addresses,
        role
    })

    newUser.save()
        .then(()=>sendToken(newUser,201,res))
        .catch( err=>  res.status(400).json('Error: ' + err))
}

exports.login = async (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password){
        res.status(404).json("Please input username/password");
    }

    const user = await User.findOne({username}).select("+password");

    if (!user){
        res.status(404).json("Invalid User/Password");
    }

    const isMatch = await user.matchPassword(password);

    if (isMatch){
        sendToken(user,201,res)
    }
    else {
        res.status(404).json("Invalid User/Password");
    }    
}

const sendToken = (user,statusCode,res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({id:user._id,token})
}

exports.getOneUser = (req,res)=>{
    const id = req.query.id;
    const user = User.findOne({_id:id}).select({"username":1,"role":1})
        .then( user => res.json(user))
        .catch( err => res.status(401).json("Error: " + err ))
}