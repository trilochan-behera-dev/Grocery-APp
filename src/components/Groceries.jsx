import React, { Suspense, useCallback, useContext, useState } from "react";
import Tab from "./Tab";
import ProductLoader from "./skeletonLoader/ProductLoader";
import { CartContext } from "../App";
const ProductCard = React.lazy(() => import("./ProductCard"));

const Groceries = () => {
  const { inventories } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All items");
  const handleClick = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-1 sm:gap-4">
        {["All items", "Drinks", "Fruit", "Bakery"].map((items, index) => (
          <Tab
            title={items}
            key={index}
            onClick={handleClick}
            category={selectedCategory}
          />
        ))}
      </div>
      <p className="text-2xl text-gray-600 capitalize font-semibold">
        Trending Items
      </p>
      <div className="2xl:w-[75%]">
        <Suspense fallback={<ProductLoader />}>
          <ProductCard
            category={selectedCategory}
            products={inventories}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Groceries;
