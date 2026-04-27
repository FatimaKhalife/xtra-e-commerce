
import Nav from "./nav/nav.tsx";
import Heroshop from "./hero4/hero4.tsx";
import Footer from "./footer/footer.tsx";
import Shop1 from "./shop/shop.tsx";


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
