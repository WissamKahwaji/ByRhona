import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

interface HappyClientsProps {
  images: string[];
}

const HappyClients = ({ images }: HappyClientsProps) => {
  const { t } = useTranslation();

  const settings = {
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: images.length > 1,
    autoplaySpeed: 3000,
    prevArrow: images.length > 1 ? <SamplePrevArrow /> : <></>,
    nextArrow: images.length > 1 ? <SampleNextArrow /> : <></>,
    dots: true,
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
        className="absolute lg:top-1/2 top-1/3 z-40 lg:-left-10 left-2 transform lg:-translate-y-1/2 lg:cursor-pointer"
        onClick={handlePrevSlide}
      >
        <span className="md:text-4xl text-2xl font-bold text-black">&lt;</span>
      </div>
    );
  }

  function SampleNextArrow() {
    return (
      <div
        className="absolute lg:top-1/2 top-1/3 z-40 lg:-right-10 right-2 lg:transform lg:-translate-y-1/2 lg:cursor-pointer"
        onClick={handleNextSlide}
      >
        <span className="md:text-4xl text-2xl font-bold text-black">&gt;</span>
      </div>
    );
  }
  const sliderRef = React.createRef<Slider>();

  return (
    <section className="flex flex-col gap-16 bg-gray-background py-12">
      <div>
        <h2 className="sm:2xl  scroll-m-20 pb-2 text-center text-xl font-semibold uppercase tracking-tight first:mt-0 md:text-3xl">
          {t("happy_clients")}
        </h2>
      </div>
      {images.length > 0 && (
        <div className=" md:h-[420px]  h-[180px] justify-center items-center flex w-full">
          <Slider {...settings} ref={sliderRef} className="w-[90%] md:w-3/4 ">
            {images &&
              images.map((item, index) => (
                <div className="md:h-[420px]  h-[140px]">
                  <img
                    src={item}
                    alt={`Slider ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
          </Slider>
        </div>
      )}
    </section>
  );
};

export default HappyClients;
