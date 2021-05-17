import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/partial/navbar.component"
import Shop from "./components/products/shop.component"
import Home from "./components/home/home.component"
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Forgotten from "./components/auth/forgotten.component";
import Cart from "./components/purchase/cart.component"
import AddProduct from "./components/products/add.component"
import EditProduct from "./components/products/edit.component"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">        
        <Route path="/" exact component={Home} />
        <Route path="/shop"  component={Shop} />
        <Route path="/login"  component={Login} />
        <Route path="/register"  component={Register} />
        <Route path="/forgotten"  component={Forgotten} />
        <Route path="/cart"  component={Cart} />
        

        <Route path="/product/add"  component={AddProduct} />
        <Route path="/product/edit/:id"  component={EditProduct} />

        {/* 
          product add
          product edit
          product stocking 
          product delete  
          
          purchase detail page ( update status available )          
        */}

      </div>
    </Router>
  );
}

export default App;