import { useState } from "react";
import Nav from "./nav/nav.tsx";
import Heroshop from "./hero4/hero4.tsx";
import Footer from "./footer/footer.tsx";
import Shop1 from "./shop/shop.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";


function Shop() {
  return (
    <>
      <Nav />
      <Heroshop title="SHOP" subtitle="SHOP"/>
      <Shop1 />
      <Footer />
    </>
  );
}

export default Shop;
