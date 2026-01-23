import Nav from "./nav/nav.tsx";
import Heroshop from "./hero4/hero4.tsx";
import Footer from "./footer/footer.tsx";
import History from "./aboutus/History.tsx";
import Mission from "./aboutus/mission.tsx";
import Hero3 from "./hero3/hero3.tsx"
import Stats from "./aboutus/results.tsx";
import Hiring from "./aboutus/hiring.tsx";
import Info from "./aboutus/info.tsx";
export default function Aboutus() {
    return (
        <div>
            <Nav />
            <Heroshop title="ABOUT US" subtitle="ABOUT US" />
            <History />
            <Hero3 title="OUR PROJECT" subtitle="WHAT WE DONE?" slide={false} />
            <Mission />
            <Stats />
            <Hiring />
            <Info />
            <Footer />
        </div>
    )
}