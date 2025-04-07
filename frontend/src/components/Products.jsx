import React, { useState } from "react";
import AuctionCard from "./AuctionCard";
import { products as productData } from "../constants/products.js";
import { useNavigate } from "react-router-dom";


const Products = () => {
  const [products] = useState(productData);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; 
   const navigate = useNavigate();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col  items-center min-h-screen bg-white p-5">
      {/* Product List */}
      <div className="flex flex-wrap gap-6 justify-center">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <AuctionCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={`SAR ${product.price}/KG`}
              timer={product.startTime}
              lotNumber={product.lotNumber}
              quantity={product.quantity}
              remainingQuantity={product.remainingQuantity}
              onBidClick={() => navigate(`/product/${product.id}`)}
            />
          ))
        ) : (
          <p className="text-gray-600 text-lg">No products</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-3 py-1 border border-teal-700 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          <span className="text-teal-700 text-2xl"> ←</span>
        </button>
        <button
          onClick={nextPage}
          className={`bg-primary text-white px-6 py-2 ${
            currentPage === Math.ceil(products.length / productsPerPage)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-white"
          } rounded-md`}
        >
          Next
        </button>
        <p>
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </p>
      </div>
    </div>
  );
};

export default Products;
