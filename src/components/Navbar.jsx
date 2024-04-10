import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount = 0, wishListCount = 0, handleSearch }) => {
  return (
    <div className="md:flex justify-between items-center gap-8">
      <div className="flex gap-6 w-full justify-between items-center">
        <Link to="/">
          <p className="uppercase text-xl text-black font-bold">GROCERIES</p>
        </Link>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
            className="block w-full rounded-2xl border-0 px-3.5 py-2 text-gray-900 shadow-xl ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 outline-none sm:text-sm sm:leading-6 "
          />
          <img
            src="./svg/search.svg"
            alt=""
            className="absolute top-[12px] right-4 h-5 w-5"
          />
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 py-2 lg:py-0">
        <IconWithCount
          src="./svg/heart.svg"
          count={wishListCount}
          bgColor="bg-[#FF7979]"
          link="/wishlist"
        />
        <IconWithCount src="./svg/profile.svg" isCount={false} />
        <IconWithCount
          src="./svg/cart.svg"
          count={cartCount}
          bgColor="bg-[#0085FF]"
          link="/checkout"
        />
      </div>
    </div>
  );
};

const IconWithCount = ({ src, count = 0, bgColor, isCount = true, link }) => {
  return (
    <Link to={link}>
      <div className={`${isCount ? "relative p-3 xl:p-5" : "p-1"}`}>
        <img src={src} alt="image" className="h-8 lg:h-12"/>
        {isCount && (
          <p
            className={`absolute top-0 right-0 ${bgColor} text-white rounded-full px-2 py-1 text-xs`}
          >
            {count}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Navbar;
