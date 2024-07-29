import React, { memo } from "react";

function Footer() {
  return (
    <>
      <div className=" px-5  sm:px-10 md:px-20 mt-10 bg-gray-800 text-white flex justify-between py-4">
        <h1 className=" text-sm sm:text-xl "> Ekart shopping </h1>
        <h1 className="text-sm sm:text-xl"> &#169;Ekart </h1>
      </div>
    </>
  );
}

export default memo(Footer);
