import Navbar from "../components/Home/HomeNavabar";
import Hero from "../components/Home/HomeHero";
import Rooms from "../components/Home/HomeRoom";
import Dining from "../components/Home/HomeDining";
import Footer from "../components/Home/HomeFooter";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Rooms />
      <Dining />
      <Footer />
    </div>
  );
};

export default Home;