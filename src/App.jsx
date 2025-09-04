import { /*BrowserRouter*/ HashRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { BeachesProvider } from "./context/BeachesContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Zone from "./pages/Zone";
import Beach from "./pages/Beach";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function ZoneWrapper() {
  const { tid, zid } = useParams();
  return <Zone key={`${tid}-${zid}`} />;
}

function BeachWrapper() {
  const { tid, zid, bid } = useParams();
  return <Beach key={`${tid}-${zid}-${bid}`} />;
}

export default function App() {
  return (
    <BeachesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:tid/:zid" element={<ZoneWrapper />} />
          <Route path="/:tid/:zid/:bid" element={<BeachWrapper />} />
        </Routes>
        <Footer />
      </Router>
    </BeachesProvider>
  );
}
