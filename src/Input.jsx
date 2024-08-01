import React from "react";





function Input({ label, id, className, name , touched , error  , ...rest }) {
  
  let errorClass = "border-white border-2 "

  if (touched && error) {
    errorClass = "border-red-600 border-2 "
  }


  return (
    <>
          <div className="">
          <div className="flex flex-col gap-3">
        <label htmlFor="email" className="sr-only">
          {label}
        </label>

        {touched && error && (
          <span className="text-sm text-white font-bold">{error}</span>
        )}

        <input
          id={id}
          name={name}
          className={
            "px-2 py-1 text-base font-semibold  bg-bg-blue-1000 text-white " + errorClass + className }
          {...rest}
          required
        />
      </div>
      </div>
    </>
  );
}


export default Input;
