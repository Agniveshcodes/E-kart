import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Input from "./Input";

function ForgotPassword() {
  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
  });

  return (
    <>
          <div className="h-100 w-screen bg-bg-blue-1000 flex justify-center items-center flex-col">
          <span className="text-text-10xl font-bold mb-4 text-white">
          <MdOutlineAddShoppingCart />
        </span>
        <div className="bg-white px-4 py-4 flex flex-col gap-4 rounded-md ">
          <h1 className="text-xl font-bold "> Forgot your password? </h1>

          <p className="text-sm font-semibold ">
            please enter the email you use to sign into your account
          </p>

          <span className="text-basse font-semibold"> You work email </span>

          {formik.touched.email && formik.errors && (
            <span className="text-sm font-bold">
              {formik.errors.email}
            </span>
          )}

          <input
            type="eamil"
            id="email"
            name="email"
            placeholder="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="px-2 py-1 text-base font-semibold border-b-2 border-white "
            required
          />

          <button
            type="submit"
            className="text-base font-semibold px-5 rounded-sm shadow-md  py-1  bg-blue-600 text-white disabled:bg-indigo-300"
          >
            Request password reset
          </button>

          <Link
            to={"/signUp"}
            className="text-base font-semibold text-indigo-600 text-center "
          >
            Back to Sign in
          </Link>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
