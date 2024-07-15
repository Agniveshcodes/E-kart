import React, { useEffect, useState } from "react";
import Product from "./Product";
import { GetAllProduct } from "./ProductApi";
import Loading from "./Loading";
import NotFound from "./NotFound";

function ProductList() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");
  const [products, setProducts] = useState();

  useEffect(() => {
    GetAllProduct().then((res) => {
      setProducts(res);
    });
  }, []);

  let data = products;

  if (!data) {
    return <Loading />;
  }

  function handleChange() {
    setQuery(event.target.value);
  }

  data = products.filter((items) => {
    return items.title.toLowerCase().indexOf(query.toLowerCase()) != -1;
  });

  if (data.length === 0) {
    return <NotFound />;
  }

  if (sort === "priceLow") {
    data.sort((a, b) => {
      return a.price - b.price;
    });
    console.log("sahi hai");
  } else if (sort === "priceHigh") {
    data.sort((a, b) => {
      return b.price - a.price;
    });
  } else if (sort === "title") {
    data.sort((a, b) => {
      return a.title < b.title ? -1 : 1;
    });
  }

  function handleSort(event) {
    setSort(event.target.value);
  }

  return (
    <>
      <div className="bg-gray-50 shadow-lg shadow-gray-400 py-12 rounded-md flex flex-col min-h-screen mx-10 sm:mx-24 md:mx-44 lg:mx-36 ">
        <div className="self-end mb-8 flex sm:gap-2 md:gap-4 flex-col lg:flex-row ">
          <select
            name="sort"
            id="sort"
            className="border-2 text-gray-700 px-1 md:px-3 text-sm rounded-md mr-4"
            onChange={handleSort}
            value={sort}
          >
            <option value="default">Default Sort</option>
            <option value="title">Sort by title</option>
            <option value="priceLow">Sort by price: low to high</option>
            <option value="priceHigh">Sort by price: high to low</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            value={query}
            className="border-1 border-black rounded-md mr-4 px-1 text-sm md:px-2 py-1 md:text-base"
          />
        </div>

        <div className=" gap-3 grid sm:grid-cols-2 mx-auto grid-cols-1 md:grid-cols-2 sm:gap-4 md:gap-2 lg:grid-cols-3 lg:gap-8">
          {data.map((items) => {
            return <Product key={items.id} products={items} />;
          })}
        </div>
        <div className="self-start mx-10 mt-4 flex gap-2 lg:mx-28 cursor-pointer  lg:mt-4">
          <span className="text-lg text-orange-700 border-2 border-orange-500 px-2  rounded-md">
            1
         </span>
          <span className="text-lg text-orange-700 border-2 border-orange-500 px-2  rounded-md">
            2
         </span>
          <span className="text-lg text-orange-700 border-2 border-orange-500 px-2  rounded-md">
            3
         </span>
        </div>
      </div>
    </>
  );
}

export default ProductList;
