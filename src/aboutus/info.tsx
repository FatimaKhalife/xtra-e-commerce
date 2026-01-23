import { useState } from "react"
import "./aboutus.css"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
const items = [
    {
        title: "Entire Production Line Installation",
        content:
            "We can assist you in the modernization of your facility, the installation and repair of your equipment, and general and preventive plant maintenance."
    },
    {
        title: "Small & Large Component Fabrication",
        content:
            "We can assist you in the modernization of your facility, the installation and repair of your equipment, and general and preventive plant maintenance."
    },
    {
        title: "Hard Facing & Corrosion Resistant Overlay",
        content:
            "We help upgrade legacy systems with modern automation and energy-efficient solutions."
    },
    {
        title: "Pipe fitting Complete Piping Systems",
        content:
            "We help upgrade legacy systems with modern automation and energy-efficient solutions."
    }
];



export default function Info() {
    const [open, setopen] = useState<number | null>(null);


    const handlechange = (index: number) => {
        setopen(prev => (prev === index ? null : index));

    };

  


    return (


        <div className="about-info">
            <div className="info-img">
                <img src="https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f3.jpg" alt="" />

            </div>
            <div className="info-drop">

                {items.map((item, i) => (
               

                    <div key={i} style={{ padding:"10px 0"}}>
                        <li onClick={()=>handlechange(i)} className={open===i ? "span-open-li" : "span-closed-li"}>
                            <div>
                                {item.title}
                            </div>
                            <div>
                                {open===i ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </div>
                        </li>
                        <span className={open==i ? "span-open" : "span-closed"}>{item.content}</span>
                    </div>

                ))}

            </div>

        </div>
    )
}