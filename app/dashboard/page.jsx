import MainHeader from "../components/MainHeader";
import TopGame from "../components/TopGame";
import SafeFeatures from "../components/Topgamegrid/Feature";
import LatestGame from "../components/Topgamegrid/Latestgame";

export default function page() {
  return (
    <div>
      <MainHeader />
      <TopGame />
      <SafeFeatures />
      <div className="w-full h-screen bg-white ">
        <h1 className="text-2xl md:text-4xl lg:text-6xl">
          
        </h1>
        <LatestGame />
      </div>
    </div>
  );
}
