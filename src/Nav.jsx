import React, { memo } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { withCart, withUser } from "./withProvider";

function Nav({ totalCount, user, setUser }) {
  function handleLogout() {
    localStorage.removeItem("token");
    setUser(undefined);
  }

  return (
    <>
      <div className="px-10 py-1 sm:px-20 sm:py-2 bg-white shadow-md mb-10 flex justify-between items-center">
        <Link to={"/"} className="flex items-center gap-3">
          <img
            className="h-10 w-20 ml-3 "
            src="https://gumlet-images.assettype.com/afaqs/2022-08/69acc390-3578-4527-8355-9f443f4749e3/Ekar.jpg?auto=format,compress&fmt=webp&format=webp&w=1200&h=900&dpr=1.0"
            alt="brand logo"
          />
          {user && (
            <span className="text-sm font-semibold text-orange-500">
              {" "}
              {user.full_name}{" "}
            </span>
          )}
        </Link>

        <div className=" flex gap-8">
          {!user ? (
            <Link
              className="text-base text-orange-600 font-bold "
              to={"/login"}
            >
              Login
            </Link>
          ) : (
            <button
              className="text-base text-orange-600 font-bold "
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          <div className="flex">
            <Link to={"/cartpage"}>
              <span className="cursor-pointer">
                <HiOutlineShoppingCart className=" text-sm sm:text-2xl text-orange-700 " />
              </span>
            </Link>
            <span className=" text-base lg:text-2xl font-semibold text-orange-500">
              {totalCount}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default withUser(withCart(memo(Nav)));
