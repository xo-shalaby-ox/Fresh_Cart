import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  let { userID } = useContext(CartContext);
  userID = localStorage.getItem("CartOwnerID");

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  function getAllOrders() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders`, { headers })
      .then((res) => {
        console.log(res);
        const allOrders = res.data.data;
        setOrders(allOrders);
        const filteredOrders = allOrders.filter(
          (order) => order.user._id === userID
        );
        setUserOrders(filteredOrders);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error to get Your Orders ..");
      });
  }

  useEffect(() => {
    console.log(window.location.origin);
    getAllOrders();
  }, [userID]);

  return (
    <>
      {userOrders.length > 0 ? (
        <div className="flex flex-col gap-y-5">
          {userOrders.map((order) => (
            <div key={order.id}>
              <div className="bg-slate-100 rounded-lg">
                <div className="flex justify-between items-center p-2">
                  <span className="bg-emerald-200 my-3 p-2 inline-block rounded-lg">
                    Cart Details /
                    <span className="font-semibold text-xl">
                      {order.shippingAddress?.details}
                    </span>
                  </span>
                  <span className="font-semibold">
                    Total Cash / {order.totalOrderPrice}
                    <span className="text-emerald-500"> EGP</span>
                  </span>
                </div>
                <div className="flex justify-center items-center flex-wrap gap-x-28">
                  {order.cartItems?.map((product) => (
                    <div
                      key={product._id}
                      className="my-3 flex flex-col gap-y-3"
                    >
                      <img
                        src={product.product.imageCover}
                        className="w-52"
                        alt="product-item"
                      />
                      <p className="font-semibold">
                        Price: {product.price}
                        <span className="text-emerald-500 font-bold"> EGP</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
            <p className="c">N</p>
            <p className="a">O</p>
            <p className="r">-</p>
            <p className="t">O</p>
            <p className="e">R</p>
            <p className="M">D</p>
            <p className="p">E</p>
            <p className="t">R</p>
            <p className="y">S</p>
          </div>
        </>
      )}
    </>
  );
}
