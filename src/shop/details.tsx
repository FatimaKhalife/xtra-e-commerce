import { useParams } from "react-router-dom";

import Nav from "../nav/nav";
import Footer from "../footer/footer";
import Heroshop from "../hero4/hero4";
import "./detail.css";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useState } from "react";
import { HiHeart } from "react-icons/hi";
import { useEffect } from "react";
import { PiArrowBendDoubleUpRightBold } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { API_URL } from "../config";

import Review from "./review";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  images_json: string[];
  category: string;
  SKU: string;
  Status: number;
  Tags_json: string[];
  Weight: number;
  Dimensions: string;
  Product_year: number;
  Product_manual: string;
  Refundable: string;
};



export default function Details() {
  const { id } = useParams<{ id: string }>();
  // const product = products.find((p) => p.id === Number(id));
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setquantity] = useState<number | string>(1);

  const [mainImage, setMainImage] = useState(0);
  const imglen = Number(product?.images_json?.length);
  const [desc, setdesc] = useState("description");
  useEffect(() => {
    fetch(`${API_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data || data.product || data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;
  const handleplus = () =>
    setquantity((prev) => {
      const current = Number(prev);
      if (product?.Status && current < product.Status) return current + 1;
      return current;
    });

  const AddtoCart = (id: number, qty: number | string) => {
    try {


      fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId: id, qty: Number(qty) }),
      })
    } catch (err) {
      console.log("err fetching");
    }
  }

  const handleminus = () =>
    setquantity((prev) => {
      const current = Number(prev);
      return current > 1 ? current - 1 : current;
    });
  const handelinputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value == "") {
      setquantity("");
    } else {
      const num = Number(value);
      if (num >= 1 && num <= (product?.Status ?? Infinity)) {
        setquantity(num);
      }
    }
  };

  const imgsliderright = () =>
    setMainImage((prev) => (prev + 1 < imglen ? prev + 1 : 0));
  const imgsliderleft = () =>
    setMainImage((prev) => (prev - 1 < 0 ? imglen - 1 : prev - 1));

  return (
    <>
      <Nav />
      <Heroshop title={product?.name || "Loading..."} subtitle="PRODUCTS" />
      <div className="product-details">
        <div className="details-imgs">
          <div className="mainimg">
            <img src={product?.images_json?.[mainImage]} alt="" />

            <button onClick={imgsliderright} className="slide-btn1">
              <FaChevronLeft />
            </button>
            <button onClick={imgsliderleft} className="slide-btn2">
              <FaChevronRight />
            </button>
          </div>

          <div className="imgs-slide">
            {product?.images_json?.map((im, index) => (
              <div key={index} className="img-pick">
                <img src={im} alt="" onClick={() => setMainImage(index)} />
              </div>
            ))}
          </div>
        </div>

        <div className="details-con">
          <h2 className="details-price">{product?.price}</h2>
          <p className="details-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            aspernatur illum perspiciatis pariatur unde consequuntur non illo,
            tempore ducimus est sunt nulla magnam repellendus officiis, libero
            quibusdam! Quam, esse ratione.
            <br />
            <br />
            Maecenas imperdiet ullamcorper hendrerit. Quisque nisi mi, pretium
            at nibh sed, euismod a tincidunt ante. Vivamus condimentum diam
            velit, nec semper velit accumsan eget. Curabitur nunc quam, lacinia
            sed nisl et, vehicula consectetur odio. Morbi volutpat pretium
            tellus. Praesent non lacinia sem.
          </p>
          <div className="prod-quantity">
            <button onClick={handleminus} className="btn-quantity1">
              <FaMinus />
            </button>

            <input
              type="number"
              value={quantity}
              onChange={handelinputChange}
              className="input-quant"
            />
            <button onClick={handleplus} className="btn-quantity2">
              <FaPlus />
            </button>
          </div>
          <div className="detail-btns">
            <div className="details-addtocart" onClick={() => AddtoCart(product.id,quantity)}>
              <RiShoppingCartLine />
              <a href="">Add to cart</a>
            </div>
            <div className="shop-heart">
              <HiHeart />
            </div>
            <div className="shop-compare">
              <PiArrowBendDoubleUpRightBold />
            </div>
          </div>
          <p
            style={{
              backgroundColor: "#67676712",
              color: "#676767",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <i>
              <RiShoppingCartLine />
            </i>
            <b>223</b> people have added this product to their cart
          </p>
          <hr />
          <div className="details-info">
            <ul style={{ fontWeight: "bold" }}>
              <li>Brand</li>
              <li>SKU</li>
              <li>Status</li>
              <li>Tags</li>
              <li>Categories</li>
            </ul>
            <ul style={{ color: "#676767" }}>
              <li>XTRA</li>
              <li>{product?.SKU}</li>
              <li>{product?.Status} in stock</li>
              <li>{product?.Tags_json}</li>
              <li>{product?.category}</li>
            </ul>
          </div>
          <hr />

          <ul className="features-list">
            <li>
              <FaRegCheckCircle /> Free shipping on all orders over $100
            </li>
            <li>
              <FaRegCheckCircle /> 14 days easy refund & returns
            </li>
            <li>
              <FaRegCheckCircle /> Product taxes and customs duties included
            </li>
          </ul>

          <hr />

          <p className="features-list">Secure payments:</p>
          <img
            src="https://xtratheme.com/wp-content/uploads/2025/07/cards.png"
            alt=""
            style={{ width: "250px" }}
          />
        </div>
      </div>
      <div className="details-details">
        <button
          className={`details-addtocart ${desc === "description" ? "active" : ""
            }`}
          onClick={() => setdesc("description")}
        >
          Description
        </button>

        <button
          className={`details-addtocart ${desc == "info" ? "active" : ""}`}
          onClick={() => setdesc("info")}
        >
          Information
        </button>

        <button
          className={`details-addtocart ${desc == "review" ? "active" : ""}`}
          onClick={() => setdesc("review")}
        >
          Reviews
        </button>

        <button
          className={`details-addtocart ${desc === "size" ? "active" : ""}`}
          onClick={() => setdesc("size")}
        >
          Size Guide
        </button>

        <button
          className={`details-addtocart  ${desc === "faq" ? "active" : ""}`}
          onClick={() => setdesc("faq")}
        >
          FAQ
        </button>

        <button
          className={`details-addtocart ${desc === "shipping" ? "active" : ""}`}
          style={{ width: "160px" }}
          onClick={() => setdesc("shipping")}
        >
          Shipping & Returns
        </button>
      </div>
      <div className="details-open features-list">
        {desc == "description" && (
          <div>
            <h3>
              <strong>Your Personal Assistant</strong>
            </h3>
            <p>
              Welcome to the next generation of assistance with our Future
              Helper Robot. Engineered with cutting-edge artificial
              intelligence, this robotic companion serves as your personal
              assistant, seamlessly integrating into your daily routine to
              enhance productivity and convenience. Whether you need help with
              scheduling, organization, or simply a friendly chat, our Future
              Helper Robot is always at your service, learning from your
              preferences and adapting to your needs over time.
            </p>
            <br />
            <h3>
              <strong>Effortless Household Management</strong>
            </h3>
            <p>
              Say goodbye to mundane chores and hello to newfound freedom with
              our Future Helper Robot. Equipped with nimble mobility and
              dexterous manipulators, it effortlessly navigates your home,
              tackling household tasks with efficiency and precision. From
              cleaning and tidying to managing smart home devices and even
              assisting with meal preparation, this robot revolutionizes the way
              you maintain your living space, leaving you with more time to
              focus on what truly matters.
            </p>
            <br />
            <h3>
              <strong>Entertainment Hub of Tomorrow</strong>
            </h3>
            <p>
              But our Future Helper Robot is more than just a practical
              assistant—it’s also a gateway to endless entertainment and
              enrichment. With its intuitive interface and seamless
              connectivity, it transforms into your personal entertainment hub,
              streaming music, news, and immersive virtual reality experiences
              at your command. Whether you’re unwinding after a long day or
              seeking inspiration for your next adventure, this robot brings
              entertainment to life in ways you never thought possible.
            </p>
            <br />
            <p>
              Experience the future today with our Future Helper Robot. Embrace
              a world where technology works for you, empowering you to achieve
              more, live better, and unlock the full potential of tomorrow.
            </p>
          </div>
        )}

        {desc == "info" && (
          <div className="information">
            <h3>Additional information</h3>
            <hr />
            <table>
              <tr>
                <td style={{ width: "130px" }}>Weight</td>
                <td className="td">{product?.Weight} kg</td>
              </tr>
              <tr className="tr">
                <td>Dimensions</td>
                <td className="td">{product?.Dimensions}</td>
              </tr>
              <tr>
                <td>Product year</td>
                <td className="td">{product?.Product_year}</td>
              </tr>
              <tr className="tr">
                <td>Product manual</td>
                <td className="td">{product?.Product_manual}</td>
              </tr>
              <tr>
                <td>Refundable</td>
                <td className="td">{product?.Refundable}</td>
              </tr>
            </table>
          </div>
        )}
        {desc == "review" && <Review productId={product.id} />}
        {desc === "size" && (
          <div className="size-guide-table">
            <table>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>USA</th>
                  <th>Europe</th>
                  <th>Others</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold" }}>XS</td>
                  <td>28–30</td>
                  <td>27–29</td>
                  <td>34–36</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>S</td>
                  <td>30–32</td>
                  <td>29–31</td>
                  <td>36–38</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>M</td>
                  <td>32–33</td>
                  <td>31–33</td>
                  <td>38–40</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>L</td>
                  <td>33–34</td>
                  <td>33–36</td>
                  <td>40–44</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>XL</td>
                  <td>34–38</td>
                  <td>36–40</td>
                  <td>44–48</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>XXL</td>
                  <td>38–48</td>
                  <td>40–44</td>
                  <td>48–50</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {desc === "faq" && (
          <div className="faq">
            <h3>FAQ</h3>
            <img
              src="https://xtratheme.com/wp-content/uploads/2024/04/faq.jpg"
              alt=""
            />
            <ul>
              <li>
                <h5>What payment methods do you accept?</h5>
                <p>
                  We accept various payment methods, including credit/debit
                  cards, PayPal, and bank transfers for your convenience.
                </p>
              </li>
              <li>
                <h5>Do you offer international shipping</h5>
                <p>
                  Yes, we offer international shipping to many countries. Please
                  check our shipping information page for details on available
                  destinations and shipping rates.
                </p>
              </li>
              <li>
                <h5>How can I track my order?</h5>
                <p>
                  Once your order is shipped, you will receive a tracking number
                  via email. You can use this number to track your package's
                  delivery status on our website or through the courier's
                  tracking portal.
                </p>
              </li>
              <li>
                <h5>What is your return policy?</h5>
                <p>
                  We offer a hassle-free return policy. If you're not satisfied
                  with your purchase for any reason, you can return it within 30
                  days for a full refund or exchange. Please refer to our
                  returns page for detailed instructions.
                </p>
              </li>
              <li>
                <h5>Are your products covered by a warranty?</h5>
                <p>
                  Yes, most of our products come with a manufacturer's warranty
                  against defects in materials and workmanship. The duration and
                  terms of the warranty vary by product, so please check the
                  product description or contact our customer support team for
                  specific details.
                </p>
              </li>
            </ul>
          </div>
        )}

        {desc === "shipping" && (
          <div className="shipping">
            <h3>Shipping & Delivert</h3>
            <p>
              All estimated shipping times are in addition to fulfillment times,
              We offer a next working day delivery for orders placed before 6:30
              p.m. Monday to Friday. Orders placed after this will be delivered
              within two working days. This excludes Saturday, Sunday and
              holidays. Appointed is not responsible for any customs/duties
              related to international orders. We are unable to calculate
              charges prior to your order being delivered, and recommend
              checking with your local customs office for more information.
              Shipping fees will not be refunded if you refuse these charges.
            </p>
            <div className="shipping-list">
              <ul>
                <li>
                  <p>Free destination delivery above $100</p>
                </li>
                <li>
                  <p>Europe 1 – 3 days Free</p>
                </li>
                <li>
                  <p>United States 4 – 6 days Free</p>
                </li>
                <li>
                  <p>Asia 3 – 6 days Free</p>
                </li>
                <li>
                  <p>Africa 5 – 7 days Free</p>
                </li>
                <li>
                  <p>Australia 3 – 5 days Free</p>
                </li>
              </ul>
              <img
                src="https://xtratheme.com/wp-content/uploads/2024/04/shipping.png"
                alt=""
              />
            </div>
            <h3>Returns & Refunds</h3>
            <p>
              We have a 14-day return policy, which means you have 14 days after
              receiving your item to request a return, To be eligible for a
              return, your item must be in the same condition that you received
              it, unused, and in its original packaging. You’ll also need the
              order confirmation, order number, or proof of purchase. We will
              notify you once we’ve received and inspected your return, and let
              you know if the refund was approved or not. If approved, you’ll be
              automatically refunded on your original payment method. Please
              remember it can take some time for your bank or credit card
              company to process and post the refund too.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
