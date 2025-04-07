import React from "react";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import { products as productData } from "./constants/products";
import { FaCheck } from "react-icons/fa6";
import Rectangle from "./assets/images/Rectangle 42.png";
import * as images from "./assets/images";
import { useNavigate } from "react-router-dom";
const CommoditiesGroup = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [products] = useState(productData);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("KG");
  const categories = [...new Set(products.map((product) => product.category))];
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };
  /*const handleNext = () => {
       if (!quantity) {
         alert("Please enter quantity");
         return;
       }
       const updatedProduct = { ...selectedProduct, quantity, unit };
     };*/

  return (
    <div>
      {step === 1 && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Commodities Group"
          subTittle="Select Commodities Group of your interest"
          btnClick={() => setStep(2)}
        >
          <div className="flex max-sm:flex-col gap-4 mt-10">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`relative cursor-pointer   rounded-md border-2 flex flex-col  items-center justify-center w-56 h-48 overflow-hidden transition-all
              `}
                onClick={() => handleCategorySelect(category)}
              >
                <img
                  src={Rectangle}
                  alt={category}
                  className="w-full h-full  object-cover"
                />

                <span className="absolute  bottom-0 text-white text-2xl left-3  font-semibold">
                  {category}
                </span>

                {/* Tick Icon */}
                {selectedCategory === category && (
                  <FaCheck className="absolute top-[40%] left-[40%] text-white font-bold text-5xl " />
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}
      {step === 2 && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={selectedCategory}
          btnClick={() => setStep(3)}
        >
          <div className="flex flex-wrap max-sm:flex-col gap-4 mt-10">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className={`relative cursor-pointer   rounded-md  flex flex-col  items-center justify-center w-44 h-48 overflow-hidden transition-all
              `}
                onClick={() => handleProductSelect(product)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[70%] rounded-xl  object-cover"
                />

                <span className="   text-black text-md left-3  ">
                  {product.title}
                </span>

                {/* Tick Icon */}
                {selectedProduct.id === product.id && (
                  <FaCheck className="absolute top-[40%] left-[40%] text-white font-bold text-5xl " />
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}
      {step === 3 && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Create Trade"
          subTittle="Please fill out the following"
          btnClick={() => setStep(4)}
        >
          <div className="w-96">
            <div className="w-full  flex flex-col bg-white   shadow-lg">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              <p className="font-semibold mb-2">
                <span className="text-gray-700">Sub-Commodity Name:</span>{" "}
                {selectedProduct.title}
              </p>

              <label className="block text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border p-2 rounded-md mb-4"
              />

              <label className="block text-gray-700 mb-1">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full border p-2 rounded-md mb-4"
              >
                <option value="KG">KG</option>
                <option value="Ton">Ton</option>
                <option value="Gram">Gram</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
      {step === 4 && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          btnClick={() => {
            setIsOpen(false);
            navigate("/");
          }}
        >
          <div className=" flex justify-center">
            <img
              src={images.registrationSuccess}
              alt="Logo"
              className="w-[50%]  h-full object-cover "
            />
          </div>
          <p className="text-2xl mt-5 font-semibold text-center">
            Trade has been Created
          </p>
        </Modal>
      )}
    </div>
  );
};

export default CommoditiesGroup;
