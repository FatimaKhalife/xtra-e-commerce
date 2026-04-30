import Carttable from "./Carttable";
import Nav from "../nav/nav.tsx";
import Heroshop from "../hero4/hero4.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../footer/footer.tsx";
import { FaShippingFast } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { PiArrowBendDoubleUpRightBold } from "react-icons/pi";
import { CgSearch } from "react-icons/cg";
import { TbShoppingCartExclamation } from "react-icons/tb";
import { RiShoppingCartLine } from "react-icons/ri";
import "./Cart.css";
import { API_URL } from "../config";

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
type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    images__json: string[];
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

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [hovered1, sethovered1] = useState(false);
    const [hovered2, sethovered2] = useState(false);
    const [hovered3, sethovered3] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/products/`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, []);

    const allTags = cart.flatMap(item => item.Tags_json);
    const notIncart = products.filter((product) => !cart.some((item) => product.id === item.id));

    const suggest = notIncart
        .sort((a, b) => {
            const ascore = a.Tags_json.filter(tag => allTags.includes(tag)).length;
            const bscore = b.Tags_json.filter(tag => allTags.includes(tag)).length;
            return bscore - ascore;
        }).slice(0, 2);

    const suggest2 = notIncart.sort(() => 0.5 - Math.random()).slice(0, 4);

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

    const empty = cart.length === 0;

    const handleIncrease = async (id: number) => {
        try {
            await fetch(`${API_URL}/cart/increase`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId: id }),
            })
            fetchCart();
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    }

    const handleDecrease = async (id: number) => {
        try {
            await fetch(`${API_URL}/cart/decrease`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId: id }),
            })
            fetchCart();
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    }

    const handleRemove = async (id: number) => {
        try {
            await fetch(`${API_URL}/cart/delete`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId: id }),
            });
            fetchCart();
        } catch (err) {
            console.error("Error updating cart:", err);
        }
    }

    return (
        <div>
            <Nav />
            <Heroshop title="Cart" subtitle="CART" />
            <div className="cart">
                {!empty ?
                    <div>
                        <Carttable items={cart}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                            onRemove={handleRemove} />
                        <div>
                            <button className="details-addtocart" onClick={() => navigate("/shop")}>Continue shopping</button>
                        </div>
                        <div className="cart-extra">
                            <div className="total-price">
                                <div className="cart-totals">YOU MAY BE INTERESTED IN ...</div>
                                <div className="shop-grid">
                                    {suggest.map((product, index) => (
                                        <div key={index}>
                                            <Link to={`/product/${product.id}`}>
                                                <div className="shop-content">
                                                    <div className="shop-img">
                                                        <img src={product.image} />
                                                        <div className="shop-left">
                                                            <div className="shop-h1">
                                                                <div className="shop-add" style={{ opacity: hovered1 ? 1 : 0, transform: hovered1 ? "scale(1)" : "scale(0)" }}>
                                                                    <a href="">Add to wishlist</a>
                                                                </div>
                                                                <div className="shop-heart" onMouseEnter={() => sethovered1(true)} onMouseLeave={() => sethovered1(false)}>
                                                                    <CiHeart />
                                                                </div>
                                                            </div>
                                                            <div className="shop-h2">
                                                                <div className="shop-add" style={{ opacity: hovered2 ? 1 : 0, transform: hovered2 ? "scale(1)" : "scale(0)" }}>
                                                                    <a href="">Add to compare</a>
                                                                </div>
                                                                <div className="shop-compare" onMouseEnter={() => sethovered2(true)} onMouseLeave={() => sethovered2(false)}>
                                                                    <PiArrowBendDoubleUpRightBold />
                                                                </div>
                                                            </div>
                                                            <div className="shop-h3">
                                                                <div className="shop-add" style={{ opacity: hovered3 ? 1 : 0, transform: hovered3 ? "scale(1)" : "scale(0)" }}>
                                                                    <a href="">Quick view</a>
                                                                </div>
                                                                <div className="shop-search" onMouseEnter={() => sethovered3(true)} onMouseLeave={() => sethovered3(false)}>
                                                                    <CgSearch />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="shop-addtocart">
                                                            <RiShoppingCartLine />
                                                            <a href="">Add to cart</a>
                                                        </div>
                                                        <div className="shop-price">
                                                            <p>{product.price}</p>
                                                        </div>
                                                    </div>
                                                    <div className="shop-info">
                                                        <div className="shop-info2">
                                                            <h4>{product.name}</h4>
                                                            <p>{product.category}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
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
                                        <div style={{ margin: "30px 0" }}>
                                            <p style={{ color: "#676767", padding: "10px", display: "flex", gap: "5px" }}>
                                                <i><FaShippingFast /></i>
                                                Add <b>${freeship}</b> more to get free shipping!
                                            </p>
                                            <div className="progress-slider">
                                                <div className="filled" style={{ width: `${100 - freeship}%` }}></div>
                                            </div>
                                        </div>
                                        : ""}
                                    <button className="details-addtocart" form="checkout-form" type="submit" onClick={() => navigate("/checkout")}>Place order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="cart-extra two">
                        <div className="empty-cart">
                            <TbShoppingCartExclamation style={{ fontSize: "15rem", color: "rgba(128, 128, 128, 0.29)" }} />
                            <h4>Looks like your cart is empty!</h4>
                            <p>Time to start your shopping</p>
                        </div>
                        <div className="total-price">
                            <div className="cart-totals">YOU MAY BE INTERESTED IN ...</div>
                            <div className="shop-grid">
                                {suggest2.map((product, index) => (
                                    <div key={index}>
                                        <Link to={`/product/${product.id}`}>
                                            <div className="shop-content">
                                                <div className="shop-img">
                                                    <img src={product.image} />
                                                    <div className="shop-left">
                                                        <div className="shop-h1">
                                                            <div className="shop-add" style={{ opacity: hovered1 ? 1 : 0, transform: hovered1 ? "scale(1)" : "scale(0)" }}>
                                                                <a href="">Add to wishlist</a>
                                                            </div>
                                                            <div className="shop-heart" onMouseEnter={() => sethovered1(true)} onMouseLeave={() => sethovered1(false)}>
                                                                <CiHeart />
                                                            </div>
                                                        </div>
                                                        <div className="shop-h2">
                                                            <div className="shop-add" style={{ opacity: hovered2 ? 1 : 0, transform: hovered2 ? "scale(1)" : "scale(0)" }}>
                                                                <a href="">Add to compare</a>
                                                            </div>
                                                            <div className="shop-compare" onMouseEnter={() => sethovered2(true)} onMouseLeave={() => sethovered2(false)}>
                                                                <PiArrowBendDoubleUpRightBold />
                                                            </div>
                                                        </div>
                                                        <div className="shop-h3">
                                                            <div className="shop-add" style={{ opacity: hovered3 ? 1 : 0, transform: hovered3 ? "scale(1)" : "scale(0)" }}>
                                                                <a href="">Quick view</a>
                                                            </div>
                                                            <div className="shop-search" onMouseEnter={() => sethovered3(true)} onMouseLeave={() => sethovered3(false)}>
                                                                <CgSearch />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="shop-addtocart">
                                                        <RiShoppingCartLine />
                                                        <a href="">Add to cart</a>
                                                    </div>
                                                    <div className="shop-price">
                                                        <p>{product.price}</p>
                                                    </div>
                                                </div>
                                                <div className="shop-info">
                                                    <div className="shop-info2">
                                                        <h4>{product.name}</h4>
                                                        <p>{product.category}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="details-addtocart" onClick={() => navigate("/shop")}>Return to shop</button>
                    </div>
                }
                <Footer />
            </div>
        </div>
    )
}