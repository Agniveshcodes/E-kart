import React, { useEffect, useState } from "react";
import Product from "./Product";
import { GetAllProduct } from "./ProductApi";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { range } from "lodash";
import { Link, useSearchParams } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState();

  const [serachParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...serachParams]);

  let { page, sort, query } = params;

  page = +page || 1;
  sort = sort || "default";
  query = query || "";

  useEffect(() => {
    let sortBy;
    let sortType;

    if (sort == "title") {
      sortBy = "title";
    } else if (sort == "priceHigh") {
      sortBy = "price";
      sortType = "desc";
    } else if (sort == "priceLow") {
      sortBy = "price";
    }

    GetAllProduct({ sortBy, query, page, sortType }).then((res) => {
      setProducts(res);
    });
  }, [sort, query, page]);

  function handleChange(event) {
    setSearchParams(
      { ...params, query: event.target.value },
      { replace: false }
    );
  }
  function handleSort(event) {
    setSearchParams(
      { ...params, sort: event.target.value },
      { replace: false }
    );
  }
  if (!products) {
    return <Loading />;
  }
  if (products.data.length === 0) {
    return <NotFound />;
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
            <option value="priceHigh">Sort by price: high to low</option>
            <option value="priceLow">Sort by price: low to high</option>
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
          {products.data.map((items) => {
            return <Product key={items.id} products={items} />;
          })}
        </div>
        <div className="self-start mx-10 mt-4 flex gap-2 lg:mx-28 cursor-pointer  lg:mt-4 ">
          {range(1, products.meta.last_page + 1).map((items) => {
            return (
              <Link
                key={items}
                to={"?" + new URLSearchParams({...params , page : items})}
                className={
                  "border-2 border-orange-500 px-1 rounded-md " +
                  (items === page ? "bg-orange-200" : "bg-orange-500")
                }
              >
                {items}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ProductList;
