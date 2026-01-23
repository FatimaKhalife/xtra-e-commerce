import "./aboutus.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { PiParallelogramFill } from "react-icons/pi";
import { FiCheckCircle } from "react-icons/fi";
import "../footer/footer.css"
<FiCheckCircle />


export default function History() {
    return (


        <div className="history">
            <div className="history-info">
                <PiParallelogramFill style={{ color: `red`, fontSize:"2em"}} />
                <h4  style={{ color:"rgba(0, 0, 0, 0.32)", marginLeft:"-20px" }}  >ABOUT US</h4>
                <h2 >OUR HISTORY</h2>
                <p >Most modern factories have large warehouses or warehouse-like facilities that contain heavy equipment used for assembly line production. Large factories tend to be located with access to multiple modes of transportation, with some having rail, highway and water loading and unloading facilities.</p>

                <ul>
                    <li> <FiCheckCircle className="navicon" />Quality</li>
                    <li><FiCheckCircle className="navicon" />Accuracy</li>
                    <li> <FiCheckCircle className="navicon" /> Safety</li>
                    <li> <FiCheckCircle className="navicon" /> Reliance</li>
                </ul>
            </div>
            <div className="history-img">
                <div>
                    <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f4.jpg" alt="" />
                </div>
                <div>
                    <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg" alt="" />
                </div>

            </div>



        </div>



    )
}