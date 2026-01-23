import "./aboutus.css";
import { MdPerson } from "react-icons/md";
import { FaRegFileLines } from "react-icons/fa6";


export default function Hiring() {
    return (
        <div className="hiring">
            <div className="hiring-info">
                <MdPerson style={{ color: "red", fontSize: "5rem" }} />
                <div>
                    <h3> We're Hiring, <b>Join Our Talent Team</b></h3>
                    <p>Fell free to contact us and send your resume</p>
                </div>

            </div>

            <div className="consult-btn">
                <button><FaRegFileLines /> SEND RESUME</button>
            </div>


        </div>
    )
}