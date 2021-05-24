import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./navbar.css"


export default class Navbar extends Component {

    constructor(props){
        super(props);

        this.checkUser = this.checkUser.bind(this);
        this.logout = this.logout.bind(this);       
        
        this.state = {
            user:  "",
            role:  "",
            cart: [] 
        }        
    }
    
    async componentDidMount(){
        await this.checkUser()
        
        if(this.state.user){
            await this.findCart()
        }

    }
    
    // BAD
    async checkUser(){
        const userid = localStorage.getItem("id");        
        await axios.get("http://localhost:5000/users/getUser?id="+userid)
            .then( async res =>{                  
                if (res.data !== null){
                    await this.setState({
                        user:res.data.username !== undefined ? res.data.username : "",
                        role:res.data.role !== undefined ? res.data.role : ""
                    })
                }
            })
    }

    async findCart(){
        await axios.get("http://localhost:5000/carts?user="+this.state.user)
            .then(cart =>{
                if (cart.data === null){
                    this.setState({
                        cart:[]
                    })
                }
                else {
                    this.setState({
                        cart:cart.data.cart
                    })
                }
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
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgba(0,0,0,0.4)",marginBottom:"1rem"}}>                     
                <div className="nav-item" style={{textAlign:"center",width:"10%"}}>
                <Link to="/" className="nav-link nav-item"><img src={process.env.PUBLIC_URL + '/images/brand.png'} alt=""  style={{width:"60%",height:"auto"}}/></Link>
                </div>           
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" style={modifier}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/products" className="nav-link" style={modifier}>Shop</Link>
                        </li>
                        <li className="nav-item">                              
                            <Link to={this.state.user? "/users/"+this.state.user :"/login"} className="nav-link" style={modifier}>{this.state.user ? this.state.user : "Login/Register"}</Link>
                        </li>         
                        {    
                            this.state.user ?            
                            <li className="nav-item" style={{position:"relative"}}>
                                <Link to="/cart" className="nav-link" style={modifier}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                    </svg>
                                </Link>
                                <span className="cart_total_item">{this.state.cart.length}</span>
                            </li>             
                            : ""           
                        }
                        {this.state.user?
                            <li className="nav-item">                              
                                <a href="#!" className="nav-link" style={modifier} onClick={this.logout}>Logout</a>
                            </li>  : ""
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}