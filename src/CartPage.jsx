import React from "react";
import CartProduct from "./CartProducts";

function CartPage() {

    


  return (
    <>
      <div className="h-100 bg-gray-50  mx-auto shadow-lg shadow-gray-400 w-200 ">
        <div className="flex  py-2 px-2 border-1 border-gray-300 bg-gray-100 rounded-sm">
          <div className="w-1/2  flex justify-center">
            <h1 className=" text-base font-bold">product</h1>
          </div>
          <div className="w-1/2  flex justify-evenly text-base font-bold">
            <h1> price </h1>
            <h1> quantity </h1>
            <h1> subtotal </h1>
          </div>
        </div>

        {<CartProduct />}

        <div className=" w-1/2 flex mt-8 mx-2 gap-2">
          <div className="px-4 py-1 border-2 border-gray-200 rounded-md text-lg text-gray-400 font-bold">
            <h1>coupon code</h1>
          </div>
          <button className="px-2 py-0.5 bg-red-600 rounded-md text-white text-base font-smibold">
            Aplly Coupon
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPage;
