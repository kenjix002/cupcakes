import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/partial/navbar.component"
import Standard from "./components/products/standard.component"
import Customized from "./components/products/customized.component"
import Home from "./components/home/home.component"
import Contact from "./components/home/contact.component"
import LoginRegister from "./components/auth/loginregister.component";
import Cart from "./components/purchase/cart.component"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">        
      <Route path="/" exact component={Home} />
        <Route path="/standard"  component={Standard} />
        <Route path="/customized"  component={Customized} />        
        <Route path="/contact"  component={Contact} />
        <Route path="/auth"  component={LoginRegister} />
        <Route path="/cart"  component={Cart} />
      </div>
    </Router>
  );
}

export default App;