
import Nav from "../nav/nav.tsx";
import Heroshop from "../hero4/hero4.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import Footer from "../footer/footer.tsx";
import { FaShippingFast } from "react-icons/fa";

import axios from "axios";
import { API_URL } from "../config";


import "./Cart.css";
type CartItem = {
    id: number;
    product_id: number;
    qty: number;
    name: string;
    Tags_json: string[];
    sku: string;
    image: string;
    price: number;
};
// type Product = {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
//     images__json: string[];
//     category: string;
//     SKU: string;
//     Status: number;
//     Tags_json: string[];
//     Weight: number;
//     Dimensions: string;
//     Product_year: number;
//     Product_manual: string;
//     Refundable: string;
// };
const countrynames = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Palestine",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

export default function Checkout() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [billing, setBilling] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        phone: "",
        company: "",
        country: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        notes: ""
    });

    const navigate = useNavigate();



    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping_threshold = 100;
    const shipping_fee = 50;
    const shipping = subtotal >= shipping_threshold ? 0 : shipping_fee;

    const total = subtotal + shipping;
    const freeship = shipping_threshold - subtotal;




    useEffect(() => {
        fetchCart();

    }, [])


    const fetchCart = async () => {
        const res = await fetch(`${API_URL}/cart`, {
            credentials: "include",
        });
        const data = await res.json();
        setCart(data);
    };

    // const empty = cart.length === 0;
    const fetchcheckout = async (e: FormEvent) => {
        e.preventDefault();

        if (
            !billing.firstName ||
            !billing.lastName ||
            !billing.phone ||
            !billing.country ||
            !billing.address1 ||
            !billing.city ||
            !billing.postcode
        ) {
            alert("Please fill all required fields");

            return;
        }

        try {
            await axios.post(`${API_URL}/checkout`,
                { billing }, { withCredentials: true });

            alert("Order placed successfully");


            navigate(`/shop`);

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
            <Heroshop title="Checkout" subtitle="CHECKOUT" />

            <div className="cart">
                <div className="cart-extra bill">
                    <div className="total-price">
                        <div className="cart-totals">BILLING DETAILS</div>

                        <form className="checkout-bill" id="checkout-form" onSubmit={fetchcheckout}>
                            <div className="checkname">
                                <div className="fname">
                                    <label htmlFor="">First name <i style={{ color: "rgb(236, 27, 27)" }}>*</i></label>
                                    <input type="text" value={billing.firstName} onChange={e => setBilling({ ...billing, firstName: e.target.value })} />
                                </div>
                                <div className="fname">
                                    <label htmlFor="">Last name <i style={{ color: "rgb(236, 27, 27)" }}>*</i></label>
                                    <input type="text" value={billing.lastName} onChange={e => setBilling({ ...billing, lastName: e.target.value })} />
                                </div>
                            </div>
                            <label htmlFor="">Phone Number<i style={{ color: "rgb(236, 27, 27)" }}>*</i></label>
                            <input type="text" value={billing.phone} onChange={e => setBilling({ ...billing, phone: e.target.value })} />
                            <label htmlFor="">Company name (Optional)</label>
                            <input type="text" value={billing.company} onChange={e => setBilling({ ...billing, company: e.target.value })} />


                            <label htmlFor="">Country / Region <i style={{ color: "rgb(236, 27, 27)" }}>*</i></label>
                            <select value={billing.country}
                                onChange={(e) =>
                                    setBilling({ ...billing, country: e.target.value })
                                }>
                                <option value="" disabled>
                                    Select a country
                                </option>
                                {countrynames.map(name => (
                                    <option key={name} >{name}</option>
                                ))}

                            </select>





                            <label htmlFor="">Street address <i style={{ color: "rgb(236, 27, 27)" }}>*</i></label>
                            <input type="text" placeholder=" House number and street name" value={billing.address1} onChange={e => setBilling({ ...billing, address1: e.target.value })} />
                            <input type="text" placeholder=" Apartmetn, suite, unit, etc. (optional)" value={billing.address2} onChange={e => setBilling({ ...billing, address2: e.target.value })} />

                            <label htmlFor="">Town / City <i style={{ color: "rgb(236, 27, 27)" }}>*</i></label>
                            <input type="text" value={billing.city} onChange={e => setBilling({ ...billing, city: e.target.value })} />

                            <label htmlFor="">Postcode / ZIP <i style={{ color: "rgb(236, 27, 27)" }}>*</i></label>
                            <input type="text" value={billing.postcode} onChange={e => setBilling({ ...billing, postcode: e.target.value })} />

                            {/* <label htmlFor="">Email address <i style={{color:"rgb(236, 27, 27)"}}>*</i></label>
                            <input type="text" /> */}
                            <h5>Additional information</h5>
                            <hr />
                            <label htmlFor="">order notes (optional)</label>

                            <textarea value={billing.notes} onChange={e => setBilling({ ...billing, notes: e.target.value })} placeholder=" Notes about your order. e.g. special notes for delivery.">

                            </textarea>


                        </form>

                    </div>


                    <div className="total-price">
                        <div className="cart-totals">CART TOTALS</div>
                        <div>
                            <table className="summary-table">
                                <tr>
                                    <th>Product</th>
                                    <th>Subtotal</th>
                                </tr>
                                {cart.map((prod, i) => (
                                    <tr key={i}>
                                        <td>{prod.name} <b>x {prod.qty}</b></td>
                                        <td>{prod.price}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <th>Shipping</th>
                                    <th>${shipping}</th>
                                </tr>
                                <tr>
                                    <th>Subtotal</th>
                                    <td>${subtotal}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <th>${total}</th>
                                </tr>
                            </table>
                            {freeship > 0 ?
                                <div style={{ margin: " 30px 0" }}>
                                    <p
                                        style={{
                                            color: "#676767",
                                            padding: "10px",
                                            display: "flex",
                                            gap: "5px",
                                        }}
                                    >
                                        <i>
                                            <FaShippingFast />
                                        </i>
                                        Add <b>${freeship} </b>  more to get free shipping!

                                    </p>
                                    <div className="progress-slider">
                                        <div className="filled" style={{ width: `${100 - freeship}%` }}></div>
                                    </div>

                                </div>
                                : ""}
                            <button className="details-addtocart" form="checkout-form" type="submit">Place order</button>



                        </div>
                    </div>

                </div>


                <Footer />


            </div>





        </div>

    )

}
