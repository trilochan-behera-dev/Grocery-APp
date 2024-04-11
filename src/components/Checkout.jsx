import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import CartCard from "./CartCard";
import Message from "./Message";
import { resetCart } from "../Services/globalService";

const Checkout = () => {
  const { inventories, searchTerm, setInventories } = useContext(CartContext);
  const [filteredCart, setFilteredCart] = useState([]);
  const [filteredFreeItems, setFilteredFreeItems] = useState([]);
  const [price, setPrice] = useState({
    subTotal: 0,
    discount: 0,
  });
  const [isSucess, setIsSucess] = useState(false);
  const getPriceNumericValue = (price) => {
    return parseFloat(price?.replace(/[^\d.]/g, ""));
  };

  useEffect(() => {
    const updatedInv = inventories?.filter((inv) => inv?.isInCart);
    const updateFreeitems = inventories?.filter((inv) => inv?.freeItems);
    const totalSubtotal = updatedInv?.reduce((total, item) => {
      return total + getPriceNumericValue(item?.price) * item?.quantity;
    }, 0);
    const discount = updateFreeitems?.reduce((total, item) => {
      return total + getPriceNumericValue(item?.price) * item?.freeItems;
    }, 0);

    setPrice({
      ...price,
      subTotal: totalSubtotal + discount,
      discount: discount,
    });

    if (searchTerm) {
      const search = updatedInv?.filter((item) =>
        item?.name.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      const freeItemSearch = updateFreeitems?.filter((item) =>
        item?.name.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setFilteredFreeItems(freeItemSearch);
      setFilteredCart(search);
    } else {
      setFilteredCart(updatedInv);
      setFilteredFreeItems(updateFreeitems);
    }
  }, [searchTerm, inventories]);

  const total = [
    {
      name: "SubTotal",
      value: price.subTotal?.toFixed(2),
      checkoutBtn: false,
    },
    {
      name: "Discount",
      value: price.discount?.toFixed(2),
      checkoutBtn: false,
    },
    {
      name: "Total",
      value: (price.subTotal - price.discount)?.toFixed(2),
      checkoutBtn: true,
    },
  ];

  const handleCheckout = () => {
    if ((price.subTotal - price.discount).toFixed(2) > 0) {
      setIsSucess(true)
      const result = resetCart(inventories);
      setInventories(result);
      localStorage.setItem("groceries", JSON.stringify(result));
    } else {
      alert("Please add items to the cart");
    }
  };

  return (
    <>
      <p className="text-2xl text-gray-600 capitalize font-semibold">
        Checkout
      </p>
      {filteredCart?.length ? (
        <div className="xl:w-[70%] flex flex-col gap-6">
          {filteredCart.map((item) => (
            <CartCard key={item?.id} item={item} />
          ))}
          {filteredFreeItems.map((d) => (
            <>
              <CartCard key={d?.id} item={d} isFree={true} />
            </>
          ))}

          {total.map((data) => (
            <>
              <hr />
              <div className="flex justify-end gap-12 items-center">
                <p className="text-right font-medium text-black text-sm md:text-lg">
                  {data?.name}
                </p>
                <p className="text-gray-500">£{data?.value}</p>
                <div
                  className={`bg-[#7FD287] px-4 md:px-8 py-2 text-sm rounded-lg text-white cursor-pointer ${
                    data?.checkoutBtn ? "block" : "invisible"
                  }`}
                  onClick={handleCheckout}
                >
                  Checkout
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        <>
          {isSucess ? (
            <Message
              type="Success"
              icon="./svg/tick.svg"
              message="Order Placed Successfully"
              subMessage="Congratulations! 🎉 Your order has been successfully placed. Sit back, relax, and anticipate the arrival of your groceries! "
              link="/"
              linkMessage="Back To Home"
            />
          ) : (
            <Message
              icon="./svg/redcart.svg"
              message="Your cart is Empty"
              subMessage="Uh-oh! Looks like your cart is feeling a bit light! Time to add some groceries and make it a full shopping spreed"
              link="/"
              linkMessage="Back To Home"
            />
          )}
        </>
      )}
    </>
  );
};

export default Checkout;
