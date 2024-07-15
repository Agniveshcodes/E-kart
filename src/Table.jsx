import React from "react";
import TableRow from "./TableRow";
import { useState, useEffect } from "react";

function Table() {

    const [number, setNumber] = useState(2)
    
    function changeNumber() {
        setNumber(number + 1)
    }
    
  return (
      <>
          <div>
          <div className=" px-4 py-2 ">
              <button onClick={changeNumber} className=" px-2 py-1 rounded-md bg-indigo-600 text-white "> Next </button>
          </div>
          
      <TableRow number={number} index={1} />
      <TableRow number={number} index={2} />
      <TableRow number={number} index={3} />
      <TableRow number={number} index={4} />
          </div>
    </>
  );
}

export default Table;
