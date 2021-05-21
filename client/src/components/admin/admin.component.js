import React, { Component } from 'react';
import axios from 'axios';


export default class Admin extends Component {
    constructor(props){
        super(props);       

        this.state = {
            blank:""
        }
    }

    componentDidMount(){
        this.checkUser();        
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
                if (res.data.role !== "admin"){
                    window.location = "/"
                }
            })
    }

    render(){
        return (            
            <div className="container" style={{display:'flex'}}>                
                {this.state.user}
                this is admin
            </div>
        )
    }
}