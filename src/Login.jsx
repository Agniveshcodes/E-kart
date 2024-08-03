import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import { withUser , withAlert } from "./withProvider";

function callLoginApi(values , bag ) {
  axios
    .post("https://myeasykart.codeyogi.io/login", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data
      bag.props.setUser(user)
      localStorage.setItem("token" , token)
      bag.props.setAlert({
        type: "success",
        message: "you have logged in successfully"
      })
    })
    .catch((error) => {
      bag.props.setAlert({
        type: "error",
        message: "Invalid cerendetial"
      })     
    });
}

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string()
    .min(6, "*password should be 6 character long")
    .max(16, "*password should be less than 16 character")
    .required(),
});

const initialValues = {
  email: "",
  password: "",
};



function Login({
  handleSubmit,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,

}) {

 

  return (
    <>
      <div className="h-100 w-screen bg-bg-blue-1000 flex justify-center items-center flex-col">
        <span className="text-text-10xl font-bold mb-10 text-white">
          <MdOutlineAddShoppingCart />
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 rounded-md"
        >
          <Input
            values={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.email}
            error={errors.email}
            id={"email"}
            name={"email"}
            label={"email"}
            placeholder={"email"}
            type={"email"}
            className={" rounded-md "}
          />

          <Input
            values={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
            id={"password"}
            name={"password"}
            label={"password"}
            placeholder={"password"}
            type={"password"}
            className={" rounded-md "}
            autoComplete={"current password"}
          />

          <button
            type="submit"
            className="text-base font-semibold px-5 rounded-sm shadow-md  py-1  bg-white text-indigo-600 disabled:bg-indigo-300"
          >
            Login
          </button>
          <Link to={"/forgotPassword"} className="self-end text-sm text-white ">
            Forgot Password?
          </Link>

          <span className="text-base text-white mt-20 font-semibold">
            don't have a account please
            <span>
              <Link to={"/signUp"} className="text-xl underline">
                {"  "}
                SignUp{" "}
              </Link>
            </span>
          </span>
        </form>
      </div>
    </>
  );
}

const withFormikHOC = withFormik({
  handleSubmit: callLoginApi,
  initialValues: initialValues,
  validationSchema: schema,
  validateOnMount: true,
});

const FormikLogin = withFormikHOC(Login);

export default withUser(withAlert(FormikLogin));
