import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BeachesProvider } from "./context/BeachesContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Region from "./pages/Region";
import Beach from "./pages/Beach";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default function App() {
  return (
    <BeachesProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/zone/:rid" element={<Region />} />
          <Route path="/zone/:rid/beach/:bid" element={<Beach />} />
        </Routes>
        <Footer />
      </Router>
    </BeachesProvider>
  );
}
