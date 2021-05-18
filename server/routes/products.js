const router = require('express').Router();
let Product = require('../models/product.model');
let fs = require('fs')


router.route('/').get((req,res)=>{
    Product.find()
        .then( products => res.json(products))
        .catch( err=> res.status(400).json("Error: "+err))
})

router.route('/add').post((req,res)=>{
    const image = req.body.image;
    const name = req.body.name.toLowerCase().trim();
    const price = Number(req.body.price);
    let ingredients = req.body.ingredients.split(",");
    
    ingredients = trimAndLowerCaseArrayString(ingredients);

    const newProduct = new Product({
        image,
        name,
        price,
        ingredients
    });

    newProduct.save()
        .then(()=>res.json("New Product added!"))
        .catch(err => res.status(400).json('Error: ' + err));
})

function trimAndLowerCaseArrayString(array){
    return array.map( item => item.trim().toLowerCase())
}

router.route('/:id').get((req,res)=>{
    Product.findById(req.params.id)
        .then( product => res.json(product))
        .catch( err => res.status(400).json("Error: " + err))
})

router.route('/edit/:id').post((req,res)=>{
    res.json("edit")
});


module.exports = router;