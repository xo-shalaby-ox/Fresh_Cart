import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishlistContext = createContext();

export default function WishlistContextProvider(props) {
  const [wishlistDetails, setWishlistDetails] = useState(null);
  const [wishCount, setWishCount] = useState(0);
  const [wishCurrentID, setWishCurrentID] = useState(0);
  const [wishLoading, setWishLoading] = useState(false);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addProductToWishlist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedWishlist() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function getWishlistItem() {
    let response = await getLoggedWishlist();
    if (response.data.status == "success") {
      setWishlistDetails(response.data.data);
      setWishCount(response.data.data.length);
    } else {
      toast.error("Error ..!");
    }
  }

  function deleteProductFromWishlist(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  useEffect(() => {
    getWishlistItem();
  }, []);
  return (
    <wishlistContext.Provider
      value={{
        addProductToWishlist,
        getWishlistItem,
        deleteProductFromWishlist,
        wishlistDetails,
        setWishlistDetails,
        setWishCount,
        wishCount,
        setWishCurrentID,
        wishCurrentID,
        wishLoading,
        setWishLoading,
      }}
    >
      {props.children}
    </wishlistContext.Provider>
  );
}
