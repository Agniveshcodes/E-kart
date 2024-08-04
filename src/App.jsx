import React, { useState, useEffect } from "react";
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
import UserRoute from "./UserRoute";
import AuthRoute from "./AuthRoute";
import Alert from "./Alert";
import UserProvider from "./UserProvider";
import AlertProvider from "./AlertProvider";

function App() {
  let newCart = JSON.parse(localStorage.getItem("productCart") || "{}");
  const [cart, setCart] = useState(newCart);

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
        <UserProvider>
          <AlertProvider>
            <Alert />
            <Nav count={totalCount} />

            <Routes>
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    {" "}
                    <Login />{" "}
                  </AuthRoute>
                }
              ></Route>
              <Route
                index
                element={
                  <UserRoute>
                    <ProductList />
                  </UserRoute>
                }
              ></Route>
              <Route
                path="/productDetail/:id"
                element={
                  <UserRoute>
                    <ProductDetail onAddToCart={handleAddToCart} />
                  </UserRoute>
                }
              ></Route>
              <Route
                path="/cartpage"
                element={
                  <UserRoute>
                    <CartPage cart={cart} updateCart={updateCart} />
                  </UserRoute>
                }
              ></Route>
              <Route path="*" element={<NotFound />}></Route>
              <Route
                path="/signUp"
                element={
                  <AuthRoute>
                    <SignUp />
                  </AuthRoute>
                }
              ></Route>
              <Route
                path="/forgotPassword"
                element={<ForgotPassword />}
              ></Route>
            </Routes>

            <Footer />
          </AlertProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
