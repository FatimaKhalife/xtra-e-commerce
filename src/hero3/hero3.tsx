import React, { useState } from "react";
import { PiParallelogramFill } from "react-icons/pi";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import './hero3.css'

interface hero2props{
    title: string;
    subtitle: string;
    slide: boolean;
}
// const images = [
//   '	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f1.jpg',
//   '	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f2.jpg',
//   '	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f8.jpg',
//   'https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg'
// ]
const projects=[
  {
    title:"INDUSTRIAL",
    subtitle:"CNC MACHINERY",
    img : '	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f1.jpg',
  },
  {
    title:"COMMERCIAL",
    subtitle:"MACHINERY & GEAR PRODUCTION ",
    img: '	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f2.jpg',
  },  {
    title:"FACTORY",
    subtitle:"FACTORY IS SAFE & SECURE",
    img:'	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f8.jpg',
  },
    {
    title:"INDUSTIAL",
    subtitle:"PETRO INDUSTRY EQUIPMENT",
    img:  'https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg'
  }
]



const Hero2: React.FC <hero2props>=({title,subtitle,slide=true})=>{
    const visiblecount = 3;
    const [startIndex,setStartindex]=useState(0);
    // const [slide,setslide]=useState(true);

    const nextSlide = () => {
      setStartindex((prev)=>(prev + 1) % projects.length);
    }
    const prevSlider = () => {
      setStartindex((prev)=>(prev-1+projects.length)%projects.length)
      
    }
    
   
   const visibleimages = slide
  ? Array.from({ length: visiblecount }, (_, i) =>
      projects[(startIndex + i) % projects.length]
    )
  : [...projects];


    const content=(
      <div>
          
            <div  className="hero3" >
            
                <PiParallelogramFill style={{color:`red`}}/>
                <p className="p1">{title}</p>
                <h2 >{subtitle}</h2>
                <p className="p2">Timeless Products With A Fine Regard For Detail.</p>
                <div className="hero3-grid">
                  {slide? <div className="hero3-icon1" onClick={prevSlider}><FaChevronLeft className="hero3-arrow" /></div>: <div></div>}
                  {visibleimages.map((img,index)=>(

                    <div className="hero3-img" key={index}>
                      <img src={img.img}   alt="" />
                       
                    <div className="hero3-in-cont">
                          <div className="hero3-in" >
                            <p>{img.title}</p>
                            <h3>{img.subtitle}</h3>
                          </div>
                </div>
                        
                 
                
                    </div>
                  )
                  )}      
                 
                {slide? <div className="hero3-icon2" onClick={nextSlide}><FaChevronRight className="hero3-arrow"/></div>: <div></div>}
                </div>

            </div>
   </div>
          
    );
         return(content)
        
    
};

export default Hero2;