import React from "react";


function CartProduct() {
  return (
    <>
      <div className=" w-full flex justify- border-2 border-gray-100 px-8 py-2 mt-2 text-center rounded-md ">
        <div className="flex justify-around w-1/2 items-center">
          <p> X </p>
          <img
            className="h-10 w-10 shadow-md shadow-gray-600"
            src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
            alt="productImage"
          />
          <h1 className="text-base text-orange-500 font-semibold">
            
            Tshirt for men
          </h1>
        </div>

        <div className="flex justify-evenly w-1/2 gap-8 items-center text-base font-semibold">
          <p>$15</p>
          <p>2</p>
          <p>30$</p>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
