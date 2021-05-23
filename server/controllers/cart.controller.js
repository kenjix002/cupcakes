const User = require("../models/user.model");
const Cart = require("../models/cart.model");

exports.addItem = async (req,res) => {
    const user = req.body.user;
    const productid = req.body.productid;
    const quantity = req.body.quantity;
    
    let userid = await getUserId(user);
    
    let newProduct = {
        productid,
        quantity
    }  
    
    await Cart.findOne({userid:userid,complete:false})
        .then( async cart =>{
            if ( cart === null) {return await addNewCart(userid,newProduct,res)};
                        
            let cartArray = [...cart.cart]           
        
            let cartindex = cart.cart.map( item => item.productid)
                                        .indexOf(productid);
                        
            if (cartindex !== -1){
                cart.cart[cartindex].quantity += 1;
            }
            else {
                cartArray = [...cart.cart,newProduct];
            }
            
            await Cart.findOneAndUpdate({userid:userid,complete:false},{cart:cartArray})
                .then( () => res.json("added item to existing cart item"))
                .catch(err=>{res.status(400).json({error:err})})
        })    
        .catch(err=>{res.status(400).json({error:err})})
}

async function getUserId(username){
    let id = ""
    await User.findOne({username:username})
        .then( user =>{id = user._id})    
    return id;
}

async function addNewCart(userid,product,res){    
    console.log("add new item")
    const newCart = new Cart({
        userid,        
        cart: [product],
        complete:false,
        delivered:false,     
    })
    await newCart.save()        
        .then( () => res.json("new cart added!"))
}

exports.findCart = async (req,res) => {    
    const user = req.query.user;
    const userid = await getUserId(user);    

    Cart.findOne({userid:userid,complete:false})
        .then( cart => res.json(cart) )
        .catch( err => res.status(400).json({error:err}))
}

exports.removeCartItem = async (req,res) => {
    const id = req.body.id;
    const index = req.body.index;
    const productid = req.body.productid;

    Cart.findOne({_id:id})
        .then( cart =>{
            let productindex = cart.cart.map( item =>{return item.productid}).indexOf(productid);        
            cart.cart.splice(productindex,1);

            Cart.findOneAndUpdate({_id:id},{cart:cart.cart})
                .then(()=>console.log("removed item"))
        })
}

exports.complete = async (req,res) => {
    const username = req.body.user;
    const cartid = req.body.cartid;

    const cart = {
        method : req.body.method,
        totalprice : req.body.totalprice,
        complete : req.body.complete,
        date : req.body.date,
        deliveryStatus: "Waiting Pickup"
    }

    const userdata = {        
        phone : req.body.phone,
        address:{
            street : req.body.street,
            zipcode : req.body.zipcode,
            city : req.body.city
        }
    }

    const userid = await getUserId(username);

    Cart.findOneAndUpdate({_id:cartid},cart)
        .then(cart=>console.log("cart completed"))    

    User.findOneAndUpdate({_id:userid},userdata)
        .then(user => console.log("user updated"))
}