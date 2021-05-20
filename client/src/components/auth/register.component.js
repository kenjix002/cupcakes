import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./auth.css"

export default class Register extends Component {
    render(){
        return (            
            <div className="container auth_main">
            
                <div className="auth_image">
                    <img src={process.env.PUBLIC_URL + 'images/register.jpg'}  alt="" width="100%"/>
                </div>          
                
                <div className="auth_form_main" style={{flex:1, border:"1px solid black"}}>
                    <h1>Registration</h1>
                    <hr />
                    <form className="auth_form_input">
                        <div className="form-group push_down">
                            <label>Username</label>
                            <input type="text" name="username" id="username" className="form-control" />
                        </div>
                        <div className="form-group push_down">
                            <label>Email</label>
                            <input type="email" name="email" id="email" className="form-control" />
                        </div>
                        <div className="form-group push_down">
                            <label>Password</label>
                            <input type="password" name="password" id="password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm-password" id="confirm-password" className="form-control" />
                        </div>       
                        <br />
                        <div className="form-group">
                            <input type="submit"  value="Register" className="btn btn-primary" />
                            
                            <span style={{float:"right"}}>
                                <Link to="/login">Back to Login?</Link>
                            </span>
                        </div>         
                    </form>
                </div>

            </div>
        )
    }
}