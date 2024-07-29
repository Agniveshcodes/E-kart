import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ProductDetail from "./ProductDetail";
import ProductList from "./ProductList";
import { Routes, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartPage from "./CartPage";

function App() {
  let newCart = JSON.parse(localStorage.getItem("productCart") || "{}" );
  const [cart, setCart] = useState(newCart);

  function handleAddToCart(productId, cartCount) {
    const oldCount = cart[productId] || 0;
    const newCart = { ...cart, [productId]: cartCount + oldCount }
    updateCart(newCart)
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
        <Nav count={totalCount} />

        <Routes>
          <Route index element={<ProductList />}></Route>
          <Route
            path="/productDetail/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          ></Route>
          <Route path="/cartpage" element={<CartPage cart={cart} updateCart={updateCart} />} ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
