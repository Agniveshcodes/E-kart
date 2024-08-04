import React, { memo } from "react";
import { Link } from "react-router-dom";

function Product({ products }) {
  return (
    <>
      <div className=" flex flex-col space-y-4  rounded-md border-gray-50 w-40  md:w-60 px-2 pb-2 cursor-pointer hover:shadow-xl hover:shadow-gary-300 bg-orange-50">
        <img
          className="w-40 rounded-sm h-40 sm:w-fit object-cover object-center lg:pl-6 "
          src={products.thumbnail}
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
          to={`productDetail/${products.id}`}
          className="rounded-md  text-gray-600 font-semibold text-sm md:text-base sm:text-base text-center px-3 py-1 md:px-1 md:py-1  hover:bg-orange-300 w-fit lg:text-base lg:self-start"
        >
          view detail
        </Link>
      </div>
    </>
  );
}

export default memo(Product);
