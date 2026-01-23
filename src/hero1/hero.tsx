// src/components/Hero.tsx
import React from "react";
import "./hero.css";


interface HeroProps{
    title: string;
    subtitle: string;
    description?: string;
    backgroundImage: string;
}
const Hero:React.FC<HeroProps> = ({title,subtitle,description,backgroundImage}) =>{
    return(
      <section className="hero"
   >
        <div className="hero-content" style={{backgroundImage: `url(${backgroundImage})`}}>
            <div>
                <h3>{title}</h3>
                <h1>{subtitle}</h1>
                {description && <p>{description}</p>}
            </div>
        </div>

      </section>
    )
}


export default Hero;
