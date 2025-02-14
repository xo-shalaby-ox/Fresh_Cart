import React, { useContext, useState } from "react";
import { userContext } from "../../Context/UserContext";

export default function SocialInfo() {
  const [Toggle, setToggle] = useState(false);
  let { userLogin } = useContext(userContext);

  function updateSocialToggle() {
    setToggle(!Toggle);
  }
  return (
    <>
      {userLogin != null ? (
        <div
          className={
            !Toggle
              ? "fixed bg-emerald-300 social_media z-40 w-16 flex justify-center items-center p-2 rounded-e-md top-32"
              : "fixed bg-emerald-300 social_media z-40 w-16 flex justify-center items-center p-2 rounded-e-md top-32 active"
          }
        >
          <div
            onClick={() => updateSocialToggle()}
            className="share-icon absolute bg-zinc-950 rounded-e-md flex justify-center items-center cursor-pointer w-10 h-10 top-5 left-16"
          >
            <i className="fa-solid fa-share fa-bounce text-slate-50"></i>
          </div>
          <ul className="list-items flex flex-col items-center gap-3">
            <li className="item text-xl hover:translate-x-2 duration-500">
              <a href="#">
                <i className="fa-brands fa-facebook-f text-blue-600"></i>
              </a>
            </li>
            <li className="item text-xl hover:translate-x-2 duration-500">
              <a href="#">
                <i className="fa-brands fa-instagram text-orange-700"></i>
              </a>
            </li>
            <li className="item text-xl hover:translate-x-2 duration-500">
              <a href="#">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </li>
            <li className="item text-xl hover:translate-x-2 duration-500">
              <a href="#">
                <i className="fa-brands fa-youtube text-red-600"></i>
              </a>
            </li>
            <li className="item text-xl hover:translate-x-2 duration-500">
              <a href="#">
                <i className="fa-brands fa-linkedin-in text-blue-700"></i>
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
}
