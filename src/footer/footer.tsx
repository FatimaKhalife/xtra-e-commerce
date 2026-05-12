import "./footer.css";
import { FiPhoneCall } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { IoLocationOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiSlash } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";



export default function Footer() {

  const [logged, setlogged] = useState(false);
  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then(res => (res.json()))
      .then(data => setlogged(data.success))
  }, []);

  const HandleLogout = () => {
    fetch(`${API_URL}/logout`, { method: "POST", credentials: "include" })
      .then(res => (res.json()))
      .then(() => {
        setlogged(false);
        window.location.reload();
      })
  }


  return (
    <div className="footer-cont">

      <div className="footer-content">
        <div className="footer-left">
          <img
            src="	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/logo-footer.png"
            alt=""
          />
          <ul>


            <li> <FiPhoneCall className="navicon" />  +1 (800) 123 456</li>

            <li><TfiEmail className="navicon" /> info@inco.industrial</li>
            <li> <IoLocationOutline className="navicon" /> 121 King Street, New York, USA</li>
          </ul>
        </div>

        <div className="footer-right">
          <div className="footer-list">
            <h3>USEFUL LINKS</h3>
            <div className="footer-line"></div>
            <ul>
              <li><MdKeyboardArrowRight />About Us</li>
              <li><MdKeyboardArrowRight />Our Services</li>
              <li><MdKeyboardArrowRight />Recent Projects</li>
              <li><MdKeyboardArrowRight />Products</li>
              <li><MdKeyboardArrowRight />Technology</li>
            </ul>
          </div>

          <div className="footer-list">
            <ul>
              <h3>RESOURCES</h3>
              <div className="footer-line"></div>
              <li><MdKeyboardArrowRight className="arrow-icon" />Forum</li>
              <li><MdKeyboardArrowRight className="arrow-icon" />Knowledge Base</li>
              <li><MdKeyboardArrowRight className="arrow-icon" />Wikipedia</li>
              <li><MdKeyboardArrowRight className="arrow-icon" />Resources</li>
              <li><MdKeyboardArrowRight className="arrow-icon" />News</li>
            </ul>
          </div>

          <div className="footer-list">
            <h3>CONTACT US</h3>
            <div className="footer-line"></div>
            <ul>
              <li><MdKeyboardArrowRight />Live Chat</li>
              <li><MdKeyboardArrowRight />Contact</li>
              <li><MdKeyboardArrowRight />Social Networks</li>
              <li><MdKeyboardArrowRight />Locations</li>
              <li><MdKeyboardArrowRight />Sitemap</li>
            </ul>
          </div>
       
        </div>
         

      </div>

      <div className="footer-bottom">

        <p>© Copyright 2025. All Rights Reserved.</p>
        <HiSlash />
        <span>Industrial Solutions</span>
        <HiSlash />
        <span>Privacy Policy</span>
      </div>
    </div>
  );
}
