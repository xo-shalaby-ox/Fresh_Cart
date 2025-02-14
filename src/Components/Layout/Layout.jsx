import React, { useContext } from "react";
import { Link, Links, Outlet } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { userContext } from "../../Context/UserContext";
import { wishlistContext } from "../../Context/WishlistContext";
import Footer from "../Footer/Footer";
import SocialInfo from "../SocialInfo/SocialInfo";
import Navbar from "./../Navbar/Navbar";

export default function Layout() {
  let { count } = useContext(CartContext);
  let { wishCount } = useContext(wishlistContext);
  let { userLogin } = useContext(userContext);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 pt-20 lg:py-16 relative">
        {userLogin != null ? (
          <div className="icons-info fixed z-40 right-0 top-32 bg-emerald-300 w-[60px] h-[140px] flex flex-col justify-evenly items-center gap-y-3 rounded-s">
            <div className="cart-icon flex justify-center items-center relative w-full">
              <Link to="cart">
                <i className="fa-solid fa-cart-shopping fa-shake text-xl"></i>
                {count ? (
                  <span className="absolute bg-red-500 top-[-12px] right-0 w-6 h-6 text-center rounded-full">
                    {count}
                  </span>
                ) : null}
              </Link>
            </div>
            <div className="wishList-icon flex justify-center items-center relative w-full">
              <Link to="wishlist">
                <div className="relative whishList-icon flex justify-center items-center w-full">
                  <i className="fa-solid fa-heart fa-beat text-xl"></i>
                  {wishCount ? (
                    <span className="absolute bg-red-500 top-[-12px] right-[-19px] w-6 h-6 text-center rounded-full">
                      {wishCount}
                    </span>
                  ) : null}
                </div>
              </Link>
            </div>
            <div className="orders-icon flex justify-center items-center relative w-full">
              <Link to="allorders">
                <div className="relative orders-icon flex justify-center items-center w-full">
                  <i className="fa-solid fa-cart-flatbed fa-bounce text-lg"></i>
                </div>
              </Link>
            </div>
          </div>
        ) : null}
        <SocialInfo />
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
