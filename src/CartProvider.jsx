import React, { useEffect, useState } from "react";
import { cartContext } from "./Context";
import { withUser } from "./withProvider";
import { GetCartProducts, GetSavedCart, SaveDataToCart } from "./ProductApi";

function CartProvider({ islogedin, children, user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (islogedin) {
      GetSavedCart().then((res) => {
        setCart(res);
      });
    } else {
      let newCart = JSON.parse(localStorage.getItem("productCart") || "{}");
      quantityMapToData(newCart)
    }
  }, [islogedin]);

  function quantityMapToData(newCart) {
    GetCartProducts(Object.keys(newCart)).then((products) => {
      const saveCart = products.map((p) => ({
        product: p,
        quantity: newCart[p.id],
      }));
      setCart(saveCart);
    });
  }

  function handleAddToCart(productId, cartCount) {
    const quantityMap = cart.reduce((previous, current) => {
      return { ...previous, [current.product.id]: current.quantity };
    }, {});

    const oldCount = quantityMap[productId] || 0;

    const newCart = { ...quantityMap, [productId]: cartCount + oldCount };
    updateCart(newCart);
  }

  function updateCart(newCart) {
    if (islogedin) {
      SaveDataToCart(newCart).then(res => {

        
        quantityMapToData(newCart)
      });
    } else {
      let cartString = JSON.stringify(cart);
      localStorage.setItem("productCart", cartString);
      quantityMapToData(newCart)
    }
  }

  const totalCount = cart.reduce((previous, current) => {
    return previous + current.quantity;
  }, 0);

  return (
    <>
      <cartContext.Provider
        value={{ cart, updateCart, totalCount, handleAddToCart }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}

export default withUser(CartProvider);
