import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineDangerous } from "react-icons/md";
import { withAlert } from "./withProvider";

function Alert({ alert, removeAlert }) {
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(removeAlert, 3000);

      return function () {
        clearTimeout(timer);
      };
    }
  }, [alert]);

  if (!alert) {
    return;
  }

  const { type, message } = alert;

  let Icon;
  let color;

  if (type === "success") {
    color = "bg-green-500";
    Icon = FaCheckCircle;
  } else if (type === "error") {
    color = "bg-red-500";
    Icon = MdOutlineDangerous;
  }

  return (
    <>
      <div className={" dark:bg-gray-800 " + color}>
        <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center flex-1 w-0  lg:text-2xl ">
              <span className={"flex  rounded-lg text-white " + color}>
                <Icon />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="lg:text-xl text-base text-white">
                  {type} {message}{" "}
                </span>
              </p>
            </div>

            <div className="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
              <button
                onClick={removeAlert}
                type="button"
                className="flex py-1 px-2 text-white -mr-1 rounded-md hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 border-2 border-gray-400 "
              >
                dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAlert(Alert);
