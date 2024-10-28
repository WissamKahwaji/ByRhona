import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

interface HomeSliderProos {
  images: string[] | undefined;
  videos?: string[] | undefined;
}
const HomeSlider = ({ images, videos }: HomeSliderProos) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
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
        className="absolute lg:top-1/2 top-1/3 z-40 lg:left-4 left-2 transform lg:-translate-y-1/2 lg:cursor-pointer"
        onClick={handlePrevSlide}
      >
        <span className="md:text-4xl text-2xl font-bold text-black">&lt;</span>
      </div>
    );
  }

  function SampleNextArrow() {
    return (
      <div
        className="absolute lg:top-1/2 top-1/3 z-40 lg:right-4 right-2 lg:transform lg:-translate-y-1/2 lg:cursor-pointer"
        onClick={handleNextSlide}
      >
        <span className="md:text-4xl text-2xl font-bold text-black">&gt;</span>
      </div>
    );
  }
  const sliderRef = React.createRef<Slider>();
  return (
    <div className="w-full md:h-[520px]  h-[180px]">
      <Slider {...settings} ref={sliderRef} className="w-full  ">
        {images &&
          images.map((item, index) => (
            <div className="md:h-[490px]  h-[140px]">
              <img
                src={item}
                alt={`Slider ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        {videos &&
          videos.map((item, index) => (
            <div key={index}>
              <video
                className="w-full md:h-[490px]  h-[140px] object-contain"
                controls
                autoPlay
                muted
              >
                <source src={item} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default HomeSlider;
