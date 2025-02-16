import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function CheckOut() {
  let { checkOut, cartId } = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckOut(cartId, `${window.location.origin}`),
  });

  // async function handleCheckOut(cartId, url) {
  //   let { data } = await checkOut(cartId, url, formik.values);
  //   window.location.href = data.session.url;
  //   console.log(data);
  //   // console.log(window.location.href);
  // }
  async function handleCheckOut(cartId, url) {
    try {
      let { data } = await checkOut(cartId, url, formik.values);

      // Redirect to the checkout session URL (assuming this is the next step in your flow)
      const checkoutUrl = data.session.url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl; // This will redirect to the checkout page
      } else {
        console.error("Checkout URL not found in response data.");
      }

      // Now check the environment and redirect accordingly
      redirectBasedOnOrigin();
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed. Please try again.");
    }
  }

  // Helper function for redirection based on environment
  function redirectBasedOnOrigin() {
    const currentOrigin = window.location.origin;

    if (currentOrigin === "http://localhost:517") {
      window.location.href = "http://localhost:5173/allorders";
    } else if (currentOrigin === "https://fresh-cart-beta-nine.vercel.app") {
      window.location.href =
        "https://fresh-cart-beta-nine.vercel.app/allorders";
    }
  }

  return (
    <div>
      <h2 className="max-w-lg mx-auto mb-3 p-4 font-bold text-2xl">
        CheckOut Now ..!
      </h2>
      <form className="max-w-lg mx-auto p-4" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="input-details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            required
          />
          <label
            htmlFor="input-details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Details
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="input-phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            required
          />
          <label
            htmlFor="input-phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="input-city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            required
          />
          <label
            htmlFor="input-city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            city
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          CheckOut
        </button>
      </form>
    </div>
  );
}
