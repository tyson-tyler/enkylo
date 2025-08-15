import MainHeader from "../components/MainHeader";
import TopGame from "../components/TopGame";
import SafeFeatures from "../components/Topgamegrid/Feature";
import LatestGame from "../components/Topgamegrid/Latestgame";

export default function page() {
  return (
    <div>
      <MainHeader />
      <LatestGame />
      <TopGame />
      <SafeFeatures />
    </div>
  );
}
