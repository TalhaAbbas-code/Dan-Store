import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Footer from "./components/Footer.jsx";
import CommoditiesGroup from "./CommoditiesGroup.jsx"
import SupplierDetailProduct from "./components/SupplierDetailProduct.jsx";
import TraderDetailProduct from "./components/TraderDetailProduct.jsx";
import MarketPlace from "./MarketPlace.jsx";
import { io } from "socket.io-client";
const App = () => {
  const socket = io("http://localhost:8800");
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commodities" element={<CommoditiesGroup />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/product/:id" element={<TraderDetailProduct />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};


export default App;
