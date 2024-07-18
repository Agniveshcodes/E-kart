import React from "react";
import { CiCircleRemove } from "react-icons/ci";

function CartProduct({ product }) {
  return (
    <>
      <div className=" w-100 lg:w-full flex justify- border-2 border-gray-100 px-8 py-2 mt-2 text-center rounded-md ">
        <div className="flex justify-around w-1/2 items-center gap-4 mr-2 lg:mr-0">
          <span>
          <CiCircleRemove className="text-sm lg:text-xl text-orange-700 cursor-pointer " />
          </span>
          <img
            className="h-5 w-5 lg:h-10 lg:w-10 shadow-md shadow-gray-600"
            src={product.image}
            alt="productImage"
          />
          <div className=" flex flex-wrap">
            <h1 className="text-sm lg:text-base text-orange-500 font-semibold">
              {product.title}
            </h1>
          </div>
        </div>

        <div className="flex justify-evenly w-1/2 gap-5 lg:gap-4 items-center text-sm lg:text-base font-semibold">
          <span> ${product.price} </span>
          <input
            type="number"
            className="border-2 border-gray-300 rounded-md w-8  lg:w-10 pl-2 text-sm lg:text-base"
            value={3}
          />
          <span className=" text-sm lg:text-base font-semibold"> ${product.price * 3} </span>
        </div>
      </div>
    </>
  );
}

export default CartProduct;