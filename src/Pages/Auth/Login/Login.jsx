import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { userContext } from "../../../Context/UserContext";

export default function Login() {
  let { setUserLogin } = useContext(userContext);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(values) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "success") {
          toast.success(res.data.message);
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        toast.error(res.response.data.message);
        navigate("/signup");
      });
  }

  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Not Valid Email")
      .required("Email Is Required ...")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid format"
      ),
    password: yup
      .string()
      .min(8, "Min Char Is 8")
      .required("Password Is Required ..."),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <div className="my-20">
      <h2 className="max-w-lg mx-auto mb-3 p-4 font-bold text-2xl">
        LogIn Now ..!
      </h2>
      <form className="max-w-lg mx-auto p-4" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="input-email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          <label
            htmlFor="input-email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-600 text-sm mt-2">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="input-password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            required
          />
          <label
            htmlFor="input-password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-600 text-sm mt-2">
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
        <Link to="/forgetPassword" className="text-blue-500 ms-3">
          Forget Password..?
        </Link>
      </form>
    </div>
  );
}
