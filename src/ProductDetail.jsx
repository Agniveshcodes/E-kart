import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import { GetSingleProduct } from "./ProductApi";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function ProductDetail({ onAddToCart }) {
  const [cartValue, setCartValue] = useState(1);
  const [product, setProduct] = useState();
  const [PageLoading, setPageLoading] = useState(true);

  const id = +useParams().id;

  useEffect(() => {
    GetSingleProduct(id)
      .then((response) => {
        setProduct(response);
        setPageLoading(false);
      })
      .catch((err) => {
        console.log("API mein kuch error hai", err);
        setPageLoading(false);
      });
  }, [id]);

  if (PageLoading) {
    return <Loading />;
  }

  if (!product) {
    return <NotFound />;
  }

  function handleCart() {
    onAddToCart(id, cartValue);
    setCartValue(1)
  }

  return (
    <>
      <div>
        <Link to={"/"}>
          <IoMdArrowRoundBack className="text-xl sm:text-3xl font-semibold ml-4 " />
        </Link>
      </div>

      <div className="px-2 w-fit h-200 flex border-2 sm:p-4 gap-4 shadow-lg rounded-md sm:mx-auto sm:h-200 bg-white md:h-100 md:mx-auto lg:mx-auto ">
        <div className=" mr-2 w-1/2 px-6 py-2 ">
          <img
            className="w-60 h-80 sm:w-80 sm:h-96  "
            src={product.thumbnail}
            alt="Product Image"
          />
        </div>

        <div className="flex flex-col items-start space-y-2 w-1/2 h-full lg:p-4">
          <h2 className="text-sm sm:text-4xl  text-gray-600 mt-4 mb-2">
            {product.title}
          </h2>
          <p className="text-sm sm:text-2xl text-gray-600 font-bold">
            ${product.price}
          </p>
          <p className="text-sm text-gray-600 font-semibold sm:text-base ">
            {product.description}
          </p>

          <p className="text-sm text-gray-600 font-semibold sm:text-base">
            <span className="text-orange-600"> Brand: </span>{product.brand} 
          </p>

          <p className="text-sm text-gray-600 font-semibold sm:text-base ">
            <span className="text-orange-600">DIscount: </span>
            {product.discountPercentage}%
          </p>

          <p className="text-sm text-gray-600 font-semibold sm:text-base ">
            <span className="text-orange-600">Category: </span>
            {product.category}
          </p>

          <div className="flex gap-4 ">
            <div className="flex gap-2">
              {cartValue >= 1 && (
                <button
                  onClick={() => {
                    setCartValue(cartValue - 1);
                  }}
                  className="font-bold text-orange-700 border-2 border-black rounded-md px-1 hover:shadow-md hover:bg-orange-300 text-sm  sm:px-2 lg:px-1  h-10  sm:text-sm"
                >
                  <FaMinus />
                </button>
              )}
              <span className="text-center text-lg font-bold text-orange-700 border-2 border-black rounded-md px-2 h-10 sm:text-xl sm:py-0.5">
                {cartValue}
              </span>
              <button
                onClick={() => {
                  setCartValue(cartValue + 1);
                }}
                className="px-1 font-bold text-orange-700 border-2 border-black rounded-md hover:shadow-md hover:bg-orange-300 text-sm  sm:px-1 lg:px-1.5  h-10  sm:text-sm"
              >
                <FaPlus />
              </button>
            </div>

            <button
              onClick={handleCart}
              className="text-sm px-2 mr-4 sm:px-6 md:py-1 lg:px-6 lg:py-1 rounded-md bg-red-500 text-white "
            >
              ADD TO CART
            </button>
          </div>

          <div className="flex gap-5 mt-8">
            {id > 1 && (
              <Link
                to={`/productDetail/${id - 1}`}
                className=" flex gap-2 items-center "
                onClick={() => {
                  setCartValue(1);
                  setPageLoading(true)
                }}
              >
                <IoMdArrowRoundBack className="text-sm sm:text-xl font-semibold" />
                <span className="text-sm sm:text-xl font-semibold">
                  previous
                </span>
              </Link>
            )}
            <Link
              to={`/productDetail/${id + 1}`}
              className="flex gap-2 items-center"
              onClick={() => {
                setCartValue(1);
                setPageLoading(true)
              }}
            >
              <span className="text-sm sm:text-xl font-semibold"> next </span>
              <IoMdArrowRoundForward className="text-sm sm:text-xl font-semibold" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
