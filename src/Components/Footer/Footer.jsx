import React from "react";
import amazon from "../../assets/Amazon_Pay.png";
import american from "../../assets/American-Express.png";
import master from "../../assets/MasterCard.png";
import paypal from "../../assets/Paypal.png";
import appStore from "../../assets/AppStore.svg";
import googlePlay from "../../assets/GooglePlay.svg";
export default function Footer() {
  return (
    <>
      <footer className="bg-gray-200 p-5 w-full">
        <div className="container mx-auto">
          <div className="footer-text my-2">
            <h3 className="text-xl font-semibold"> Get The FreshCart App </h3>
            <span className="text-gray-500 text-sm">
              We Will Send You A Link , Open It On Your Phone To Download The
              App
            </span>
          </div>
          <div className="footer-inp flex flex-col md:flex-row gap-3 md:justify-between justify-center mb-2">
            <input
              placeholder="Email ..!"
              className="rounded-lg p-3  md:w-3/4 text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none peer"
              type="email"
              name="email"
            />
            <button className="bg-green-600 text-sm md:text-xl text-white p-3 md:w-1/4 rounded-lg hover:bg-green-800 duration-500">
              Share App Link
            </button>
          </div>
          <div className="payments flex flex-wrap justify-between">
            <div className="payment-left flex md:flex-row flex-col md:justify-center md:items-center justify-start items-start gap-3">
              <h4 className="text-lg font-medium">Payment Partners</h4>
              <div className="footer-img flex justify-center gap-2">
                <img className="w-[60px]" src={amazon} alt="amazon-logo" />
                <img className="w-[60px]" src={american} alt="american-logo" />
                <img className="w-[60px]" src={master} alt="master-logo" />
                <img className="w-[60px]" src={paypal} alt="paypal-logo" />
              </div>
            </div>
            <div className="payment-right flex md:flex-row flex-col md:justify-center md:items-center justify-start items-start gap-3">
              <h4 className="text-lg font-medium">
                Get Deliveries With FreshCart
              </h4>
              <div className="footer-app flex justify-center gap-2">
                <img src={appStore} className="w-[80px]" alt="" />
                <img src={googlePlay} className="w-[80px]" alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
