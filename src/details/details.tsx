import { MdKeyboardArrowRight } from "react-icons/md";
import "./detials.css"
const detail =[
    {
        icon:"	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/i1.png",
        title:"MECHANICAL TOOLS",
        img:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f2.jpg"
    },{
        icon:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/i2.png",
        title:"POWER PLANTS & ENERGY",
         img:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg"
    },{
        icon:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/i3.png",
        title:"CONSTRUCTION & BUILDING",
        img:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f6.jpg"
   
    },{
        icon:"	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/i4.png",
        title:"MACHINERY & CNC",
        img:"	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f1.jpg"

    },{
        icon:"	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/i5.png",
        title:"SHIP & EQUIPMENT",
        img:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f5.jpg"
  
    },{
        icon:"https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/i6.png",
        title:" OIL & GAS INDUSTRY",
         img:"	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg"
      
    }
]

export default function Details (){
    return(
        <div className="detail-container">
            <div className="container-grid2">
                {detail.map((detail,index)=>(
                
                    <div key={index} className={`details ${index%2===0?"even": "odd"}`}>
                        <img src={detail.img} alt="" className="details-img" />
                        <div className="details-content">
                            <img src={detail.icon} alt="" />
                            <h2>{detail.title}</h2>
                            <p>Factories need of high technology equipment such as Mechanical tools.</p>
                            <a href="/">Read more <MdKeyboardArrowRight /></a>
                        </div>
                    
            
                    </div>
                )

            
            )}
            
            </div>
            <div className="left-img">
                <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/bg2.jpg" alt="" />
                <p>Our <br /> Pro <br /><b> Services <br /></b> Are <br /><b> Fast <br /></b>  &<b> Reliable</b></p>
            </div>
        </div>
    )
}