import Nav from "../nav/nav.tsx";
import Heroshop from "../hero4/hero4.tsx";
import Footer from "../footer/footer.tsx";
import Pagination from "../Pagination.tsx";
import "./projects.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { useEffect } from "react";

import { FaArrowRightLong} from "react-icons/fa6";
type ProjectRow = {
  id: number;
  title: string;
  subtitle: string;
  client_name: string;
  completed_date: Date | string;  
  website: string | null;
  about_text: string | null;
  history_text: string | null;
  skill: string;
  images: string | null;   
  tags: string | null;     
};


// const projects = [
//   {
//     title: "INDUSTRIAL",
//     subtitle: "CNC MACHINERY",
//     img: '	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f1.jpg',
//   },
//   {
//     title: "COMMERCIAL",
//     subtitle: "MACHINERY & GEAR PRODUCTION ",
//     img: '	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f2.jpg',
//   }, {
//     title: "FACTORY",
//     subtitle: "FACTORY IS SAFE & SECURE",
//     img: '	https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f8.jpg',
//   },
//   {
//     title: "INDUSTIAL",
//     subtitle: "PETRO INDUSTRY EQUIPMENT",
//     img: 'https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg'
//   },
//   {
//     title: "Commercial",
//     subtitle: "WELDING AND LASER CUT",
//     img: 'https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg'
//   }
//   ,
//   {
//     title: "INDUSTIAL",
//     subtitle: "Monitoring Room",
//     img: 'https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg'
//   },
//   {
//     title: "Factory",
//     subtitle: "Aircraft Jet Turbine",
//     img: 'https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg'
//   },
//   {
//     title: "COMMERIAL",
//     subtitle: "Car Assembly line",
//     img: 'https://xtratheme.com/elementor/factory/wp-content/uploads/sites/8/2019/09/f7.jpg'
//   }
// ]
export default function Projects() {
  const [project,setp]=useState<ProjectRow[]>([]);
 
  const [currentpage, setcurrentpage] = useState(1);
  const [productsPerPage, setproductsPerPage] = useState(6);
  const totalpages = Math.ceil(project.length / productsPerPage);
  const startIndex = (currentpage - 1) * productsPerPage;
  const currentProd = project.slice(startIndex, startIndex + productsPerPage);

    useEffect(() => {
    fetch(`${API_URL}/projects/`)
      .then((res) => res.json())
      .then((data) => {
        setp(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);
  

  return (
    <div>
      <Nav />
      <Heroshop title="Projects" subtitle="Projects" />
      <div className="shop-grid">
        {currentProd.map((product, index) => (
          <div key={index}>

            <Link to={`/projects/${encodeURIComponent(product.id)}`} >
            <div className="shop-content project">


              <div className="shop-img project">
                   <img src={product.images?.split(",")[0]} alt={product.title} />

              </div>
              <div className="project-info">
                <div className="project-name">
                  {product.subtitle}
                </div>

                <div className="project-search">
                  <FaArrowRightLong />
                </div>
              </div>
              <div className="project-red">

              </div>

            </div>
            </Link>

          </div>
        ))}

      </div>

      <Pagination currentPage={currentpage}
        totalPages={totalpages}
        onPageChange={setcurrentpage} />



      <Footer />
    </div>
  )
}