
import Nav from "./nav/nav.tsx";
import Hero from "./hero1/hero.tsx";
import Hero2 from "./hero2/hero2.tsx";
import Service1 from "./sercive1/service1.tsx";
import Counter from "./coutup/countup.tsx";
import Details from "./details/details.tsx";
import Hero3 from "./hero3/hero3.tsx";
import Partners from "./partners/partners.tsx";
import Consult from "./sercive1/consult.tsx";
import Footer from "./footer/footer.tsx";


function Home() {
 
  return (
    <>
    
    
      <Nav />
      <Hero
        title="OUR MISSION"
        subtitle="WE MAKE QUALITY"
        backgroundImage="https://cdn.pixabay.com/photo/2024/07/19/09/46/ai-generated-8905906_1280.jpg"
      />

      <Hero2
        title="OUR SERVICE"
        subtitle="WHAT WE DO?"
        description="A factory, manufacturing plant or a production plant is an industrial site,
        usually consisting of buildings and machinery"
        img={false}
      />
      <Service1 />

      <Hero2
        title="OUR SERVICE"
        subtitle="WHAT WE DO?"
        description="A factory, manufacturing plant or a production plant is an industrial site,
        usually consisting of buildings and machinery"
        usecontent={false}
        img={true}
        btn2={false}
      />

      <Counter />
      <Details />
      <Hero3 title="OUR PROJECT" subtitle="WHAT WE DONE?" slide ={true}/>
      <Hero2
        title="WE PROVIDE THE BEST"
        subtitle="MANUFACTURING CONSULTING"
        description="A factory, manufacturing plant or a production plant is an industrial site,
        usually consisting of buildings and machinery"
        usecontent={false}
        img={true}
        btn={false}
      />
      <Partners />
      <Consult />
      <Footer />
    </>
  );
}

export default Home;
