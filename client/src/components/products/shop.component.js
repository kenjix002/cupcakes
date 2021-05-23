import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Pagination from "../partial/pagination.component"
import "./shop.css"

const Product = props => (    
    <div className="product_main">
        <div className="product_image">            
            <img src={props.product.image} alt="cupcake" width="100%" style={{borderRadius:"0.3rem"}}/>
        </div>
        <hr />
        <div className="product_body">
            <div className="product_name">
                <label >Name: &emsp;</label>
                {props.product.name}
            </div>
            <hr />
            <div className="product_ingredients">
                <label >Ingredients:</label>
                <ul>
                {props.product.ingredients.map( ingredient => (
                    <li>{ingredient}</li>
                ))}
                </ul>
            </div>
            <hr />
            <div className="product_price">
                <label>Price: &emsp;</label>
                RM {props.product.price.toFixed(2)}
            </div>
            <hr />
            <div>                
                <button className="btn btn-primary" onClick={()=>props.addToCart(props.product._id)}>Add to cart</button>&emsp;
                {props.role === "admin" ? 
                    <div style={{display:"inline"}}>
                        <Link to={'/products/edit/'+props.product._id}><button className="btn btn-info">Edit</button></Link>
                        <button onClick={()=>props.deleteProduct(props.product._id)} style={{float:"right"}} className="btn btn-danger">Delete</button>
                    </div>
                : ""}
            </div>
        </div>
    </div>
)


export default class Shop extends Component {
    constructor(props){
        super(props);
        
        this.deleteProduct = this.deleteProduct.bind(this);
        this.changePage = this.changePage.bind(this);
        this.addToCart = this.addToCart.bind(this);

        this.state = {
            products:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/products?page=1')
            .then(res => {
                this.setState({
                    page:res.data.page,
                    pages:res.data.pages,
                    count:res.data.count,
                    products: res.data.data
                })
            })
            .catch(err=>{console.log(err)})

        axios.get('http://localhost:5000/products/ingredients')
            .then(res => {
                this.setState({
                    ingredients: res.data
                })
            })
            .catch(err=>{console.log(err)})  
        
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

    deleteProduct(id){
        axios.delete('http://localhost:5000/products/'+id)
            .then(res=>console.log(res))
        this.setState({
            products:this.state.products.filter(element=>element._id !==id)
        })
    }

    addToCart(id){
        const data = {
            productid:id,
            quantity:1,
            user:this.state.user
        }

        if(this.state.user){
            axios.post("http://localhost:5000/carts/add",data)        
        }
        else {
            // save to localstorage
            console.log("in guest mode")
        }
    }

    productList(){
        return this.state.products.map(currentproduct=>{
            return <Product product={currentproduct} key={currentproduct._id} deleteProduct={this.deleteProduct} addToCart={this.addToCart} role={this.state.role}/>
        })
    }

    async changePage(string){
        if(string === "plus"){
            if (this.state.page < this.state.pages){
                await this.setState({
                    page: this.state.page + 1
                })
            }
        }
        else if (string === "minus"){        
            if (this.state.page > 1){
                await this.setState({
                    page: this.state.page - 1
                })
            }
        }
        else {
            await this.setState({
                page: Number(string)
            })
        }
        await axios.get("http://localhost:5000/products?page="+this.state.page)
            .then( res => {
                this.setState({
                    page:res.data.page,
                    pages:res.data.pages,
                    count:res.data.count,
                    products: res.data.data
                })
            })
            .catch( err => console.log(err))
    }

    render(){
        return (            
            <div className="container" style={{display:"flex"}}>
                <div style={{flex:1 , borderRight:"1px solid black",marginRight:"1rem"}}>
                    { this.state.role === "admin" ? 
                        <Link to="/products/add"><button className="btn btn-primary col-lg-10">Add Cupcake</button></Link>
                        : ""
                    }
                    <div style={{marginTop:"2rem"}}>
                        <h4>Ingredients</h4>
                        <hr />
                        {
                           this.state.ingredients === undefined ? "" 
                           : this.state.ingredients.map ( item => (
                                <div>
                                    <input type="checkbox" value={item}/>&emsp;{item}
                                </div>
                            ))
                        }
                    </div>
                    <hr />
                    <div>
                        <h4>Price</h4>
                        <hr />          
                        <div>
                            MYR 0 - MYR 'dynamic'
                        </div>          
                        <input type="range" min="0" max="500" value="500" step="1"/>
                    </div>
                </div>
                <div style={{flex:5}}>
                    { this.state.pages > 1 ? <Pagination page={this.state.page} pages={this.state.pages} changePage={this.changePage} /> : "" }                    
                    <div>
                        {this.productList()}
                    </div>
                    { this.state.pages > 1 ? <Pagination page={this.state.page} pages={this.state.pages} changePage={this.changePage} /> : "" }
                </div>
            </div>
        )
    }
}