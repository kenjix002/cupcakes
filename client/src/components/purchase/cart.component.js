import React, { Component } from 'react';
import axios from 'axios';

import "./cart.css"

export default class Cart extends Component {
    constructor(props){
        super(props);       

        this.state = {
            blank:""
        }
    }

    componentDidMount(){
        this.checkUser();
    }

    // BAD
    checkUser(){
        const userid = localStorage.getItem("id");        
        axios.get("http://localhost:5000/users/getUser?id="+userid)
            .then( res =>{
                this.setState({
                    user:res.data.username,
                    role:res.data.role
                })
            })
    }


    render(){
        return (            
            <div className="container cart_main">
                {this.state.user}
                <div className="cart_body">
                    image, item each, quantity modify, price individual, price total per component
                </div>

                <div className="cart_option">
                    take away or delivery
                </div>

                <div className="cart_total">
                    final total price
                </div>

                <div className="cart_checkout">
                    checkout button then, proceed paypal?
                </div>

                <div className="cart_personalinfo">
                    personal info
                    contact                    
                    address (if delivery true)
                </div>
            </div>
        )
    }
}