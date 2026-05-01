import Nav from "../nav/nav.tsx";
import Heroshop from "../hero4/hero4.tsx";
import Footer from "../footer/footer.tsx";
import { PiParallelogramFill } from "react-icons/pi";

import { useState, type FormEvent } from "react";
import { API_URL } from "../config";
import "./contact.css";
import { FiPhoneCall } from "react-icons/fi";
import { TfiEmail } from "react-icons/tfi";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";





export default function Conatct() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        department: "Business Department",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.department ||
            !formData.email ||
            !formData.message ||
            !formData.name ||
            !formData.subject) {
            alert("please fill all required fields");
            return;
        }

        try {
            await axios.post(`${API_URL}/contactus`,
                { formData }, { withCredentials: true });
            alert("sent successfully");

        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else if (err.message) {
                alert(err.message);
            } else {
                alert("Checkout failed");
            }

        }

    }





    return (
        <div>
            <Nav />
            <Heroshop title="CONTACT US" subtitle="CONTACT US" />

            <div className="contact-us">

                <div className="contactus-info">
                    <FiPhoneCall className="navicon" />
                    <div>
                        <h3>Phone</h3>
                        <p> +1 (800) 123 456</p>
                    </div>

                </div>
                <div className="contactus-info">
                    <TfiEmail className="navicon" />
                    <div>
                        <h3>Email</h3>
                        <p>info@inco.industrial</p>
                    </div>

                </div>
                <div className="contactus-info">
                    <IoLocationOutline className="navicon" />
                    <div>
                        <h3>Location</h3>
                        <p>121 King Street, New York, USA</p>
                    </div>

                </div>


            </div>

            <div className="history">
                <div className="history-info">
                    <PiParallelogramFill style={{ color: `red`, fontSize: "2em" }} />
                    <h4 style={{ color: "rgba(0, 0, 0, 0.32)", marginLeft: "-20px" }}  >GET IN TOUCH</h4>
                    <h2 >CONTACT US</h2>
                    <p >Factories arose with the introduction of machinery during the Industrial Revolution when the capital and space requirements became too great for cottage industry or workshops.</p>


                </div>
                <div className="history-img">

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name *"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email *"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="row">
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            >
                                <option>Business Department</option>
                                <option>Sales</option>
                                <option>Support</option>
                                <option>Management</option>
                            </select>
                        </div>

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                        />

                        <button type="submit">Send Message</button>
                    </form>

                </div>



            </div>



            <Footer />
        </div>
    );

}