import React, { useState , useEffect} from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";
import ProductList from "./ProductList";
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartPage from "./CartPage";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Loading from "./Loading";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  let newCart = JSON.parse(localStorage.getItem("productCart") || "{}");
  const [cart, setCart] = useState(newCart);

  console.log(user);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((respnse) => {
          setUser(respnse.data);
          setLoadingUser(false);
          console.log(respnse.data);
        });
    } else {
      setLoadingUser(false);
    }
  }, []);

  if (loadingUser) {
    return <Loading />;
  }

  
  

  function handleAddToCart(productId, cartCount) {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: cartCount + oldCount };
    updateCart(newCart);
  }

  function updateCart(newCart) {
    setCart(newCart);
    let cartString = JSON.stringify(cart);
    localStorage.setItem("productCart", cartString);
  }

  const totalCount = Object.keys(cart).reduce((previous, current) => {
    return previous + cart[current];
  }, 0);

  return (
    <>
      <div className=" min-h-screen min-w-screen bg-gray-50 ">
        <Nav count={totalCount} setUser={setUser} />

        <Routes>
          <Route
            path="/login"
            element={<Login setUser={setUser} user={user} />}
          ></Route>
          <Route index element={<ProductList user={user} />}></Route>
          <Route
            path="/productDetail/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          ></Route>
          <Route
            path="/cartpage"
            element={<CartPage user={user} cart={cart} updateCart={updateCart}  />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route
            path="/signUp"
            element={<SignUp user={user} setUser={setUser} />}
          ></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
