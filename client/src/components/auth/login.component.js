import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./auth.css"

export default class Login extends Component {
    render(){
        return (            
            <div className="container auth_main">
            
                <div className="auth_image">
                    <img src={process.env.PUBLIC_URL + 'images/login.jpg'}  alt=""  width="100%" />
                </div>          
                
                <div className="auth_form_main">
                    <h1>Login</h1>
                    <hr />
                    <form className="auth_form_input">
                        <div className="form-group push_down">
                            <label>Username</label>
                            <input type="text" name="username" id="username" className="form-control" placeholder="username . . ." />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" id="password" className="form-control" />
                        </div>           
                        <br />
                        <div className="form-group">
                            <input type="submit"  value="Login Now" className="btn btn-primary" />
                            
                            <span style={{float:"right"}}>
                                <Link to="/register">Register Here!</Link>
                                &emsp;&emsp;
                                <Link to="/forgotten">Forgotten Password?</Link>
                            </span>
                        </div>         
                    </form>
                </div>

            </div>
        )
    }
}