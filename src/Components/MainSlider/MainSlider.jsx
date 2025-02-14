import React from "react";
import sliderImageOne from "../../assets/sliderImageOne.jpeg";
import sliderImageTwo from "../../assets/sliderImageTwo.jpeg";
import mainSliderOne from "../../assets/mainSliderOne.jpeg";
import mainSliderTwo from "../../assets/mainSliderTwo.png";
import mainSliderThree from "../../assets//mainSliderThree.jpeg";
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
                src={mainSliderOne}
                alt="mainSliderOne"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <img
                src={mainSliderTwo}
                alt="mainSliderTwo"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <img
                src={mainSliderThree}
                alt="mainSliderThree"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </Slider>
        </div>
        <div className="w-1/4">
          <img
            src={sliderImageOne}
            alt="sliderImageOne"
            className="w-full h-[200px] object-cover"
          />
          <img
            src={sliderImageTwo}
            alt="sliderImageTwo"
            className="w-full h-[200px] object-cover"
          />
        </div>
      </div>
    </>
  );
}
