import "./aboutus.css";

import { PiParallelogramFill } from "react-icons/pi";
import { FiCheckCircle } from "react-icons/fi";
import "../footer/footer.css"
<FiCheckCircle />


export default function Mission() {
    return (


        <div className="history mission">
            <div className="history-img m">

                <li ><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f1.jpg" alt="" /></a></li>
                <li><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f2.jpg" alt="" /></a></li>
                <li ><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg" alt="" /></a></li>
                <li ><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f8.jpg" alt="" /></a></li>
                <li><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f6.jpg" alt="" /></a></li>
                <li><a href=""><img src="" alt="" /> <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f5.jpg" alt="" /></a></li>




            </div>
            <div className="history-info">
                <PiParallelogramFill style={{ color: `red`, fontSize: "2em" }} />
                <h4 style={{ color: "rgba(0, 0, 0, 0.32)", marginLeft: "-20px" }}  >ABOUT US</h4>
                <h2 >MISSION & VISIONS</h2>
                <p >Most modern factories have large warehouses or warehouse-like facilities that contain heavy equipment used for assembly line production. Large factories tend to be located with access to multiple modes of transportation, with some having rail, highway and water loading and unloading facilities.</p>

                <ul>
                    <li>

                        <FiCheckCircle className="navicon" />
                        <div>
                            Construction

                            <p> Expert & modern systems</p>
                        </div>


                    </li>
                    <li>
                        <FiCheckCircle className="navicon" />
                        <div>
                            Environmental
                            <p>    Waste management</p>
                        </div>

                    </li>
                    <li> <FiCheckCircle className="navicon" />
                        <div>
                            Electrical Service
                            <p> Electrical supply stores</p>
                        </div>

                    </li>
                    <li> <FiCheckCircle className="navicon" />
                        <div>
                            Machinery
                            <p>Equipment relocation</p>
                        </div>

                    </li>
                </ul>
            </div>




        </div>



    )
}