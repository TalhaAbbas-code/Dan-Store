import { useParams, useNavigate } from "react-router-dom";
import { products as productData } from "../constants/products";
import { useState } from "react";
import AuctionCard from "../components/AuctionCard";
import { productData as productBuyOptions } from "../constants/productBuyOptions";

const TraderDetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products] = useState(productData);
  const [activeTab, setActiveTab] = useState("Buy Now");
  const product = products.find((p) => String(p.id) === String(id));
  const [disabledIndex, setDisabledIndex] = useState(null);
  const inputBoxStyle =
    "flex justify-between items-center bg-neutral-100 border p-5 rounded-md";
  const inputTextStyle = "text-black ";
  const {
    title,
    image,
    quantity,
    remainingQuantity,
    startTime,
    endTime,

    bids = [],
  } = product;
  const InfoBox = ({ label, value }) => (
    <div className={inputBoxStyle}>
      <p className={inputTextStyle}>{label}:</p>
      <p>{value}</p>
    </div>
  );
  const infoData = [
    { label: "Available Quantity", value: quantity },
    { label: "Bid Increment", value: "10 SAR" },
    { label: "Bid Start Time", value: startTime },
    { label: "Bid End Time", value: endTime },
  ];

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
            {infoData.map((item, index) => (
              <InfoBox key={index} label={item.label} value={item.value} />
            ))}
          </div>
        </div>

        {/* divide Line */}
        <div className="hidden md:block w-[2px] bg-gray-300 h-auto min-h-full"></div>

        {/* Tabs */}
        <div className="w-full md:w-[30%]">
          <div className="flex justify-center text-lg gap-4 md:gap-[40%]">
            <button
              onClick={() => setActiveTab("Buy Now")}
              className={`p-2 ${
                activeTab === "Buy Now"
                  ? "font-bold border-b-2 border-primary"
                  : ""
              }`}
            >
              Buy Now
            </button>
            <button
              onClick={() => setActiveTab("Buy Info")}
              className={`p-2 ${
                activeTab === "Buy Info"
                  ? "font-bold border-b-2 border-primary"
                  : ""
              }`}
            >
              Buy Info
            </button>
          </div>

          {/* Details Section */}
          {activeTab === "Buy Now" && (
            <>
              <div className=" flex w-[50%] mt-3 justify-between">
                <p>Quantitiy</p>
                <p>Price</p>
              </div>
              <div className="mt-5 space-y-2">
                {productBuyOptions.map((item, index) => (
                  <div key={index} className={inputBoxStyle}>
                    <p className={inputTextStyle}>{item.quantity}kg</p>
                    <p className={inputTextStyle}>{item.price}</p>
                    <button
                      onClick={() => setDisabledIndex(index)}
                      disabled={disabledIndex === index}
                      className={`px-12 py-2 rounded-md transition-colors duration-300 ${
                        disabledIndex === index
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-primary text-white"
                      }`}
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* All Bids Section */}
          {activeTab === "Buy Info" && (
            <div className="mt-4 space-y-2">
              {bids.length === 0 ? (
                <p className="text-gray-600">No bids available.</p>
              ) : (
                bids.map((bid, index) => (
                  <div key={index} className={inputBoxStyle}>
                    <div className="flex flex-col">
                      <p className="font-bold">Bider {index + 1}</p>
                      <p className="text-xs">{bid.quantity}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold">
                        {" "}
                        <p>{bid.price} SAR</p>
                      </p>
                      <p className="text-xs">{bid.startTime}</p>
                    </div>
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

export default TraderDetailProduct;
