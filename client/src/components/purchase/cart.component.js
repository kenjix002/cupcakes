import React, { Component } from 'react';
import axios from 'axios';
import DateTimePicker  from 'react-datetime-picker';

import "./cart.css"


const CartItem = props =>(
    <div>
        <div className="cart_item">            
            <div style={{display:"flex"}}>
                <div className="cart_item_remove">
                    <a href="#" onClick={()=>props.removeProduct(props.cartid,props.product.data._id)}>&#10060;</a>                    
                </div>
                <div className="cart_item_image">
                    <img src={props.product.data.image} alt="" style={{maxHeight:"10vh"}} />                    
                </div>
                <div className="cart_item_name">
                    <label>Name</label>
                    <br/>
                    <div>
                        {props.product.data.name}
                    </div>
                </div>
                <div className="cart_item_price">
                    <label>Price</label>
                    <br/>
                    <div>
                        MYR &emsp;{props.product.data.price.toFixed(2)}
                    </div>
                </div>
                <div className="cart_item_quantity">
                    <label>Quantity</label>
                    <br/>
                    {props.quantity}
                </div>
                <div className="cart_item_total">
                    <label>Total</label>
                    <br/>
                    <div>
                        MYR &emsp;{props.total.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
        <hr />
    </div>   
)

export default class Cart extends Component {
    constructor(props){
        super(props);       

        this.onChangeMethod = this.onChangeMethod.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddressStreet = this.onChangeAddressStreet.bind(this);
        this.onChangeAddressZipcode = this.onChangeAddressZipcode.bind(this);
        this.onChangeAddressCity = this.onChangeAddressCity.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onRemoveProduct = this.onRemoveProduct.bind(this);

        this.state = {
            method:"",
            phone:"",
            total:0,
            street:"",
            zipcode:"",
            city:"",
            cart:[],
            products:[],
            date:new Date()
        }
    }

    async componentDidMount(){
        await this.checkUser();
        await this.findCart();
        await this.findProducts();
    }

    async checkUser(){
        const userid = localStorage.getItem("id");        
        await axios.get("http://localhost:5000/users/getUser?id="+userid)
            .then( res =>{
                this.setState({
                    user:res.data.username,
                    role:res.data.role,
                    phone:res.data.phone,
                    address:res.data.address || {street:"",zipcode:"",city:""}
                })
            })
    }

    async findCart(){
        await axios.get("http://localhost:5000/carts?user="+this.state.user)
            .then(cart =>{
                this.setState({
                    cart:cart.data.cart,
                    cartid:cart.data._id
                })
            })
    }

    async findProducts(){        
        await this.state.cart.map( async item => {
            await axios.get("http://localhost:5000/products/"+item.productid)
                .then( product => {
                    this.setState({
                        products:[...this.state.products,product] 
                    }) 
                })
        })
    }

    onChangeMethod(e){
        this.setState({
            method:e.target.value
        })
    }
    onChangePhone(e){
        this.setState({
            phone:e.target.value
        })
    }
    onChangeAddressStreet(e){
        this.setState({
            street:e.target.value
        })
    }
    onChangeAddressZipcode(e){
        this.setState({
            zipcode:e.target.value         
        })
    }
    onChangeAddressCity(e){
        this.setState({
            city:e.target.value
        })
    }
    onChangeDate(date){
        this.setState({
            date:date
        })
    }

    onRemoveProduct(id,productid){
        console.log(id,productid)

        const cartindex = this.state.cart.map(item=>{return item.productid}).indexOf(productid);
        const productindex = this.state.products.map(item=>{return item.data._id}).indexOf(productid);
        
        this.state.cart.splice(cartindex,1);
        this.state.products.splice(productindex,1);

        axios.post("http://localhost:5000/carts/remove",{id,productid})        
    }

    onSubmit(e){
        e.preventDefault();
        
        const cart = {
            cartid:this.state.cartid,
            phone:this.state.phone,
            method:this.state.method,
            complete:true,
            delivered:false,
            totalprice:this.state.total,
            street:this.state.street,
            zipcode:this.state.zipcode,
            city:this.state.city
        }

        if (this.state.method === "pickup"){
            cart.date = this.state.date
        }       
        
        axios.post("http://localhost:5000/carts/completecart",cart)
            .then(()=>console.log("complete"))

        // window.location="/admin"
    }

    deliveryInfo(){
        return (
            <div>
                <h4>Delivery Information</h4>
                <div style={{display:"flex"}}>
                    <div className="form-group cart_input_div">
                        <label>Contact Number</label>
                        <input type="text" className="form-control" value={this.state.phone} onChange={this.onChangePhone}/>
                    </div>
                    <div className="form-group cart_input_div">
                        <label>Street</label>
                        <input type="text" className="form-control" value={this.state.street} onChange={this.onChangeAddressStreet} />                        
                        <label>Zipcode</label>
                        <input type="text" className="form-control" value={this.state.zipcode} onChange={this.onChangeAddressZipcode} />
                        <label>City</label>
                        <input type="text" className="form-control" value={this.state.city} onChange={this.onChangeAddressCity} />
                    </div>
                </div>
            </div>
        )
    }
    
    pickupInfo(){
        return (
            <div>
                <h4>Pickup Information</h4>
                <div style={{display:"flex"}}>
                    <div className="form-group cart_input_div">
                        <label>Contact Number</label>
                        <input type="text" className="form-control" value={this.state.phone} onChange={this.onChangePhone} />
                    </div>
                    <div className="form-group cart_input_div">
                        <label>Pickup Time</label>
                        <DateTimePicker className="form-control" value={this.state.date} onChange={this.onChangeDate} />
                    </div>
                </div>
            </div>
        )
    }
    
    cartItem(){
        return this.state.products.map( (currentitem,index) =>{
            
            let productid = currentitem.data._id;
            let cartmap =this.state.cart.map( item => {return item.productid});
            let quantityindex = cartmap.indexOf(productid);            

            currentitem.data.quantity = this.state.cart[quantityindex].quantity;
            let pricingSum = currentitem.data.quantity * currentitem.data.price;

            return <CartItem product={currentitem} removeProduct={this.onRemoveProduct} quantityChanged={2} quantity={currentitem.data.quantity} 
                    keyid={index} cartid={this.state.cartid} total={pricingSum} />
        })
    }


    finalSum(){
        const eachfinalprice = this.state.cart.map( item => {            
            const productindex = this.state.products.map( product =>{
                return product.data._id;
            }).indexOf(item.productid);
            const perprice = this.state.products.map( product => {
                return product.data.price;
            })[productindex];
            return perprice*item.quantity;
        });

        const overalltotal = eachfinalprice.reduce( (total,price)=>{
            return total + price;
        },0);

        return overalltotal;
    }

    render(){
        return (            
            <div className="container cart_main">
                <form onSubmit={this.onSubmit}>
                    <div className="cart_body">
                        {   this.state.cart.length?
                            this.cartItem():
                            <div className="cart_body_empty">No item currently available</div> 
                        }
                    </div>
                    <div className="cart_option">
                        <span style={{fontSize:"0.9rem",fontStyle:"italic"}}>Pick one before proceed</span>
                        <div style={{flex:5}}><input name="method" type="radio"  value="pickup" onChange={this.onChangeMethod} />&emsp;Pick Up</div>
                        <div style={{flex:1}}><input name="method" type="radio" value="delivery" onChange={this.onChangeMethod} />&emsp;Delivery</div>
                    </div>
                    <div className="cart_total">                    
                        <span style={{flex:5}} >Total: MYR</span>
                        &emsp;
                        <span style={{flex:1}}>{this.finalSum().toFixed(2)}</span>
                    </div>

                    <div className="cart_checkout">
                        <input type="submit" value="Proceed to Checkout" className="btn btn-primary" disabled={!(this.state.method.length && this.state.cart.length)}/>
                    </div>

                    <div className="cart_personalinfo">
                        {
                            this.state.method === "delivery" ? this.deliveryInfo() :
                            this.state.method === "pickup" ? this.pickupInfo() :
                            ""
                        }
                    </div>
                </form>
            </div>
        )
    }
}