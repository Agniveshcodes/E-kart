import React from "react";


function ZeroProduct() {
  return (
    <>
     
      <div className=" h-100 w-screen flex flex-col items-center justify-center">
        <img
          className="h-80 w-fit "
          src="https://static.thenounproject.com/png/3407694-200.png"
          alt=""
        />
        <h1 className=" text-sm lg:text-5xl text-bold text-orange-500 font-sans mt-3" > No Products Added  </h1>
      </div>
    </>
  );
}

export default ZeroProduct;