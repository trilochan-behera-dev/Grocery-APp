import React, { useContext, useMemo } from "react";
import { CartContext } from "../App";

const ProductCard = React.memo(({ category, products }) => {
  const { inventories, searchTerm, setInventories } = useContext(CartContext);

  const handleCart = (product) => {
    if (product.available - (product.quantity + product.freeItems) >= 1) {
      const newInv = inventories?.map((groceries) => {
        if (groceries.id === product.id) {
          return {
            ...groceries,
            quantity: groceries?.quantity + 1,
            isInCart: true,
          };
        } else {
          return groceries;
        }
      });
      setInventories(newInv);
      localStorage.setItem("groceries", JSON.stringify(newInv));
    } else {
      alert("Item is unavailble. please choose any other item");
    }
  };

  const handleLike = (product) => {
    const newInv = inventories?.map((groceries) => {
      if (groceries.id === product.id) {
        return {
          ...groceries,
          isWishListed: !groceries.isWishListed,
        };
      } else {
        return groceries;
      }
    });
    setInventories(newInv);
    localStorage.setItem("groceries", JSON.stringify(newInv));
  };

  const filteredGroceries = useMemo(() => {
    if (searchTerm) {
      return products?.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (category === "All items"
            ? true
            : category?.toLowerCase() === item.type)
      );
    } else if (category) {
      return products?.filter((item) =>
        category !== "All items" ? item?.type === category?.toLowerCase() : item
      );
    } else {
      return products;
    }
  }, [searchTerm, products, category]);

  return (
    <div className="grid md:grid-cols-2 gap-2 md:gap-4 xl:gap-12">
      {filteredGroceries?.map((product) => (
        <div
          className="relative flex flex-col md:flex-row justify-between md:space-x-5 space-y-3 md:space-y-0 rounded-2xl shadow-lg p-3  border border-white bg-white h-80"
          key={product.id}
        >
          <div className="w-full md:w-3/5 bg-white grid place-items-center overflow-hidden">
            <img
              src={product.img}
              alt="Product Image"
              className="rounded-xl object-contain p-4 h-40 md:h-full"
            />
          </div>
          <div className="w-full md:w-2/5 bg-white flex flex-col justify-between gap-2 py-3">
            <div className="flex flex-col gap-2">
              <h3 className="font-black text-gray-800 text-xl">
                {product.name}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-5 h-fit">
                {product.description}
              </p>
              <p className="text-lg text-gray-600">{product.price}</p>
            </div>

            <div className="flex w-full items-end justify-between">
              <div
                className={`${
                  product.available - (product.quantity + product.freeItems) >=
                  10
                    ? "text-[#00A711]"
                    : product.available -
                        (product.quantity + product.freeItems) ==
                      0
                    ? "text-red-600"
                    : "text-[#FF9345]"
                } font-bold text-sm`}
              >
                {product.available - (product.quantity + product.freeItems) >=
                10
                  ? "Available"
                  : product.available -
                      (product.quantity + product.freeItems) ==
                    0
                  ? "No items left"
                  : `Only ${
                      product.available - (product.quantity + product.freeItems)
                    } left`}
              </div>
              <div className="flex flex-col items-center justify-center  gap-1">
                <div
                  className={`flex gap-1 items-center text-green-400 text-xs font-medium ${
                    inventories?.find(
                      (c) => c.id === product.id && product?.isInCart
                    )
                      ? "block"
                      : "hidden"
                  }`}
                >
                  <img
                    src="./svg/tick.svg"
                    alt=""
                    className="w-4 h-4 cursor-pointer"
                  />
                  Added
                </div>
                <div
                  className="flex gap-2 items-center bg-yellow-500 text-white text-[10px] px-3 p-1 rounded-2xl cursor-pointer font-bold"
                  onClick={() => handleCart(product)}
                >
                  <p>Add to Basket</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-5 top-2">
            <img
              src={`./svg/${
                inventories.find(
                  (l) => l.id === product.id && product?.isWishListed
                )
                  ? "heart"
                  : "like"
              }.svg`}
              alt=""
              className="w-6 h-6 cursor-pointer"
              onClick={() => handleLike(product)}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

export default ProductCard;
