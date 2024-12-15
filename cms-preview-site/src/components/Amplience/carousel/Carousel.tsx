/* eslint-disable @typescript-eslint/no-explicit-any */
// Carousel.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "./Carousel.scss";
// Import Swiper styles
import "swiper/css";

const Carousel = (data: any) => {
  const getContent = () => {
    console.log("data for carousel", data);
    return data.data.content;
  };

  const content = getContent();

  const getCarousel = () => {
    console.log(content);
    return (
      <div>
        <div className={"carousel-header"}>{content.headlineText}</div>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {content.items.map((item: any) => {
            const itemInfo = item.items[0]
            return (
              <SwiperSlide>
                <div className={"carousel-item"}>
                  <img
                    src={`https://underarmour.scene7.com/is/image/Underarmour/${itemInfo.mediaExternalId}?qlt=75&fmt=jpg&wid=270&op_sharpen=1&`}
                  ></img>
                  <div className={'slide-details'}>
                    <div className={'item-headline'}>
                      <a className={'item-link'} href="#">{itemInfo.headlineText}</a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    );
  };

  return <div className="carousel-container">{getCarousel()}</div>;
};

export default Carousel;
