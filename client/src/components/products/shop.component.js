import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Pagination from "../partial/pagination.component"


const Product = props => (
    <div style={{width:"300px",margin:"1%",border:"1px solid black",display:"inline-block"}}>

        {/* <img src={props.product.image} alt="" /> */}

        <div>
            {props.product.name}
        </div>
        <div>
            {props.product.ingredients}
        </div>
        <div>
            RM {props.product.price}
        </div>
        <div>
            <label>Quantity</label>
            <input type="number" value="1" className="form-control" style={{width:"20%",display:"inline-block"}}/>
        </div>
        <div>
            <button>Add to cart</button>            
            <Link to={'/products/edit/'+props.product._id}><button>Edit</button></Link>
            <button onClick={()=>props.deleteProduct(props.product._id)} style={{float:"right"}}>Delete</button>
        </div>
        {props.product._id}

    </div>
)


export default class Shop extends Component {
    constructor(props){
        super(props);
        
        this.deleteProduct = this.deleteProduct.bind(this);

        this.state = {products:[]}
    }

    componentDidMount(){
        axios.get('http://localhost:5000/products/')
            .then(res => {
                this.setState({
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

    render(){
        let test = 2;
        return (            
            <div style={{display:"flex"}}>
                <div style={{flex:1}}>
                    <Link to="/products/add"><button className="btn btn-primary col-lg-10">Add Cupcake</button></Link>
                    <br />
                    Search here
                    <br />
                    price range<br />flavour                    
                </div>
                <div style={{flex:3}}>
                    { test > 1 ? <Pagination /> : "" }
                    
                    <div>
                        {this.productList()}
                    </div>

                    { test > 1 ? <Pagination /> : "" }
                </div>
            </div>
        )
    }
}