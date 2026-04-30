import "./shop.css";
import { useState, useEffect, useRef } from "react";
// import products from "./products.tsx";
import { CiHeart } from "react-icons/ci";
import { PiArrowBendDoubleUpRightBold } from "react-icons/pi";
import { CgSearch } from "react-icons/cg";
import { API_URL } from "../config";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

type Product =  {
    id: number;
    name: string;
    price: number;
    image: string;
    images__json: string[];
    category:string;
    SKU: string;
    Status: number;
    Tags__json: string[];
    Weight: number;
    Dimensions: string;
    Product_year: number;
    Product_manual: string;
    Refundable: string;
  };
function Shop1() {
  const [products, setProducts] = useState<Product[]>([]);
  const [hovered1, sethovered1] = useState(false);
  const [hovered2, sethovered2] = useState(false);
  const [hovered3, sethovered3] = useState(false);
  const [productnb, setproductnb] = useState(6);
  const [currentpage, setcurrentpage] = useState(1);
  const productsperpage = productnb;
  const totalpages = Math.ceil(products.length / productsperpage);
  const startIndex = (currentpage - 1) * productsperpage;
  const [isOpen, setIsOpen] = useState(false);

  const currentproduct = products.slice(
    startIndex,
    startIndex + productsperpage
  );

  const [grid1, setgrid1] = useState("repeat(3,1fr)");

  const proddrop = [6, 16, 32, 48, 128];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDown = () => {
    setIsOpen(!isOpen);
  };

  const handleselect = (prod: number) => {
    setproductnb(prod);
    setIsOpen(false);
  };
  useEffect(() => {
  fetch(`${API_URL}/products`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
    });
}, []);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="shop">
    
      <div className="prod-arr">
        <div className="shop-svg">
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            onClick={() => setgrid1("repeat(2,1fr)")}
          >
            <rect
              x="15"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="25"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="25"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="15"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
          </svg>
          <svg
            width={40}
            height={40}
            viewBox="0 0 50 50"
            fill="none"
            onClick={() => setgrid1("repeat(3,1fr)")}
          >
            <rect
              x="15"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="25"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="35"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />

            <rect
              x="25"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="15"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="35"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />

            <rect
              x="25"
              y="35"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="15"
              y="35"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="35"
              y="35"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
          </svg>
          <svg
            width={40}
            height={40}
            viewBox="0 0 60 60"
            fill="none"
            onClick={() => setgrid1("repeat(4,1fr)")}
          >
            <rect
              x="15"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="25"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="35"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="45"
              y="15"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />

            <rect
              x="25"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="15"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="35"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="45"
              y="25"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />

            <rect
              x="25"
              y="35"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="15"
              y="35"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="35"
              y="35"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="45"
              y="35"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />

            <rect
              x="25"
              y="45"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="15"
              y="45"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="35"
              y="45"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
            <rect
              x="45"
              y="45"
              width={6}
              height={6}
              fill="black"
              rx={1}
              ry={1}
            />
          </svg>
        </div>

        <div className="prod-nb" ref={dropdownRef}>
          <button
            onClick={toggleDown}
            style={{ border: isOpen ? "0.5px solid red" : "" }}
          >
            {productnb} products <MdArrowDropDown />
          </button>
          {isOpen && (
            <ul>
              {proddrop.map((prod, index) => (
                <li key={index} onClick={() => handleselect(prod)}>
                  {prod} products
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
   
      <div className="shop-grid" style={{ gridTemplateColumns: grid1 }}>
        {currentproduct.map((product, index) => (
          <div key={index}>
            <Link to={`/product/${product.id}`} >
              <div className="shop-content">
                <div className="shop-img">
                  <img src={product.image}/>

                  <div className="shop-left">
                    <div className="shop-h1">
                      <div
                        className="shop-add"
                        style={{
                          opacity: hovered1 ? 1 : 0,
                          transform: hovered1 ? "scale(1)" : "scale(0)",
                        }}
                      >
                        <a href="">Add to wishlist</a>
                      </div>
                      <div
                        className="shop-heart"
                        onMouseEnter={() => sethovered1(true)}
                        onMouseLeave={() => sethovered1(false)}
                      >
                        <CiHeart />
                      </div>
                    </div>

                    <div className="shop-h2">
                      <div
                        className="shop-add"
                        style={{
                          opacity: hovered2 ? 1 : 0,
                          transform: hovered2 ? "scale(1)" : "scale(0)",
                        }}
                      >
                        <a href="">Add to compare</a>
                      </div>
                      <div
                        className="shop-compare"
                        onMouseEnter={() => sethovered2(true)}
                        onMouseLeave={() => sethovered2(false)}
                      >
                        <PiArrowBendDoubleUpRightBold />
                      </div>
                    </div>

                    <div className="shop-h3">
                      <div
                        className="shop-add"
                        style={{
                          opacity: hovered3 ? 1 : 0,
                          transform: hovered3 ? "scale(1)" : "scale(0)",
                        }}
                      >
                        <a href="">Quick view</a>
                      </div>
                      <div
                        className="shop-search"
                        onMouseEnter={() => sethovered3(true)}
                        onMouseLeave={() => sethovered3(false)}
                      >
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

      {/* <div className="page-btns">
        <button
          className={currentpage <= totalpages && currentpage != 1 ? "" : "dis"}
          onClick={() =>
            setcurrentpage(currentpage === totalpages ? currentpage - 1 : 1)
          }
        >
          <FaArrowLeftLong />
        </button>

        {[...Array(totalpages)].map((_, index) => (
          <button
            className={currentpage === index + 1 ? "page-btn" : ""}
            key={index}
            onClick={() => setcurrentpage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={currentpage < totalpages ? "" : "dis"}
          onClick={() =>
            setcurrentpage(currentpage < totalpages ? currentpage + 1 : 1)
          }
        >
          <FaArrowRightLong />
        </button>
      </div> */}
      <Pagination
  currentPage={currentpage}
  totalPages={totalpages}
  onPageChange={setcurrentpage}
/>
    </div>
  );
}
export default Shop1;
