import React from "react";

export default function ProductsList({ data }) {
  return (
    <div className="flex flex-row flex-wrap w-full gap-7">
      {data.map((item) => {
        // Tìm URL từ imgData dựa trên item.id
        // const imageUrl = imgData.find((img) => img.id === item.id)?.url;
        return (
          <div
            key={item.id}
            className="w-48 bg-customDark1 h-56 rounded-2xl items-center mb-7"
          >
            <div className="relative w-full flex h-1/2 justify-center">
              <div
                className="absolute rounded-2xl top-[-25%] bg-cover bg-center"
                style={{
                  width: "132px",
                  height: "132px",
                  backgroundImage: `url(${item.imageLink})`,
                }}
              ></div>
            </div>
            <div className="flex flex-col h-1/2 gap-y-1 justify-center items-center">
              <span className="text-white">{item.name}</span>
              <span className="text-neutral-400 text-sm">{item.price}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
