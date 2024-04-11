import React, { Suspense, useContext } from "react";
import { CartContext } from "../App";
import ProductLoader from "./skeletonLoader/ProductLoader";
import Message from "./Message";
const ProductCard = React.lazy(() => import("./ProductCard"));

const Wishlist = React.memo(() => {
  const { inventories } = useContext(CartContext);
  const isWishListdata = inventories.some((d) => d.isWishListed);
  return (
    <>
      <p className="text-2xl text-gray-600 capitalize font-semibold">
        WishList Items
      </p>
      {isWishListdata ? (
        <Suspense fallback={<ProductLoader />}>
          <ProductCard
            category="All items"
            products={inventories.filter((gro) => gro.isWishListed)}
          />
        </Suspense>
      ) : (
        <Message
          type="Warnings"
          icon="./svg/heartWarning.svg"
          message="WishList is Empty"
          subMessage="Oops! It seems your Wishlist is currently empty. Let's fill it up with all the things you desire! Start adding items now and watch your dream list grow. Happy Wishlist-ing! "
          link="/"
          linkMessage="Back To Home"
        />
      )}
    </>
  );
});

export default Wishlist;
