import React, { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Wishlist() {
  let {
    wishlistDetails,
    getWishlistItem,
    deleteProductFromWishlist,
    setWishlistDetails,
    wishCurrentID,
    setWishCurrentID,
    setWishCount,
    wishLoading,
    setWishLoading,
  } = useContext(wishlistContext);

  let { addToCart, currentId, Loading } = useContext(CartContext);

  async function deleteWishlistItem(id) {
    setWishLoading(true);
    setWishCurrentID(id);
    let response = await deleteProductFromWishlist(id);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setWishlistDetails(response.data.data);
      setWishCount(response.data.data.length);
      setWishLoading(false);
    } else {
      toast.error("Error ..!");
      setWishLoading(false);
    }
  }

  useEffect(() => {
    getWishlistItem();
  }, []);

  useEffect(() => {
    getWishlistItem();
  }, [wishlistDetails]);
  return (
    <>
      {wishlistDetails?.length > 0 ? (
        <>
          <div className="container">
            <div className="row">
              {wishlistDetails?.map((product, index) => (
                <div
                  key={product?.id || index}
                  className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-3"
                >
                  <div className="product-wishlist shadow-lg rounded-lg p-1 flex flex-col gap-y-2">
                    <img
                      className="w-full mb-2"
                      src={product?.imageCover}
                      alt={product?.title}
                    />
                    <div className="wishlist-caption p-2">
                      <h3 className="text-lg text-emerald-600 font-semibold">
                        {product?.title?.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <div className="product-info flex justify-between items-center">
                        <span>
                          {product?.price}
                          <span className="text-emerald-600 font-bold">
                            EGP
                          </span>
                        </span>
                        <span>
                          <i className="fa-solid fa-star text-sm text-yellow-400"></i>
                          {product?.ratingsAverage}
                        </span>
                      </div>
                      <div className="wishlist-btns flex flex-col gap-y-1 mt-2">
                        <div
                          onClick={() => addToCart(product.id)}
                          className="add-btn bg-emerald-500 flex justify-center items-center p-2 rounded-md cursor-pointer"
                        >
                          {Loading && currentId == product.id ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <i className="fa-solid fa-plus"></i>
                          )}
                        </div>
                        <div
                          onClick={() => deleteWishlistItem(product.id)}
                          className="remove-btn bg-red-500 flex justify-center items-center p-2 rounded-md cursor-pointer"
                        >
                          {wishLoading && wishCurrentID == product.id ? (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                          ) : (
                            <span>
                              <i className="fa-solid fa-trash fa-bounce"></i>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
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
            <p className="c">W</p>
            <p className="a">I</p>
            <p className="r">S</p>
            <p className="t">H</p>
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
