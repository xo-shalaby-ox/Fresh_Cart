import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import navLogo from "../../assets/logo.svg";
import { userContext } from "../../Context/UserContext";

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  let { userLogin, setUserLogin } = useContext(userContext);
  let navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/Login");
  }
  function updateMenuToggle() {
    setMenuToggle(!menuToggle);
  }
  return (
    <>
      <nav className="bg-slate-100 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center p-4">
            <div className="nav-left flex items-center gap-x-4">
              <Link to="" className="flex items-center">
                <img src={navLogo} alt="logo" className="w-full" />
              </Link>
            </div>
            <div onClick={() => updateMenuToggle()} className="menu-bar">
              <i className="fa-solid fa-bars text-3xl"></i>
            </div>
            <div
              className={
                !menuToggle
                  ? "right_menu flex items-center gap-x-3"
                  : "right_menu flex items-center gap-y-3 md:gap-x-3 active"
              }
            >
              {userLogin != null ? (
                <div>
                  <ul className="nav-list flex items-center gap-x-3">
                    <li className="text-zinc-800 lg:text-slate-400 font-semibold hover:-translate-y-1 hover:text-zinc-950 duration-500">
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="text-zinc-800 lg:text-slate-400 font-semibold hover:-translate-y-1 hover:text-zinc-950 duration-500">
                      <NavLink to="products">Products</NavLink>
                    </li>
                    <li className="text-zinc-800 lg:text-slate-400 font-semibold hover:-translate-y-1 hover:text-zinc-950 duration-500">
                      <NavLink to="categories">Categories</NavLink>
                    </li>
                    <li className="text-zinc-800 lg:text-slate-400 font-semibold hover:-translate-y-1 hover:text-zinc-950 duration-500">
                      <NavLink to="brands">Brands</NavLink>
                    </li>
                  </ul>
                </div>
              ) : null}
              <div className="auth-list flex items-center gap-4">
                {userLogin != null ? (
                  <span onClick={signOut} className="cursor-pointer font-bold">
                    SignOut
                  </span>
                ) : (
                  <div className="auth-btn">
                    <Link to="login">SignIn</Link>
                    <Link to="signup">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
