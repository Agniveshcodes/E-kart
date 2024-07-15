import React from "react";
import { useState, useEffect } from "react";

function TableRow({ number, index }) {
  return (
    <>
      <div className="text-xl font-bold text-indigo-600 mx-4 my-3 "  >
        {number} X {index} = {number * index}
      </div>
    </>
  );
}

export default TableRow;
