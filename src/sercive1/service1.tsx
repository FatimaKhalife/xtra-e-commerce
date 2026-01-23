import React from "react";
import "./service1.css";

const service = [
   {
    title: 'POWER',
    subttitle: 'PALNT',
    img: "https://xtratheme.com/factory/wp-content/uploads/sites/100/2019/09/img1.jpg",
    icon:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/ico1.png"

   },
    {
    title: 'LASER',
    subttitle: 'CUT & PRINT',
    img: "https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/img2.jpg",
    icon:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/ico1.png"

   },
    {
    title: 'CNC',
    subttitle: 'MACHINERY',
    img: "https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/img3.jpg",
    icon:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/ico1.png"

   }
   ,
    {
    title: 'OIL & GAS',
    subttitle: 'INDUSTRY',
    img: "https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/img4.jpg",
    icon:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/ico1.png"

   }
]


export default function Service1 (){
    return(
<div style={{marginBottom:"100px"}}>
        <div className="container-grid">
            {service.map((services,index)=>(
                <div key={index} className="service">
                    <div className="try">
                    <img className = "service-img"src={services.img} alt="" />
                    <div className="content">
                        <h2>{services.title}</h2>
                        <h4>{services.subttitle}</h4>
                    </div>
                    <div className="service-icon">
                        <img src={services.icon} alt="" />
                    </div>
                  </div>
                </div>
            ))}
        </div>
        <button className="btn">VIEW ALL SERVICES</button>
    </div>
    )
}

