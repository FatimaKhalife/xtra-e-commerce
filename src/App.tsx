import Shop from "./shop";
import Details from "./shop/details";
import Signup from "./login/sinup";
import Home from "./home";
import Login from "./login/login";
import Cart from "./Cart/Cart";
import Checkout from "./Cart/checkout";
import Aboutus from "./aboutus";
import Projects from "./projects/projects";
import ProjectDetails from "./projects/projectDetails";
import Conatct from "./contact/contact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Details />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Aboutus" element={<Aboutus />}/>
        <Route path="/projects" element={<Projects />}/>
        <Route path="/projects/:id" element={<ProjectDetails />}/>
         <Route path="/contact" element={<Conatct />}/>

      </Routes>
    </Router>
  );
}
export default App;
