import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./auth.css";

export default class Login extends Component {
    
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username:"",
            password:"",
            error:""
        }
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username:this.state.username,
            password:this.state.password
        }

        axios.post("http://localhost:5000/users/login",user)
            .then( res =>{ 
                localStorage.setItem("authToken",res.data.token)
                localStorage.setItem("id",res.data.id)
                window.location = "/users/"+this.state.username 
            })
            .catch( ()=>{ 
                this.setState({
                    username:"",
                    password:"",
                    error:"Invalid username/password"
                })
            })
    }

    render(){
        return (            
            <div className="container auth_main">
            
                <div className="auth_image">
                    <img src={process.env.PUBLIC_URL + 'images/login.jpg'}  alt=""  width="100%" />
                </div>          
                
                <div className="auth_form_main">
                    <h1>Login</h1>
                    <hr />
                    <p className="auth_form_error">{this.state.error}</p>
                    <form className="auth_form_input" onSubmit={this.onSubmit}>
                        <div className="form-group push_down">
                            <label>Username</label>
                            <input type="text" name="username" id="username" className="form-control" placeholder="username . . ." value={this.state.username} onChange={this.onChangeUsername} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                        </div>           
                        <br />
                        <div className="form-group">
                            <input type="submit"  value="Login Now" className="btn btn-primary" />
                            
                            <span style={{float:"right"}}>
                                <Link to="/register">Register Here!</Link>
                            </span>
                        </div>         
                    </form>
                </div>

            </div>
        )
    }
}