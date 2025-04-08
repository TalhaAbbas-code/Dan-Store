import { useParams, useNavigate } from "react-router-dom";
import { products as productData } from "../constants/products";
import { useState } from "react";
import AuctionCard from "../components/AuctionCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products] = useState(productData);
  const [activeTab, setActiveTab] = useState("details");
  const product = products.find((p) => String(p.id) === String(id));
  const inputBoxStyle =
    "flex justify-between bg-neutral-100 border p-5 rounded-md";
  const inputTextStyle = "text-black font-bold";
  const {
    title,
    image,
    quantity,
    remainingQuantity,
    startTime,

    bids = [],
  } = product;
  const highestBid =
    bids.length > 0 ? Math.max(...bids.map((bid) => bid.price)) : 0;
  const totalBids = bids.length;
  const bidStartTime = bids.length > 0 ? bids[0].startTime : "?";

  return (
    <>
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="text-primary px-4 py-2">
        &larr; Back
      </button>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row justify-between shadow-inner py-10 px-4 md:px-[5%] border mx-10 ">
        {/* Product Image Detail */}
        <div className="bg-white w-full flex flex-col   md:w-[30%] p-5 rounded-md">
          <div className="relative flex justify-center items-center">
            <img
              src={image}
              alt={title}
              className="w-full  max-md:max-w-lg object-center rounded"
            />
            {remainingQuantity === 0 && (
              <div className="absolute pb-10 inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white p-3">
                <span className="text-4xl font-bold">Sold</span>
              </div>
            )}

            <div className="absolute inset-0 text-white p-3 flex flex-col justify-end items-start">
              <div className="">
                <h2 className="text-xl font-semibold">{title}</h2>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>{startTime}</span>
              </div>
            </div>
          </div>

          <h2 className="text-xl text-center mt-4 font-bold">
            Time Left: {startTime}
          </h2>

          <div className="mt-4 space-y-2">
            <div className={inputBoxStyle}>
              <p className={inputTextStyle}>Total Quantity:</p>
              <p>{quantity}</p>
            </div>
            <div className={inputBoxStyle}>
              <p className={inputTextStyle}>Remaining Quantity:</p>
              <p>{remainingQuantity}KG</p>
            </div>
          </div>
        </div>

        {/* divide Line */}
        <div className="hidden md:block w-[2px] bg-gray-300 h-auto min-h-full"></div>

        {/* Tabs */}
        <div className="w-full md:w-[30%]">
          <div className="flex justify-center text-lg gap-4 md:gap-[40%]">
            <button
              onClick={() => setActiveTab("details")}
              className={`p-2 ${
                activeTab === "details"
                  ? "font-bold border-b-2 border-primary"
                  : ""
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("allBids")}
              className={`p-2 ${
                activeTab === "allBids"
                  ? "font-bold border-b-2 border-primary"
                  : ""
              }`}
            >
              All Bids
            </button>
          </div>

          {/* Details Section */}
          {activeTab === "details" && (
            <div className="mt-5 space-y-2">
              <div className={inputBoxStyle}>
                <p className={inputTextStyle}>Highest Bid:</p>
                <p>{highestBid}</p>
              </div>
              <div className={inputBoxStyle}>
                <p className={inputTextStyle}>Total Bids:</p>
                <p>{totalBids}</p>
              </div>
              <div className={inputBoxStyle}>
                <p className={inputTextStyle}>Bid Start Time:</p>
                <p>{bidStartTime}</p>
              </div>
            </div>
          )}

          {/* All Bids Section */}
          {activeTab === "allBids" && (
            <div className="mt-4 space-y-2">
              {bids.length === 0 ? (
                <p className="text-gray-600">No bids available.</p>
              ) : (
                bids.map((bid, index) => (
                  <div key={index} className={inputBoxStyle}>
                    <p className={inputTextStyle}>Buyer {index + 1}</p>
                    <p>{bid.startTime}</p>
                    <p>{bid.price} SAR</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* divid Line */}
        <div className="hidden md:block w-[2px] bg-gray-300 h-auto min-h-full"></div>

        {/* Explore  Section */}
        <div className="w-full md:w-[30%]  flex flex-col items-center  space-y-4">
          <p className="text-xl text-center font-bold">Explore More</p>
          <div className="max-md:flex gap-5 flex-wrap max-md:justify-center">
            {products.length > 0 ? (
              products
                .sort(() => Math.random() - 0.5)
                .slice(0, 2)
                .map((product) => (
                  <AuctionCard
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    price={`SAR ${product.price}/KG`}
                    startTime={product.startTime}
                    lotNumber={product.lotNumber}
                    quantity={product.quantity}
                    remainingQuantity={product.remainingQuantity}
                    onBidClick={() => navigate(`/product/${product.id}`)}
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                ))
            ) : (
              <p className="text-gray-600 text-lg">No products</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
