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