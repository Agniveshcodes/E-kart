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
import CartProvider from "./CartProvider";

function App() {
  return (
    <>
      <div className=" min-h-screen min-w-screen bg-gray-50 ">
        <UserProvider>
          <CartProvider>
            <AlertProvider>
              <Alert />
              <Nav />

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
                <Route index element={<ProductList />}></Route>
                <Route
                  path="/productDetail/:id"
                  element={
                    <UserRoute>
                      <ProductDetail />
                    </UserRoute>
                  }
                ></Route>
                <Route
                  path="/cartpage"
                  element={
                    <UserRoute>
                      <CartPage />
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
          </CartProvider>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
