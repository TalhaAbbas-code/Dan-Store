const DownloadButton = ({ image, p1, p2 }) => {
  return (
    <div className="flex justify-start p-2 px-5 rounded-lg bg-black gap-2 mt-2">
      <img src={image} alt={p2} className="w-5" />
      <div className="flex flex-col items-start justify-center text-white gap-0">
        <p className="text-[8px]">{p1}</p>
        <p className="text-xs">{p2}</p>
      </div>
    </div>
  );
};

export default DownloadButton;
