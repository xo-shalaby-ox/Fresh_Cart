import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(0);
  const [cartDetails, setCartDetails] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [count, setCount] = useState(0);
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  function addProductToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers,
      })
      .then((res) => {
        setCartId(res.data.data._id);
        return res;
      })
      .catch((err) => err);
  }
  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function deleteProductFromCart(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function clearCartProducts() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function updateProductQuantity(id, count) {
    setCurrentId(id);
    setLoading(true);
    let response = await updateCartProductQuantity(id, count);
    console.log(response.data);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      toast.success("Product Updated Successfully");
      setCount(response.data.numOfCartItems);
      setLoading(false);
    } else {
      toast.error("Error ..!");
      setLoading(false);
    }
  }

  async function addToCart(id) {
    setLoading(true);
    setCurrentId(id);
    let response = await addProductToCart(id);
    if (response.data.status === "success") {
      toast.success(response.data.message);
      setCount(response.data.numOfCartItems);
      setLoading(false);
    } else {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  async function getCartItem() {
    let response = await getLoggedCart();
    if (response.data.status == "success") {
      localStorage.setItem("CartOwnerID", response.data.data.cartOwner);
      setCartDetails(response.data.data);
      setCount(response.data.numOfCartItems);
    } else {
      toast.error("Error ..!");
    }
  }

  function checkOut(cartId, url, formData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: formData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  useEffect(() => {
    getLoggedCart();
    getCartItem();
  }, []);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItem,
        updateProductQuantity,
        deleteProductFromCart,
        setCartDetails,
        setLoading,
        setCurrentId,
        setCount,
        checkOut,
        clearCartProducts,
        cartDetails,
        Loading,
        currentId,
        count,
        cartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
