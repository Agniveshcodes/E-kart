import React, { useState, useEffect} from "react";
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
import UserRoute from "./UserRoute";
import AuthRoute from "./AuthRoute";
import Alert from "./Alert";
import { loginContext , alertContext } from "./Context";


function App() {
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [alert, setAlert] = useState()
  let newCart = JSON.parse(localStorage.getItem("productCart") || "{}");
  const [cart, setCart] = useState(newCart);

  const removeAlert = () => {
    setAlert(undefined)
}

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
        <loginContext.Provider value={{ user, setUser }}>
          <alertContext.Provider value={{ alert, setAlert ,  removeAlert }}>
            <Alert/>
            <Nav count={totalCount} />

            <Routes>
              <Route
                path="/login"
                element={
                  <AuthRoute user={user}>
                    {" "}
                    <Login />{" "}
                  </AuthRoute>
                }
              ></Route>
              <Route
                index
                element={
                  <UserRoute user={user}>
                    <ProductList />
                  </UserRoute>
                }
              ></Route>
              <Route
                path="/productDetail/:id"
                element={
                  <UserRoute user={user}>
                    <ProductDetail onAddToCart={handleAddToCart} />
                  </UserRoute>
                }
              ></Route>
              <Route
                path="/cartpage"
                element={
                  <UserRoute user={user}>
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
          </alertContext.Provider>
        </loginContext.Provider>
      </div>
    </>
  );
}

export default App;
