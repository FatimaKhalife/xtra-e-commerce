import logo from "../assets/logo.png";
import { FiPhoneCall } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { GrSearch } from "react-icons/gr";
import { IoMenu } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CgFileDocument } from "react-icons/cg";
import { LiaReact } from "react-icons/lia";
import { FaMapLocationDot } from "react-icons/fa6";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import "./nav.css"
import react, { useState } from "react";


function Nav() {

  const [open, setopen] = useState(false);
  const [rightopen, setrightopen] = useState(false);
  const [logged, setlogged] = useState(false);
  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { method: "POST", credentials: "include" })
      .then(res => (res.json()))
      .then(data => setlogged(data.success))
  }, []);

  const handleLogout = () => {
    fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    })
      .then(res => res.json())
      .then(() => {
        setlogged(false);
        window.location.href = "/";
      })
      .catch(() => {
        setlogged(false);
        window.location.href = "/";
      });
  }


  return (
    <>
      <header>


        <div className="navimg">
          <img src={logo} alt="logo" />
        </div>
        <div className="container">
          <div className="info">
            <FiPhoneCall className="navicon" />
            <p>+1 (800) 345 678</p>
            <TfiEmail className="navicon" />
            <p>Info@xtra.industrial</p>
          </div>

          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/aboutus">About</Link></li>
              {/* <li><a href="#">Services</a></li>
              <li><a href="#">FAQ's</a></li> */}


              <li className="dropdown">
                <li><Link to="/projects">Projects <FaChevronDown className="icon3" /></Link></li>

                <ul className="dropdown-menu">
                  <Link to="/projects">Projects</Link>
                  <li><a href="/">Single</a></li>
                </ul>
              </li>

              <li className="dropdown ">
                <li><Link to="/shop">Shop <FaChevronDown className="icon3" /></Link></li>
                <ul className="dropdown-menu">
                  <li><Link to="/shop">Shop</Link></li>
                  <li><a href="/">My account</a></li>
                  <li><Link to="/Cart">Cart</Link></li>
                  <li><Link to="/Checkout">Checkout</Link></li>
                </ul>
              </li>

              <li><Link to="/contact">Contact</Link></li>

              {logged ?
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li> :
                <li><Link to="/login">Login</Link></li>
              }
              <li><a href="#" className="icon-link" onClick={() => setopen(true)}><GrSearch className="icon2" /></a></li>
              <li><a href="#" className="icon-link" onClick={() => setrightopen(true)}><IoMenu className="icon2" /></a></li>
            </ul>

          </nav>
        </div>
      </header>
      {open && (
        <div className="search">

          <div className="searchcont">
            <input type="text" />
            <IoIosSearch className="searchicon" />
          </div>
          <IoClose className="close" onClick={() => setopen(false)} />
        </div>
      )}
      {rightopen && (
        <div className="rightnavcont">

          <div className="rightnav">
            <IoClose className="close2" onClick={() => setrightopen(false)} />
            <h3>QUICK LINKS</h3>
            <ul className="col1">
              <li>
                <a href="#">
                  <FiPhoneCall className="icon4" /> Contact Us
                </a>
              </li>
              <li>
                <a href="#">
                  <TfiHeadphoneAlt className="icon4" /> Online Documentation
                </a>
              </li>
              <li>
                <a href="#">
                  <LiaReact className="icon4" /> Industrial Services
                </a>
              </li>
              <li>
                <a href="#">
                  <FaMapLocationDot className="icon4" /> About Our Factory
                </a>
              </li>
            </ul>
            <h3>PROJECTS</h3>

            <ul className="imgnav" >
              <li className="rightimg"><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f1.jpg" alt="" /></a></li>
              <li className="rightimg"><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f2.jpg" alt="" /></a></li>
              <li className="rightimg"><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg" alt="" /></a></li>
              <li className="rightimg"><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f8.jpg" alt="" /></a></li>
              <li className="rightimg"><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f6.jpg" alt="" /></a></li>
              <li className="rightimg"><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f5.jpg" alt="" /></a></li>
            </ul>
            <h3>PRODUCTS</h3>

          </div>

        </div>

      )}
    </>
  )
}

export default Nav