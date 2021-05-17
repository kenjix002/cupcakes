import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EditProduct extends Component {
    render(){
        return (            
            <div>
                Add Product here
                <br />
                image<br />name<br />price per item<br />additional tag?
                quantity start at 0, edit the quantity at EDIT
            </div>
        )
    }
}