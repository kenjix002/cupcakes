import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {

    constructor(props){
        super(props);

        this.checkUser = this.checkUser.bind(this);
        this.logout = this.logout.bind(this);       

        this.state = {
            user:  "",
            role:  ""
        }        
    }

    componentDidMount(){
        this.checkUser()
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

    logout(){
        localStorage.removeItem("id");
        localStorage.removeItem("authToken");
        this.setState({
            user:"",
            role:""
        })
        window.location = "/";
    }

    render(){
        const modifier = {
            textAlign:"center",
            padding:"20px 50px",
            fontWeight:"bold",
            color:"white"
        }
        return (            
            <nav class="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgba(0,0,0,0.4)",marginBottom:"1rem"}}>     
                <div className="nav-item" style={{textAlign:"center",width:"10%"}}>
                <Link to="/" className="nav-link nav-item"><img src={process.env.PUBLIC_URL + '/images/brand.png'} alt=""  style={{width:"60%",height:"auto"}}/></Link>
                </div>           
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link to="/" className="nav-link" style={modifier}>Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/products" className="nav-link" style={modifier}>Shop</Link>
                        </li>
                        <li class="nav-item">                              
                            <Link to={this.state.user?( this.state.role === "admin" ? "/admin" : "#"):"/login"} className="nav-link" style={modifier}>{this.state.user ? this.state.user : "Login/Register"}</Link>
                        </li>                        
                        <li class="nav-item">
                            <Link to="/cart" className="nav-link" style={modifier}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                </svg>
                            </Link>
                        </li>                        
                        {this.state.user?
                            <li class="nav-item">                              
                                <Link className="nav-link" style={modifier} onClick={this.logout}>Logout</Link>
                            </li>  : ""
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}