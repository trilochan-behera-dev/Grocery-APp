import { useContext } from "react";
import { CartContext } from "../App";
import {
  AddToCart,
  removeFromCart,
  removeItem,
} from "../Services/globalService";

const CartCard = ({ item, isFree = false }) => {
  const { inventories, setInventories } = useContext(CartContext);
  const getPriceNumericValue = (price) => {
    return parseFloat(price?.replace(/[^\d.]/g, ""));
  };

  const saveToInventory = (result) => {
    setInventories(result);
    localStorage.setItem("groceries", JSON.stringify(result));
  };

  const handlePlus = (item) => {
    const result = AddToCart(item, inventories);
    saveToInventory(result);
  };

  const handleMinus = (item) => {
    if (item.quantity <= 1) {
      const confirmDelete = window.confirm(
        "Are you sure you want to remove the item from cart ?"
      );
      if (!confirmDelete) {
        return;
      }
    }
    const result = removeFromCart(item, inventories);
    saveToInventory(result);
  };

  const handleRemove = (item) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove the item from cart ?"
    );
    if (confirmDelete) {
      const result = removeItem(item, inventories);
      saveToInventory(result);
    }
  };
  return (
    <>
      {item.quantity && !isFree ? (
        <div className="bg-white rounded-2xl shadow-lg flex gap-4 p-4 h-28">
          <div className="w-[10%] flex items-center justify-center">
            <img
              src={item?.img}
              alt=""
              className="md:h-[60%] object-contain "
            />
          </div>
          <div className="w-[45%] flex flex-col gap-2 overflow-hidden">
            <p className="text-sm md:text-lg font-semibold">{item.name}</p>
            <p className="text-xs md:text-sm">Price :{item.price}</p>
            <p className="text-xs md:text-sm text-gray-600">
              {" "}
              {!item?.offerApplied
                ? `Product code: ${item?.id}`
                : item?.offerApplied}
            </p>
          </div>
          {!item?.offerApplied ? (
            <div className="w-[25%] flex flex-col items-center gap-4">
              <div className="flex gap-2 items-center">
                <p
                  className=" flex items-center justify-center bg-[#E86F6F] w-5 h-5 text-xl text-white rounded-md cursor-pointer"
                  onClick={() => handleMinus(item)}
                >
                  -
                </p>
                <p>{item?.quantity}</p>
                <p
                  className=" flex items-center justify-center bg-[#7FD287] w-5 h-5 text-xl text-white rounded-md cursor-pointer"
                  onClick={() => handlePlus(item)}
                >
                  +
                </p>
              </div>
              <div
                className={`${
                  item?.available - (item?.quantity + item?.freeItems) <= 0
                    ? "bg-red-600 block"
                    : item?.available - (item?.quantity + item?.freeItems) < 10
                    ? "bg-[#FF9345] block"
                    : "hidden"
                } rounded-[20px] px-[5px] sm:px-[15px] py-[3px] text-ceter w-fit  text-[10px] text-white`}
              >
                {item?.available - (item?.quantity + item?.freeItems) <= 0
                  ? "No items left"
                  : `Only ${
                      item?.available - (item?.quantity + item?.freeItems)
                    } left`}
              </div>
            </div>
          ) : (
            <div className="w-[25%] flex flex-col items-center gap-4">
              <p>{item?.quantity}</p>
            </div>
          )}

          <div className="w-[15%] text-gray-600">
            £{(getPriceNumericValue(item?.price) * item?.quantity).toFixed(2)}
          </div>
          <div
            className={`w-[5%] md:w-[2%] flex items-center justify-center bg-[#7FD287] h-5 text-xl text-white rounded-md cursor-pointer ${
              item?.offerApplied && "invisible"
            }`}
            onClick={() => handleRemove(item)}
          >
            <p className="rotate-45">+</p>
          </div>
        </div>
      ) : null}

      {isFree && (
        <div className="bg-white rounded-2xl shadow-lg flex gap-4 p-4 h-24">
          <div className="w-[10%] flex items-center justify-center">
            <img
              src={item?.img}
              alt=""
              className="md:h-[80%] object-contain "
            />
          </div>
          <div className="w-[45%] flex flex-col gap-2 overflow-hidden">
            <p className="text-sm md:text-lg font-semibold">{item?.name}</p>
            <p className="text-xs md:text-sm  text-gray-600">
              {item?.name === "Coffee"
                ? `Buy 3 Croissants, Get 1 Free Coffee`
                : `Buy 6 Coca-cola, Get 1 Free`}{" "}
            </p>
          </div>
          <div className="w-[25%] flex flex-col items-center gap-4">
            <p>{item?.freeItems}</p>
          </div>

          <div className="w-[20%] text-gray-600 pl-4">Free</div>
        </div>
      )}
    </>
  );
};

export default CartCard;
