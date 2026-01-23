import Nav from "../nav/nav.tsx";
import Heroshop from "../hero4/hero4.tsx";
import Footer from "../footer/footer.tsx";
import { useParams } from "react-router-dom";
import "./projects.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa6";
import { FaTags } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import {
  suggestByTags,
  randomSuggestions,
} from "../utils/suggestByTags";



type ProjectRow = {
  id: number;
  title: string;
  subtitle: string;
  client_name: string;
  completed_date: Date;
  website: string;
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
//     tag: ["optimization", "optimize", "search", "site", 'web']
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


interface ProjectDetailProps {
  label: string;
  value: string;
}
const Details: React.FC<ProjectDetailProps> = ({ label, value }) => {
  return (
    <div className="project-dot">
      <span className="label">{label}</span>
      <span className="dots"></span>
      <span className="value">{value}</span>
    </div>
  );
};

export default function ProjectDetails() {
  const [project, setp] = useState<ProjectRow | null>(null);
  const { id } = useParams<{ id: string }>();
  const [nav, setNav] = useState<{ prev: any; next: any } | null>(null);
  const [projects, setProjects] = useState<ProjectRow[]>([]);


  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then(data => setp(data))
      .catch((err) => console.error(err));
  }, [id]);


  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}/nav`)
      .then(res => res.json())
      .then(data => setNav(data));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  if (!project) {
    return (
      <div>
        <Nav />
        <Heroshop title="Project not found" subtitle="Projects" />
        <Footer />
      </div>
    );
  }
  const projectTags = project.tags?.split(",").map(t => t.trim()) ?? [];

  const suggestedProjects =
    projectTags.length > 0
      ? suggestByTags(
        projectTags,
        projects,
        p => p.tags?.split(",") ?? [],
        project.id,
        3
      )
      : randomSuggestions(projects, project.id, 3);


  return (
    <div>
      <Nav />
      <Heroshop title={project.subtitle} subtitle={project.title} />

      <div className="project-details">

        <div>

          <img src={project.images?.split(",")[0]} alt={project.title} />

          <div className="all-tags">
            <div className="tags">
              <FaFolderOpen className="tag-icon" />
              <span className="tag">
                {project.title}
              </span>

            </div>
            {project.tags && (
              <div className="tags">
                <FaTags className="tag-icon" />
                {project.tags.split(",").map((t, i) => (
                  <span key={i} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>


        </div>
        <div className="project-about">
          <h3>About <span>Project</span></h3>
          <p>
            A factory, manufacturing plant or a production plant is an industrial site, usually consisting of buildings and machinery, or more commonly a complex having several buildings, where workers manufacture goods or operate machines processing one product into another.
          </p>

          <h3>Project <span>History</span></h3>
          <p>Most modern factories have large warehouses or warehouse-like facilities that contain heavy equipment used for assembly line production. Large factories tend to be located with access to multiple modes of transportation, with some having rail, highway and water loading and unloading facilities.</p>
          <Details label="Client" value={project.client_name} />
          <Details label="Created by" value="Xtra Theme" />
          <Details label="Completed" value={
            project.completed_date
              ? new Date(project.completed_date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
              : "Unknown"
          } />
          <Details label="Skills" value={project.skill} />
          <Details label="Website" value={project.website} />

        </div>
      </div>

      <div className="project-next">
        {nav?.prev && (
          <Link to={`/projects/${nav.prev.id}`}>
            <div className="prev">
              <FaChevronLeft className="np-icon" />{nav.prev.title}
            </div>

          </Link>
        )}

        {nav?.next && (
          <Link to={`/projects/${nav.next.id}`}>
            <div className="next">
              {nav.next.title}  <FaChevronRight className="np-icon" />
            </div>

          </Link>
        )}




      </div>



      <div className="project-suggestions ">
        <div className="cart-totals">Related Posts</div>

        <div className="shop-grid">
          {suggestedProjects.map(p => (
            <Link key={p.id} to={`/projects/${p.id}`}>
              <div className="shop-content project">
                <div className="shop-img project">
                  <img src={p.images?.split(",")[0]} />
                </div>

                <div className="project-info">

                  <div className="project-search">
                    <FaArrowRightLong />
                  </div>
                </div>
                <div className="project-red">
                </div>
                <div className="project-related">
                  <p>
                    {p.subtitle}
                  </p>


                  <div className="tags">
                    <FaFolderOpen className="tag-icon" />
                    <span>
                      {project.title}
                    </span>

                  </div>

                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>


      <Footer />
    </div>
  );

}