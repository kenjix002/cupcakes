import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render(){
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">                
                <Link to="/" className="nav-link">NavHome</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle"   id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Cupcakes
                            </Link>                                        
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to="/standard" className="nav-link dropdown-item">Standard</Link>
                                <Link to="/customized" className="nav-link dropdown-item">Customized</Link>
                            </div>
                        </li>
                        <li class="nav-item">
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/auth" className="nav-link">Login / Register</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/cart" className="nav-link">Cart</Link>
                        </li>                        
                    </ul>
                </div>
            </nav>
        )
    }
}