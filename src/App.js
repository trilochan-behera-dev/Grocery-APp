import React, {
  useState,
  createContext,
  useEffect,
  lazy,
  Suspense,
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import axios from "axios";
import ProductLoader from "./components/skeletonLoader/ProductLoader";

export const CartContext = createContext();

const Groceries = lazy(() => import("./components/Groceries"));
const Checkout = lazy(() => import("./components/Checkout"));
const Wishlist = lazy(() => import("./components/Wishlist"));

const App = () => {
  const [inventories, setInventories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearch = (e) => {
    setSearchTerm(e?.target?.value);
  };

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await axios.get(
          `https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all`
        );

        const updatedData = response?.data?.map((data) => {
          return {
            ...data,
            freeItems: 0,
            quantity: 0,
            isInCart: false,
            isWishListed: false,
          };
        });

        const groceriesData = localStorage.getItem("groceries");
        const savedInventories = groceriesData
          ? JSON.parse(groceriesData)
          : updatedData;

        setInventories(savedInventories);

        if (!groceriesData.length) {
          localStorage.setItem("groceries", JSON.stringify(updatedData));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchGroceries();
  }, []);
  const cartCount = inventories?.filter((gro) => gro?.isInCart);
  const wishListCount = inventories?.filter((gro) => gro?.isWishListed);

  return (
    <CartContext.Provider
      value={{
        inventories,
        setInventories,
        searchTerm,
      }}
    >
      <Router>
        <div className="bg-white mx-2 xs:mx-4 lg:mx-20 2xl:mx-40  my-8 flex flex-col gap-8">
          <Navbar
            cartCount={cartCount?.length}
            wishListCount={wishListCount?.length}
            handleSearch={handleSearch}
          />
          {loading ? (
            <ProductLoader />
          ) : (
            <Suspense fallback={<ProductLoader grid={4} length={8} />}>
              <Routes>
                <Route exact path="/" element={<Groceries />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Suspense>
          )}
        </div>
      </Router>
    </CartContext.Provider>
  );
};

export default App;
