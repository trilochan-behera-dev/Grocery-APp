import React from "react";
const ProductLoader = ({ length = 4, grid = 2 }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${grid} gap-12`}>
      {Array.from({ length: length })?.map((_, i) => (
        <div
          className="relative flex flex-col md:flex-row justify-between md:space-x-5 space-y-3 md:space-y-0 rounded-2xl shadow-lg p-3  border border-white bg-gray-300 h-80 animate-pulse"
          key={i}
        ></div>
      ))}
    </div>
  );
};

export default ProductLoader;
