import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function VerifyCode() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleCode(values) {
    console.log(values);
    setIsLoading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .then((res) => {
        setIsLoading(false);
        if (res.data.status === "Success") {
          console.log(res);
          toast.success(res.data.status);
          navigate("/resetPassword");
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res);
      });
  }

  let validationSchema = yup.object().shape({
    resetCode: yup
      .string()
      .matches(/^[0-9]{5,}$/, "Code Not Valid")
      .required("Code Is Required ..."),
  });
  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleCode,
  });
  return (
    <div>
      <h2 className="max-w-lg mx-auto mb-3 p-4 font-bold text-2xl">
        Verify Code ..!
      </h2>
      <form className="max-w-lg mx-auto p-4" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="resetCode"
            id="input-Code"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            required
          />
          <label
            htmlFor="input-code"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Code
          </label>
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div className="text-red-600 text-sm mt-2">
              <span className="font-medium">{formik.errors.resetCode}</span>
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
            "verify"
          )}
        </button>
      </form>
    </div>
  );
}
