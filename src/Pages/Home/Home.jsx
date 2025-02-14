import React, { useContext, useEffect } from "react";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import MainSlider from "../../Components/MainSlider/MainSlider";
import { CartContext } from "../../Context/CartContext";
import RecentProduct from "./../../Components/RecentProduct/RecentProduct";

export default function Home() {
  let { getCartItem } = useContext(CartContext);

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProduct />
    </>
  );
}
