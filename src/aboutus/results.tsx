import "./aboutus.css";


import { FaPlus } from "react-icons/fa";

import Hero2 from "../hero2/hero2";
import "../coutup/countup.css"
import { Counter } from "../coutup/countup";
import { TbLetterK } from "react-icons/tb";

function Stats() {

    return (

        <>
            <Hero2
                title="WHAT THEY SAY"
                subtitle="TESTIMONIALS"
                description=""
                usecontent={false}
                img={true}
                btn={false}
                btn2={false}
            />
       
               <div className="partner-cont">
            <div className="partner-info">
                <p style={{color:"grey",fontSize:"20px",paddingBottom:"0px"}}>OUR</p>
                <h3>RESULTS</h3>
                <p>A factory, manufacturing plant or a production plant is an industrial site, usually consisting of buildings and machinery</p>
                <button className="partner-button">OUR PROJECTS</button>
            </div>
            <div className="all">
                    <div>
                        <div className="stats-sections">
                            <span><Counter target={130} /><FaPlus className="pluscount" /></span>
                            <h4>HAPPY CLIENTS</h4>
                        </div>
                        <div className="stats-sections">
                            <span><Counter target={57} /><TbLetterK className="pluscount" /></span>
                            <h4>WORKERS</h4>
                        </div>
                    </div>

                    <div>
                        <div className="stats-sections">
                            <Counter target={39} />
                            <h4>FACTORIES</h4>
                        </div>
                        <div className="stats-sections">
                            <span><Counter target={425} /><FaPlus className="pluscount"/></span>
                            <h4>PROJECTS</h4>
                        </div>
                    </div>


                </div>
        </div>

        </>

    )

}
export default Stats;
