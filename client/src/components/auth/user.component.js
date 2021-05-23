import React, { Component } from 'react';
import axios from 'axios';

import "./auth.css"


const CartItem = props =>(
    <tr>
        <td className="usercart_index">{props.keyid+1}</td>
        <td className="usercart_item">
            {
                props.cart.cart.map( item => (
                    <div>
                        {item.name}
                        &emsp;x&emsp;
                        {item.quantity}                        
                    </div>
                ))
            }
        </td>
        <td className="usercart_price">MYR&emsp;{props.cart.totalprice}</td>
        <td className="usercart_method">
            {
                props.cart.method.slice(0,1).toUpperCase() + 
                props.cart.method.slice(1)
            }
        </td>
        <td className="usercart_contact">{props.cart.phone}</td>
        <td className="usercart_mixed">
            {
                props.cart.method === "pickup" 
                ?                    
                 new Date(props.cart.date).toString().slice(0,21)
                : 
                props.cart.address.street + ", " +
                props.cart.address.zipcode + ", " +
                props.cart.address.city
            }
        </td>
        <td className="usercart_status form-group" style={{color:props.cart.deliveryStatus === "Completed" ? "green" : "black"}}>
            {
                (props.role === "admin" && !props.cart.delivered) ? 
                <select className="form-control" value={props.cart.deliveryStatus} onChange={(e)=>props.cartstatus(e,props.cart._id)}>
                    <option value="Waiting pickup">Waiting pickup</option>
                    <option value="On the way">On the way</option>
                    <option value="Completed">Completed</option>
                </select>
                : props.cart.deliveryStatus 
            }
        </td>
    </tr>
)


export default class Admin extends Component {
    constructor(props){
        super(props);       

        this.onChangeCartStatus = this.onChangeCartStatus.bind(this);

        this.state = {
            blank:"",
            cartcomplete:[],
            cartpending:[]
        }
    }

    async componentDidMount(){
        await this.checkUser();
        await this.getCarts();
    }

    // BAD
    async checkUser(){
        const userid = localStorage.getItem("id");        
        await axios.get("http://localhost:5000/users/getUser?id="+userid)
            .then( res =>{
                this.setState({
                    user:res.data.username,
                    role:res.data.role
                })
            })
    }

    async getCarts(){
        axios.post("http://localhost:5000/users/"+this.state.user,{username:this.state.user,role:this.state.role})
            .then( res =>{
                this.setState({
                    cartpending:res.data.pending,
                    cartcomplete:res.data.complete
                })  
            })
    }

    onChangeCartStatus(e,cartid){   
        const status = e.target.value
        axios.post("http://localhost:5000/users/cart/"+cartid,{cartid,status})
            .then(()=>{window.location.reload()})
    }

    cartPending(){
        return this.state.cartpending.map( (cartitem,index) => {
            return <CartItem keyid={index} cart={cartitem} role={this.state.role} cartstatus={this.onChangeCartStatus} />
        })
    }

    cartComplete(){
        return this.state.cartcomplete.map( (cartitem,index) => {
            return <CartItem keyid={index} cart={cartitem} />
        })
    }

    render(){
        return (
            <div className="container user_page_main">
                <div className="user_greeting">
                    Greetings, {this.state.user}
                </div>               
                <hr />
                <br />
                <h4>Pending</h4>
                <div className="user_pending">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Item list</th>
                                <th>Total Price</th>
                                <th>Method</th>
                                <th>Contact No.</th>
                                <th>Delivery Address | Pickup Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.cartPending()}
                        </tbody>
                    </table>
                </div>                
                <h4>Completed</h4>
                <div className="user_completed">
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Item list</th>
                                <th>Total Price</th>
                                <th>Method</th>
                                <th>Contact No.</th>
                                <th>Delivery Address | Pickup Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.cartComplete()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}