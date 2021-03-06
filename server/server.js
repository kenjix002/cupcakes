const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit:"6mb"}));

// mongoDB atlas connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection establised successfully!")
})

// routers
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');
const cartsRouter = require('./routes/carts');

app.use('/products',productsRouter);
app.use('/users',usersRouter);
app.use('/carts',cartsRouter);


// listen
app.listen(port, ()=>{
    console.log(`Server is running on port : ${port}`)
})
