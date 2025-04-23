import React from "react";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { products as productData } from "../constants/products";
import { FaCheck } from "react-icons/fa6";
import Rectangle from "../assets/images/Rectangle 42.png";
import * as images from "../assets/images";
import { useNavigate } from "react-router-dom";
import * as CommoditiesApi from "../api/CommoditiesRequests";
const CommoditiesGroup = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [products] = useState(productData);
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState();
  //const categories = [...new Set(products.map((product) => product.category))];
  const [categories,setcategories]=useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
   const [selectedUnit, setSelectedUnit] = useState("");


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const handleUnit = (e) => {
    setSelectedUnit(e.target.value);
    
  };
  useEffect(() => {
    // Function to call API
    const fetchData = async () => {
      try {
         const response = await CommoditiesApi.GetCommodities();
         console.log(response)
       if(response){
        const data = response.data.response;
        console.log("set data",data);
        setcategories(data)
       }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchUnits = async () => {
      try {
        const response = await CommoditiesApi.GetUnits();
        
        if (response) {
          const data = response.data.response;
          
         setUnit(data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchUnits(); 
  }, []);
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
          btnClick={async () => {
            if (selectedCategory) {
              const payload = {
                commodityIds: [selectedCategory.id],
              };
              try {
                const response = await CommoditiesApi.SetCommodities(payload);

                if (response) {
                  const data = response.data.response;

                  setFilteredProducts(data);
                  setStep(2);
                }
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            } else {
              console.log("category not selected");
            }
          }}
        >
          <div className="flex flex-wrap max-sm:flex-col gap-4 mt-10">
            {categories?.map((category, index) => (
              <div
                key={index}
                className={`relative cursor-pointer   rounded-md border-2 flex flex-col  items-center justify-center w-56 h-48 overflow-hidden transition-all
              `}
                onClick={() => handleCategorySelect(category)}
              >
                <img
                  src={Rectangle}
                  alt={category.name}
                  className="w-full h-full  object-cover"
                />

                <span className="absolute  bottom-0 text-white text-2xl left-3  font-semibold">
                  {category.name}
                </span>

                {/* Tick Icon */}
                {selectedCategory.id === category.id && (
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
          title={selectedCategory.name}
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
                  src={Rectangle}
                  alt={product.name}
                  className="w-full h-[70%] rounded-xl  object-cover"
                />

                <span className="   text-black text-md left-3  ">
                  {product.name}
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
          btnClick={async() =>{
            
             try {
               const payload = {
                 unitId: selectedUnit,
                 subCommodityId: selectedProduct.id,
                 quantity: quantity,
               };
              console.log(payload);
               const response = await CommoditiesApi.CreateTrade(payload);

               if (response) {
                 const data = response.data.response;
                 console.log(data)
                 setStep(4);

                
               }
             } catch (error) {
               console.error("Error fetching data:", error);
             }
            
            }}
        >
          <div className="w-96">
            <div className="w-full  flex flex-col bg-white   shadow-lg">
              <img
                src={Rectangle}
                alt={selectedProduct.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />

              <p className="font-semibold mb-2">
                <span className="text-gray-700">Sub-Commodity Name:</span>{" "}
                {selectedProduct.name}
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
              <select value={selectedUnit} onChange={handleUnit}>
                <option value="">Select Unit</option>
                {unit.map((unit) => (
                  <option key={unit.id} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
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
