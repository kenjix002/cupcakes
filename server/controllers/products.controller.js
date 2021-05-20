const Product = require("../models/product.model");

exports.getAllProducts = async ( req ,res) => {  
    const currentPage = parseInt(req.query.page) || 1;
    const limitPerPage = parseInt(req.query.limit) || 6;
    const skip = ( currentPage - 1 ) * limitPerPage;
    const total = await Product.countDocuments();
    const totalPages = Math.ceil(total/limitPerPage);

    await Product.find().skip(skip).limit(limitPerPage)
        .then( products =>{             
            res.json({
                page: currentPage,
                pages: totalPages,
                count: products.length,
                data: products
            })
        })
        .catch( err => res.status(400).json("Error: "+err))
}

exports.addProduct = (req,res) => {
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
}

function trimAndLowerCaseArrayString(array){
    return array.map( item => item.trim().toLowerCase())
}

exports.getOneProduct = (req,res) => {
    Product.findById(req.params.id)
        .then( product => res.json(product))
        .catch( err => res.status(400).json("Error: " + err))
}

exports.editProduct = (req,res) => {
    Product.findById(req.params.id)
        .then(product =>{
            let ingredients = req.body.ingredients.replace(/[\"\[\]]/g,"").split(",");            
            ingredients = trimAndLowerCaseArrayString(ingredients);
            
            product.image = req.body.image;
            product.name = req.body.name;
            product.price = Number(req.body.price);            
            product.ingredients = ingredients;
            
            product.save()
                .then(()=>res.json('Product Updated!'))
                .catch(err=>res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err ));
}

exports.deleteProduct = (req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(()=>res.json("Product deleted!"))
        .catch(err => res.status(400).json('Error: ' + err ));
}

exports.getUniqueIngredients = (req,res) => {
    Product.find({}).select({ingredients:1})
        .then( ingredients => {
            unique = []
            ingredients.forEach( set =>{
                set.ingredients.forEach( item => {
                    if(!unique.includes(item))
                        unique.push(item)                    
                })
            })
            res.json(unique)
        })
        .catch( err => console.log(err) )
}