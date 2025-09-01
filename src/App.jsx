import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BeachesProvider } from "./context/BeachesContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Zone from "./pages/Zone";
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
          <Route path="/:tid/:zid" element={<Zone />} />
          <Route path="/:tid/:zid/:bid" element={<Beach />} />
        </Routes>
        <Footer />
      </Router>
    </BeachesProvider>
  );
}
