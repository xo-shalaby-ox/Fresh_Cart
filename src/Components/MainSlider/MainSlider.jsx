import React from "react";
import imageSlide1 from "../../Assets/Images/slider-image-1.jpeg";
import imageSlide2 from "../../assets/images/slider-image-2.jpeg";
import imageSlide3 from "../../Assets/Images/slider-image-3.jpeg";
import imageSlide4 from "../../Assets/Images/grocery-banner-2.jpeg";
import imageSlide5 from "../../Assets/Images/slider-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <>
      <div className="row my-5">
        <div className="w-3/4">
          <Slider {...settings}>
            <div>
              <img
                src={imageSlide1}
                alt="slide1"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <img
                src={imageSlide4}
                alt="slide2"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <img
                src={imageSlide5}
                alt="slide3"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </Slider>
        </div>
        <div className="w-1/4">
          <img
            src={imageSlide2}
            alt="slide1"
            className="w-full h-[200px] object-cover"
          />
          <img
            src={imageSlide3}
            alt="slide2"
            className="w-full h-[200px] object-cover"
          />
        </div>
      </div>
    </>
  );
}
