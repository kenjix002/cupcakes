import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render(){
        return (            
            <div className="container" style={{display:'flex'}}>
            
                <div style={{flex:1}}>
                    <img src={process.env.PUBLIC_URL + 'images/login.jpg'}  alt=""  style={{width:"100%",height:"100%"}} />
                </div>          
                
                <div style={{flex:1}}>
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
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