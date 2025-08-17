import MainHeader from "../components/MainHeader";
import TopGame from "../components/TopGame";
import SafeFeatures from "../components/Topgamegrid/Feature";
import Footer from "../components/Topgamegrid/Footer1";
import Latest1game from "../components/Topgamegrid/latest1";
import LatestGame from "../components/Topgamegrid/Genra";
import CTASection from "../components/Topgamegrid/cta";

export default function page() {
  return (
    <div>
      <MainHeader />

      <TopGame />
      <LatestGame />
      <SafeFeatures />
      <Latest1game />

      <Footer />
    </div>
  );
}
