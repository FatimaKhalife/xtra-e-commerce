import React from "react";
import { TiHome } from "react-icons/ti";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import "./hero4.css";

interface HeroProps {
  title: string;
  subtitle: string;
}

const Heroshop: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <div className="heroshop">
      <img
        src="	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/bg1.jpg"
        alt=""
      />
      <div className="heroshopcontent">
        <h4>{title}</h4>
        <div className="heroshopsub">
          <TiHome /> <HiOutlineArrowNarrowRight /> 
        <div>
          {subtitle}
         </div>
        </div>
      </div>
    </div>
  );
};

export default Heroshop;
