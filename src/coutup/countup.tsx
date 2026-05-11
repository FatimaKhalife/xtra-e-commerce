import React, { useState, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

import "./countup.css"

interface counterprops{
    target: number;
    duration?: number;
}

 export const Counter:React.FC <counterprops>=({target,duration=2000})=>{
    const [count,setCount] =useState(0);
    const [visible,setvisible]=useState(false);
    const ref = useRef<HTMLDivElement | null> (null);

    useEffect (()=>{
        const observer = new IntersectionObserver(
            ([entry])=>{ // the element being obsereved
                if(entry.isIntersecting){
                    setvisible(true);
                    observer.disconnect();
                
                }
            },{threshold: 0.5} //trigger when 50% of the element is visible
        );
        if (ref.current) observer.observe(ref.current);
        return ()=>observer.disconnect();

    },[])

    useEffect (()=>{
        if (!visible) return;

        let start = 0;
        const end = target;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = end /steps;

        const timer = setInterval(() => {
            start+=increment;
            if (start>=end){
                clearInterval(timer)
                setCount(end);
            }else{
                setCount(Math.floor(start))
            }}, stepTime);
            return()=>clearInterval(timer)
        },[visible, target])
        return(
            <div ref={ref} className="count">
            {count}
            </div>
        )
       
}


function Stats(){

    return(

<>
            <div className="stats-cont">
                <div className="left-stats ">
                    <h4>STATS</h4>
                    <h1>WHAT WE DONE?</h1>
                </div>
                <div className="all">
                    <div className="stats-sections">
                        <span><Counter target={130}/><FaPlus className="pluscount"/></span>
                        <h4>HAPPY CLIENTS</h4>
                    </div>
                    <div className="stats-sections">
                        <Counter target={57}/>
                        <h4>FACTORIES</h4>
                    </div>
                    <div className="stats-sections">
                        <span><Counter target={425}/><FaPlus className="pluscount" /></span>
                        <h4>PROJECTS</h4>
                    </div>
                </div>
            </div>
               <div className="all" style={{paddingTop:"100px",paddingBottom:"100px",fontSize:"1.5rem",gap:"10px"}}>
                    <FiCheckCircle style={{color:"red"}}/>
                    <p>Quality Only Happens When you Care Enough To Do Your Best.</p>
            </div>
         </>
      
    )

}
export default Stats;
