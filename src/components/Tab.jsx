import React, { useCallback } from "react";

const Tab = ({ title, onClick, category }) => {
  const handleClick = useCallback(() => {
    onClick(title);
  }, [onClick, title]);

  return (
    <div
      className={`sm:w-32 shadow-2xl text-sm px-4 py-2 text-center rounded-full border border-gray-200 cursor-pointer ${
        category === title ? "bg-gray-600 text-white" : "text-gray-600 bg-white"
      }`}
      onClick={handleClick}
    >
      {title}
    </div>
  );
};

export default Tab;