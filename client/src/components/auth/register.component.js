import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import "./auth.css";

export default class Register extends Component {

    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPass = this.onChangeConfirmPass.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:"",
            password:"",
            confirmpass:"",
            email:"",
            error:""
        }
    }
    
    onChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }
    onChangeConfirmPass(e){
        this.setState({
            confirmpass:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();        
        if (this.state.password === this.state.confirmpass){
            const user = {
                username:this.state.username,
                email:this.state.email,
                password:this.state.password,
                confirmpass:this.state.confirmpass,
            }
            
            axios.post("http://localhost:5000/users/register",user)
                .then(()=>{ window.location="/login" })
                .catch(()=>{ 
                    this.setState({
                        username:"",
                        password:"",
                        confirmpass:"",
                        email:"",
                        error:"Username/Email existed"
                    })     
                })
        }
        else {
            this.setState({
                username:"",
                password:"",
                confirmpass:"",
                email:"",
                error:"Mismatch password/confirm password"
            })            
        }
    }

    render(){
        return (            
            <div className="container auth_main">
            
                <div className="auth_image">
                    <img src={process.env.PUBLIC_URL + 'images/register.jpg'}  alt="" width="100%"/>
                </div>          
                
                <div className="auth_form_main" style={{flex:1, border:"1px solid black"}}>
                    <h1>Registration</h1>
                    <hr />
                    <p className="auth_form_error">{this.state.error}</p>
                    <form className="auth_form_input" onSubmit={this.onSubmit}>
                        <div className="form-group push_down">
                            <label>Username</label>
                            <input type="text" name="username" id="username" className="form-control" placeholder="username . . ." value={this.state.username} onChange={this.onChangeUsername} />
                        </div>
                        <div className="form-group push_down">
                            <label>Email</label>
                            <input type="email" name="email" id="email" className="form-control" placeholder="email . . ." value={this.state.email} onChange={this.onChangeEmail}  />
                        </div>
                        <div className="form-group push_down">
                            <label>Password</label>
                            <input type="password" name="password" id="password" className="form-control" placeholder="password . . ." value={this.state.password} onChange={this.onChangePassword}  />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm-password" id="confirm-password" className="form-control" placeholder="retype password . . ." value={this.state.confirmpass} onChange={this.onChangeConfirmPass}  />
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