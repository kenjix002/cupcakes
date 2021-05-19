import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/partial/navbar.component";
import Shop from "./components/products/shop.component";
import Home from "./components/home/home.component";
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Forgotten from "./components/auth/forgotten.component";
import Cart from "./components/purchase/cart.component";
import AddProduct from "./components/products/add.component";
import EditProduct from "./components/products/edit.component";
import Admin from "./components/admin/admin.component";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">      
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products/edit/:id"  component={EditProduct} />
            <Route path="/products/add"  component={AddProduct} />
            <Route path="/products"  component={Shop} />
            <Route path="/login"  component={Login} />
            <Route path="/register"  component={Register} />
            <Route path="/forgotten"  component={Forgotten} />
            <Route path="/cart"  component={Cart} />
            <Route path="/admin"  component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;