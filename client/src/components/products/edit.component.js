import React, { Component } from 'react';
import axios from 'axios';

import "./product.css"

export default class EditProduct extends Component {
    constructor(props){
        super(props);
        
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            image: "",
            name:"",
            price:0,            
            ingredients:""
        }
    }
    componentDidMount(){
        // when load
        axios.get('http://localhost:5000/products/'+this.props.match.params.id)
            .then(res=>{
                this.setState({
                    image:res.data.image,
                    name:res.data.name,
                    price:res.data.price,
                    ingredients:res.data.ingredients
                })
            })
            .catch(err=>console.log(err))        
    }
    
    async onChangeImage(e){
        const imageFile = e.target.files[0];
        const imgBase64 = await this.convertImageToBase64(imageFile);        
        this.setState({
            image:imgBase64
        });
    }    
    convertImageToBase64(file){
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = ()=>{
                resolve(fileReader.result)
            };
            fileReader.onerror = (error)=>{
                reject(error)
            };
        })
    }
    onChangeName(e){
        this.setState({
            name:e.target.value
        });
    }
    onChangePrice(e){
        this.setState({
            price:e.target.value
        });
    }
    onChangeIngredients(e){
        this.setState({
            ingredients:e.target.value
        });
    }
    async onSubmit(e){
        e.preventDefault();
        const product = {
            image: this.state.image,
            name: this.state.name,
            price: this.state.price,
            ingredients: JSON.stringify(this.state.ingredients)
        }

        await axios.post('http://localhost:5000/products/edit/'+this.props.match.params.id,product)
            .then(res => console.log(res.data))

        window.location = "/products";
    }
    render(){
        return (            
            <div className="container product_form_main">
                <h1>Edit Product</h1>
                <div className="product_form_image push_below">
                    <img src={this.state.image} alt="cupcake" width="100%" style={{borderRadius:"1rem"}} />
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group push_below">
                        <label >Image</label>
                        <input type="file" className="form-control" onChange={this.onChangeImage}/>
                    </div>
                    <div className="form-group push_below">
                        <label >Name</label>
                        <input type="text" className="form-control" value={this.state.name}  onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group push_below">
                        <label >Price, in MYR</label>
                        <input type="number" className="form-control" value={this.state.price}  onChange={this.onChangePrice}/>
                    </div>
                    <div className="form-group">
                        <label >Ingredient</label>&emsp;<span>Seperate the ingredients with ","</span>                        
                        <input type="text" className="form-control" value={this.state.ingredients}  onChange={this.onChangeIngredients}/>
                    </div>
                    <br />
                    <div className="form-group push_below">
                        <input type="submit" value="Edit Product" className="btn btn-primary" />
                        <button className="btn btn-warning" onClick={this.props.history.goBack} style={{float:"right"}}>back</button>
                    </div>
                </form>
            </div>
        )
    }
}