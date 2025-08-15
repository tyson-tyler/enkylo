import Navbar from "../components/navbar";
import Footer from "../components/Topgamegrid/Footer";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
