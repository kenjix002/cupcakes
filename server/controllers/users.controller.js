const User = require('../models/user.model');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.register = (req,res,next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = "member";

    const newUser = new User({
        username,
        email,
        password,
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
    const user = User.findOne({_id:id})
        .then( user => res.json(user))
        .catch( err => res.status(401).json("Error: " + err ))
}

exports.getUserPage = async (req,res) => {
    const username = req.body.username;
    const role = req.body.role;

    const user = await getUser(username);

    const pending = await getCart(role,user._id,"pending");
    const complete = await getCart(role,user._id,"complete");
    
    res.json({
        pending:pending,
        complete:complete
    })
}

async function getUser(username){
    let result;
    await User.findOne({username:username})
        .then( user =>{result = user})    
    return result;
}

async function getCart(role,userid,status){ 
    
    let filter = {
        complete:true,
        delivered: (status === "complete") ? true : false
    }
    if(role !== "admin"){
        filter.userid = userid
    };

    let carts;
    carts = await Cart.find(filter);
    carts = await appendInfoToCart(carts); 
    
    return carts;
}

async function appendInfoToCart(carts){
    let result;
    result = await Promise.all(carts.map( async cart => {

        let userinfo = await getUserInfo(cart.userid);

        cart._doc.phone = userinfo.phone;
        cart._doc.address = userinfo.address;

        let itemWithProductName = await Promise.all(cart.cart.map( async product => {
            productname = await getProductName(product.productid);
            product._doc.name = productname;
            return product;
        }))

        cart._doc.cart = itemWithProductName;

        return cart;
    }))
    return result;
}

async function getUserInfo(userid){
    let result;
    await User.findOne({_id:userid})
        .then( user => {
            result = {
                phone:user.phone,
                address:user.address
            }
        })
    return result;
}

async function getProductName(productid){
    let result;
    await Product.findOne({_id:productid})
        .then(product => {
            result = product.name;
        })
    return result;
}

exports.updateDeliveryStatus = (req,res)=>{
    const status = req.body.status;
    const cartid = req.body.cartid;
    let data;
    if (status === "Completed"){
        data = {
            deliveryStatus:status,
            delivered:true
        }
    }
    else {
        data = {deliveryStatus:status}
    }

    Cart.findOneAndUpdate({_id:cartid},data)
        .then(()=>res.json("Cart Status Updated!"))
}