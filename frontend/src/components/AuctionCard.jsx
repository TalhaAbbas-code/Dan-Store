import React from "react";

const AuctionCard = ({
  image,
  title,
  price,
  startTime,
  lotNumber,
  quantity,
  remainingQuantity,
  onBidClick,
}) => {
  return (
    <div className="bg-white shadow-lg  overflow-hidden w-64">
      <div className="relative flex justify-center items-center">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {remainingQuantity === 0 && (
          <div className="absolute pb-10 inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white p-3">
            <span className="text-4xl font-bold">Sold</span>
          </div>
        )}

        <div className="absolute inset-0 text-white p-3 flex flex-col justify-end items-start">
          <div className="">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm font-bold">{price}</p>
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>{startTime}</span>
            <span>{lotNumber}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-600 text-sm">Quantity: {quantity} KG</p>
        <p className="text-gray-600 text-sm">
          Remaining Quantity: {remainingQuantity} KG
        </p>
        <p className="text-xl font-bold text-center mt-2">{startTime}</p>

        <button
          onClick={onBidClick}
          className="mt-3 w-full py-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition"
        >
          BID NOW
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;
