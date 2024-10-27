import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

interface ShippingSliderProps {
  content: string[];
}

const ShippingSlider = ({ content }: ShippingSliderProps) => {
  const settings = {
    infinite: content.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: content.length > 1,
    autoplaySpeed: 3000,
    prevArrow: content.length > 1 ? <SamplePrevArrow /> : <></>,
    nextArrow: content.length > 1 ? <SampleNextArrow /> : <></>,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: content.length > 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handlePrevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  function SamplePrevArrow() {
    return (
      <div
        className="absolute lg:top-4 top-0 z-40 lg:left-10 left-2 transform lg:-translate-y-1/2 lg:cursor-pointer"
        onClick={handlePrevSlide}
      >
        <span className="md:text-2xl text-sm font-bold text-black">&lt;</span>
      </div>
    );
  }

  function SampleNextArrow() {
    return (
      <div
        className="absolute lg:top-4 top-0 z-40 lg:right-10 right-2 lg:transform lg:-translate-y-1/2 lg:cursor-pointer"
        onClick={handleNextSlide}
      >
        <span className="md:text-2xl text-sm font-bold text-black">&gt;</span>
      </div>
    );
  }
  const sliderRef = React.createRef<Slider>();
  return (
    <div className="">
      <Slider {...settings} ref={sliderRef} className="w-full">
        {content &&
          content.map((item, index) => (
            <div key={index} className="w-full  text-center py-2 bg-foreground">
              <p className="font-semibold font-mono text-gray-800 text-xs md:text-base">
                {item}
              </p>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default ShippingSlider;
