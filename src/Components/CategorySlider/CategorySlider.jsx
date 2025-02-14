import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        // console.log(res.data.data);
        setCategories(res.data.data);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <h2 className="font-bold text-xl p-2">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category["_id"]} className="text-center">
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt={category.name}
            />
            <span className="text-emerald-800 text-sm">{category.name}</span>
          </div>
        ))}
      </Slider>
    </>
  );
}
