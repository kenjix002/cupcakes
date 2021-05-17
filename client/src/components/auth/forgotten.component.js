import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Forgotten extends Component {
    render(){
        return (            
            <div style={{display:'flex'}}>
            
                <div style={{flex:1, border:"1px solid black"}}>
                    <img src={process.env.PUBLIC_URL + 'images/forgotten.jpg'}  alt="" style={{width:"100%"}} />
                </div>          
                
                <div style={{flex:1, border:"1px solid black"}}>
                    <h1>Forgotten Password?</h1>
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" id="username" className="form-control" placeholder="username . . ." />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="password" id="password" className="form-control" placeholder="email . . ." />
                        </div>   
                        <br />
                        <div className="form-group">
                            <input type="submit"  value="Retrieve!" className="btn btn-primary" />
                            
                            <span style={{float:"right"}}>
                                <Link to="/register">Register Here!</Link>
                                &emsp;&emsp;
                                <Link to="/login">Back to Login?</Link>
                            </span>
                        </div>         
                    </form>
                </div>

            </div>
        )
    }
}