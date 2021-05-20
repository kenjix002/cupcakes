import React, { Component } from 'react';
import axios from 'axios';


export default class AddProduct extends Component {
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
    onSubmit(e){
        e.preventDefault();
        const product = {
            image: this.state.image,
            name: this.state.name,
            price: this.state.price,
            ingredients: this.state.ingredients
        }
        console.log(product);
        axios.post('http://localhost:5000/products/add',product)
            .then(res => console.log(res.data))

        window.location = "/products";
    }
    render(){
        return (            
            <div className="container" style={{border:"1px solid black"}}>
                <h1>Add New Product</h1>
                <div style={{width:"50%",height:"50%",border:"1px solid black"}}>
                    <img src={this.state.image} alt="" />
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label >Image</label>
                        <input type="file" className="form-control" onChange={this.onChangeImage}/>
                    </div>
                    <div className="form-group">
                        <label >Name</label>
                        <input type="text" className="form-control" value={this.state.name}  onChange={this.onChangeName}/>
                    </div>
                    <div className="form-group">
                        <label >Price</label>
                        <input type="number" className="form-control" value={this.state.price}  onChange={this.onChangePrice}/>
                    </div>
                    <div className="form-group">
                        <label >Ingredient</label>&emsp;<span>Seperate the ingredients with ","</span>                        
                        <input type="text" className="form-control" value={this.state.ingredients}  onChange={this.onChangeIngredients}/>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Add New Product" className="btn btn-primary" />
                        <button className="btn btn-warning" onClick={this.props.history.goBack} style={{float:"right"}}>back</button>
                    </div>
                </form>
            </div>
        )
    }
}