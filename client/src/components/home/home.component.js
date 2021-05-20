import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Home extends Component {
    render(){
        return (            
            <div>
                {/* this is home lists
                <br />fancy image cover with scroll effect?
                <br />about us
                <br />direct to shop?
                <br />contact?<br />contact /address / email        */}
                <div style={{height:"95vh"}}>
                    <img src="" alt="" />
                    Image here
                </div>
                <div style={{height:"100vh"}}>
                    this is about part
                    <Link to="/products">To product ehre</Link>
                </div>
                <div style={{height:"50vh"}}>
                    Contact us here!
                </div>

            </div>
        )
    }
}