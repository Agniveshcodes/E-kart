import React, { memo } from "react";
import { Link } from "react-router-dom";
import { withUser } from "./withProvider";

function Product({ products , user }) {

  function handleAlert() {
  if (!user) {
      alert("login to see detail page")
    }
  }

  return (
    <>
      <div className=" flex flex-col space-y-4  rounded-md  w-40  md:w-60 p-2 cursor-pointer hover:shadow-xl hover:shadow-gary-300 bg-orange-50 border-2 border-gray-300">
        <img
          className="w-40 rounded-sm h-40 sm:w-fit object-cover object-center"
          src="https://images.unsplash.com/photo-1695322353008-fb6647b1cf4a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product Image"
        />

        <span className=" text-sm font-semibold text-gray-400 ">
          {products.category}
        </span>

        <span className=" sm:text-base font-bold text-gray-500 text-sm hover:text-orange-400">
          {products.title}
        </span>
        <span className=" text-md font-bold text-gray-700 ">
          ${products.price}
        </span>
        <span className=" text-md font-bold text-gray-700 ">
          {products.rating}*
        </span>
        <Link
          onClick={handleAlert}
          to={`productDetail/${products.id}`}
          className="rounded-md  text-gray-600 font-semibold text-sm md:text-base sm:text-base text-center px-3 py-1 md:px-1 md:py-1  hover:bg-orange-300 w-fit lg:text-base lg:self-start"
        >
          view detail
        </Link>
      </div>
    </>
  );
}

export default withUser(memo(Product));
