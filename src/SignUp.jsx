import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { Formik, Form, withFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";

function callLoginApi(values , bag) {
  axios
    .post("https://myeasykart.codeyogi.io/signup", {
      fullName: values.fullname,
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data;
      bag.props.setUser(user)
      localStorage.setItem("token" , token)
    })
    .catch(() => {
      console.log("Invalid Cerendtial");
    });
}

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string()
    .min(6, "*password should be 6 character long")
    .max(16, "*password should be less than 16 character")
    .required(),
  fullname: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
});

const initialValues = {
  email: "",
  password: "",
  fullname: "",
};

function SignUp({
  handleSubmit,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  user
}) {

  if (user) {
    return <Navigate to={"/"} />
   }

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
            values={values.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.fullname}
            error={errors.fullname}
            id={"fullname"}
            name={"fullname"}
            label={"fullname"}
            placeholder={"fullname"}
            type={"text"}
            className={" rounded-md "}
          />

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
          />

          <button
            type="submit"
            className="text-base font-semibold px-5 rounded-sm shadow-md  py-1  bg-white text-indigo-600 disabled:bg-indigo-300"
          >
            SignUp
          </button>

          <div className="text-base text-white mt-30 font-semibold flex items-center justify-center  gap-3">
            already have a account please
            <span>
              <Link to={"/"} className="text-xl underline">
                Login
              </Link>
            </span>
          </div>
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

const FormikSignUp = withFormikHOC(SignUp);

export default FormikSignUp;
