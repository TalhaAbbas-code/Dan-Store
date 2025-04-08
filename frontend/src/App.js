import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Footer from "./components/Footer.jsx"
import CommoditiesGroup from "./Pages/CommoditiesGroup.jsx";
import SupplierDetailProduct from "./Pages/SupplierDetailProduct.jsx"
import TraderDetailProduct from "./Pages/TraderDetailProduct.jsx";
import MarketPlace from "./Pages/MarketPlace.jsx"

import Chat from "./Pages/Chat.jsx"
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commodities" element={<CommoditiesGroup />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/product/:id" element={<TraderDetailProduct />} />
          <Route path="/product/:id/supplier" element={<SupplierDetailProduct />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
