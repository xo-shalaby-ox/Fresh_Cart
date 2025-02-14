import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const [delLoading, setDelLoading] = useState(false);
  const [delCurrentID, setDelCurrentID] = useState(0);

  let {
    getCartItem,
    updateProductQuantity,
    deleteProductFromCart,
    setCartDetails,
    cartDetails,
    setCount,
    Loading,
    currentId,
    clearCartProducts,
  } = useContext(CartContext);

  async function deleteItem(id) {
    setDelCurrentID(id);
    setDelLoading(true);
    let response = await deleteProductFromCart(id);
    console.log(response);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Deleted Successfully");
      setCount(response.data.numOfCartItems);
      setDelLoading(false);
    } else {
      toast.error("Error To Delete ..!");
      setDelLoading(false);
    }
  }
  async function clearCart() {
    let response = await clearCartProducts();
    console.log(response);
    if (response.data.message == "success") {
      setCartDetails(response.data.data);
      toast.success("Cart Cleared Successfully");
      setCount(response.data.numOfCartItems);
    } else {
      toast.error("Error To Clear ..!");
    }
  }

  useEffect(() => {
    getCartItem();
  }, []);
  return (
    <>
      {cartDetails?.products.length > 0 ? (
        <div className="my-20">
          <h2 className="bg-emerald-300 w-52 p-3 rounded-md font-semibold my-5">
            Total Price / {cartDetails?.totalCartPrice} EGP
          </h2>
          <div className="relative overflow-x-auto shadow-md sha sm:rounded-lg">
            <div className="w-full text-sm text-left text-gray-700">
              <div className="flex flex-col">
                {cartDetails?.products.map((product) => (
                  <div
                    key={product.product.id}
                    className="flex justify-between items-center border-b border-gray-300 hover:bg-gray-200 duration-500"
                  >
                    <div className="p-4">
                      <img
                        src={product.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-y-3">
                      <h4 className="font-bold text-gray-900">
                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                      </h4>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateProductQuantity(
                              product.product.id,
                              product.count - 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 text-sm font-semibold h-7 w-7 text-gray-700 bg-white border border-gray-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <span>
                            {Loading && currentId == product.product.id ? (
                              <i className="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                              product.count
                            )}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            updateProductQuantity(
                              product.product.id,
                              product.count + 1
                            )
                          }
                          className="inline-flex items-center justify-center p-1 text-sm font-semibold h-7 w-7 text-gray-700 bg-white border border-gray-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-3 pe-4">
                      <h4 className="font-bold text-gray-900">
                        {product.price * product.count} EGP
                      </h4>
                      <div className="text-center">
                        {delLoading && delCurrentID === product.product.id ? (
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                          <span
                            onClick={() => deleteItem(product.product.id)}
                            className="font-bold text-red-600 cursor-pointer"
                          >
                            Remove
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-start items-center gap-3 mt-5">
            <Link to={`/checkOut`}>
              <button className="bg-emerald-300 p-3 rounded-md font-semibold hover:bg-emerald-600 duration-500">
                Checkout
              </button>
            </Link>
            <button
              className="bg-red-600 p-3 rounded-md hover:bg-red-50 hover:text-red-700 hover:border hover:border-red-900  duration-500 "
              onClick={() => clearCart()}
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
          <div className="loader">
            <p className="c">C</p>
            <p className="a">A</p>
            <p className="r">R</p>
            <p className="t">T</p>
            <p className="e">E</p>
            <p className="M">M</p>
            <p className="p">P</p>
            <p className="t">T</p>
            <p className="y">Y</p>
          </div>
        </>
      )}
    </>
  );
}
