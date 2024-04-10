import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";
import CartCard from "./CartCard";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

const Checkout = () => {
  const { inventories, searchTerm, setInventories } = useContext(CartContext);
  const [filteredCart, setFilteredCart] = useState([]);
  const [price, setPrice] = useState({
    subTotal: 0,
    discount: 0,
  });
  const [isSucess, setIsSucess] = useState(false);
  const navigate = useNavigate();
  const getPriceNumericValue = (price) => {
    return parseFloat(price?.replace(/[^\d.]/g, ""));
  };

  // Function to apply offers
  const applyOffers = (cartItems) => {
    if (cartItems) {
      let discountAmount = 0;
      const freeItems = [];
      const updatedCart = cartItems?.map((item) => {
        if (item?.isInCart) {
          if (item?.name === "Coca-Cola") {
            const totalCocaCola = item?.quantity;
            const freeCans = Math.floor(totalCocaCola / 6);
            const discountedPrice =
              freeCans * getPriceNumericValue(item?.price);
            discountAmount += discountedPrice;
            if (freeCans) {
              item.freeItems = freeCans;
              freeItems.push({
                id: `${item?.id}_free`,
                name: "Coca-Cola",
                price: item?.price, // Adjust the price of the free item as needed
                quantity: freeCans,
                available: 1, // Assume infinite availability for free itemss
                img: item?.img, // Add image URL if needed
                offerApplied: `Buy 6, Get 1 Free`,
                isInCart: true,
              });
            } else {
              item.freeItems = 0;
            }
            // Return the original item with the offer applied
            return item;
          }
          if (item?.name === "Croissants") {
            const freeCoffee = Math.floor(item.quantity / 3);
            if (freeCoffee) {
              item.freeItems = freeCoffee;
              const allProducts = JSON.parse(localStorage.getItem("groceries"));
              const Coffee = allProducts.find((p) => p?.name === "Coffee");
              const discountedPrice =
                freeCoffee * getPriceNumericValue(Coffee?.price);
              discountAmount += discountedPrice;
              freeItems.push({
                id: `${Coffee?.id}_free`,
                name: "Coffee (Free)",
                price: Coffee?.price, // Adjust the price of the free item as needed
                quantity: freeCoffee,
                available: Infinity, // Assume infinite availability for free items
                img: Coffee?.img, // Add image URL if needed
                offerApplied: `Buy 3 Croissants, Get 1 Free Coffee`,
                isInCart: true,
              });
            } else {
              item.freeItems = 0;
            }
            // Return the original item with the offer applied
            return item;
          }
          // Return the original item if no offer is applied
          return item;
        } else {
          return item;
        }
      });
      setPrice({ ...price, discount: discountAmount });
      return [...updatedCart, ...freeItems];
    }
  };

  useEffect(() => {
    const offeredData = applyOffers(inventories);
    const updatedInv = offeredData?.filter((inv) => inv.isInCart);
    const totalSubtotal = updatedInv?.reduce((total, item) => {
      return total + getPriceNumericValue(item?.price) * item?.quantity;
    }, 0);
    setPrice({ ...price, subTotal: totalSubtotal });

    if (searchTerm) {
      const search = updatedInv?.filter((item) =>
        item?.name.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setFilteredCart(search);
    } else {
      setFilteredCart(updatedInv);
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
      setIsSucess(true);
      const updatedInventories = inventories.map((g) => {
        return {
          ...g,
          quantity: 0,
          isInCart: false,
          freeItems: 0,
        };
      });
      setInventories(updatedInventories);
      localStorage.setItem("groceries", JSON.stringify(updatedInventories));
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
              type="Error"
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
