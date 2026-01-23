import React from "react";
import { PiParallelogramFill } from "react-icons/pi";
import './hero2.css'
interface hero2props{
    title: string;
    subtitle: string;
    description: string;
    usecontent?: boolean;
    img?:boolean;
    btn?:boolean;
    btn2?:boolean;
}

const Hero2: React.FC <hero2props>=({title,subtitle, description,usecontent=true , img=true, btn=true , btn2=true})=>{
 
    const content=(
      <div className={ `${img? "hero2-c":""} ${!btn && !btn2 ? "sheight":""}`}>
            { img? <img  src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/bg1.jpg" alt="" className="hero2-img"/>:""
              }
            <div style={{backgroundColor: img ? "transparent":"white" }} className="hero2" >
                <div className={img? "try2" :""}>
          
                <PiParallelogramFill style={{color:`red`}}/>
                <h4 style={{color: img ? "white":"grey"}}>{title}</h4>
                <h2 style={{color: img ? "white":"black"}}>{subtitle}</h2>
                <p style={{color: img ? "white":"grey"}}>{description}</p>
                {img && btn ? 
                <div className="btn2">
                  <button className="btn2-1">GET A QUOTE</button>
                  <button className="btn2-2">OUR PROJECTS</button>
                </div>
                :""}
                {btn2?
                    <div className="btn2">
                  <button className="btn2-3">READ MORE</button>
                </div>
                    :""
                }
                </div>

            </div>
   </div>
          
    );
         return(usecontent?   <div className="hero2-cont">{content}</div>:content)
        
    
};

export default Hero2;