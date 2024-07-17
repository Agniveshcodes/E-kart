import React from "react";
import CartProduct from "./CartProducts";
import products from "./DummyProducts";

function CartPage() {
  const data = products;

  return (
    <>
      <div className="h-100 w-fit lg:h-100 bg-gray-50  mx-auto shadow-lg shadow-gray-400 lg:w-200 ">
        <div className="flex  py-2 px-2 border-1 border-gray-300 bg-gray-100 rounded-sm">
          <div className="w-1/2  flex justify-center">
            <h1 className=" text-sm lg:text-base font-bold">product</h1>
          </div>
          <div className=" text-sm w-1/2  flex justify-evenly lg:text-base font-bold">
            <h1> price </h1>
            <h1> quantity </h1>
            <h1> subtotal </h1>
          </div>
        </div>

        {data.map((items) => {
          return <CartProduct product={items} />;
        })}

        <div className=" w-60 lg:w-1/2 flex mt-8 mx-2 gap-2">
          <input
            type="text"
            placeholder="Coupon Cdde"
            className="px-1 text-center text-sm mb-2 lg:px-2 border-2 border-gray-300 rouded-md lg:text-base "
          />
          <button className="px-2 mb-2 text-sm lg:px-8 py-0.5 bg-red-600 rounded-md text-white lg:text-base font-smibold">
            Aplly Coupon
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPage;