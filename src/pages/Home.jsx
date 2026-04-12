import Navbar from "../components/HomeNavabar";
import Hero from "../components/HomeHero";
import Rooms from "../components/HomeRoom";
import Dining from "../components/HomeDining";
import Footer from "../components/HomeFooter";

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