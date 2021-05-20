import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Pagination from "../partial/pagination.component"
import "./shop.css"

const Product = props => (
    
    <div className="product_main">
        <div className="product_image">
            <img src={props.product.image} alt="cupcake" width="280px" style={{borderRadius:"0.3rem"}}/>
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
                RM {props.product.price}
            </div>
            <hr />
            <div className="product_quantity">
                <label>Quantity: &emsp;</label>
                <input type="number" value="1" className="form-control" style={{width:"20%",display:"inline-block"}}/>
            </div>
            <hr />
            <div>
                <Link to={'/'}><button className="btn btn-primary">Add to cart</button></Link>&emsp;
                <Link to={'/products/edit/'+props.product._id}><button className="btn btn-info">Edit</button></Link>
                <button onClick={()=>props.deleteProduct(props.product._id)} style={{float:"right"}} className="btn btn-danger">Delete</button>
            </div>
        </div>

    </div>
)


export default class Shop extends Component {
    constructor(props){
        super(props);
        
        this.deleteProduct = this.deleteProduct.bind(this);
        this.changePage = this.changePage.bind(this);

        this.state = {products:[]}
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
    }

    deleteProduct(id){
        axios.delete('http://localhost:5000/products/'+id)
            .then(res=>console.log(res))
        this.setState({
            products:this.state.products.filter(element=>element._id !==id)
        })
    }

    productList(){
        return this.state.products.map(currentproduct=>{
            return <Product product={currentproduct} key={currentproduct._id} deleteProduct={this.deleteProduct} />
        })
    }

    async changePage(string){
        if(string == "plus"){
            if (this.state.page < this.state.pages){
                await this.setState({
                    page: this.state.page + 1
                })
            }
        }
        else if (string == "minus"){        
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
                <div style={{flex:1}}>
                    <Link to="/products/add"><button className="btn btn-primary col-lg-10">Add Cupcake</button></Link>
                    
                    <div>
                        ingredients tick box
                    </div>
                    <div>
                        price range
                    </div>
                </div>
                <div style={{flex:3}}>
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