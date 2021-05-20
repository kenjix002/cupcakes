import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
    render(){
        return (            
            <div className="container">
                <br />
                this is cart lists
                <br />
                list of items
                <br />quantity
                <br />price per row
                <br /> total price
                <br /> proceed checkout
                <br />show payment method bottom
                <br />redirect to shop
                <br />method ( delivery / takeaway )
                <br />ONLY if not available bottom                
                <br />contact
                <br />address
            </div>
        )
    }
}