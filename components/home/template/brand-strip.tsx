"use client";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BRAND_AVATARS, BRAND_LOGOS } from "@/lib/home-sections";
import "swiper/css";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: { delay: 5000, disableOnInteraction: false },
  loop: true,
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 30 },
    575: { slidesPerView: 2, spaceBetween: 30 },
    767: { slidesPerView: 3, spaceBetween: 30 },
    991: { slidesPerView: 4, spaceBetween: 30 },
    1199: { slidesPerView: 5, spaceBetween: 30 },
    1350: { slidesPerView: 5, spaceBetween: 30 },
  },
};

export function BrandStrip() {
  return (
    <div className="brand-one">
      <div className="tg-container">
        <div className="tg-row items-center">
          <div className="tg-col-xl-3 tg-col-lg-4 tg-col-md-5">
            <div className="brand-one__left">
              <ul className="brand-one__img-list">
                {BRAND_AVATARS.map((src) => (
                  <li key={src}>
                    <div className="brand-one__img-box">
                      <Image src={src} alt="" width={48} height={48} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="brand-one__text">
                12K Trusted by clients <br />
                worldwide
              </p>
            </div>
          </div>
          <div className="tg-col-xl-9 tg-col-lg-8 tg-col-md-7">
            <div className="brand-one__right">
              <Swiper {...swiperOptions} className="brand-one__carousel">
                {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, index) => (
                  <SwiperSlide key={`${logo.src}-${index}`}>
                    <div className="brand-one__single">
                      <div className="brand-one__img">
                        <Image
                          src={logo.src}
                          alt=""
                          width={logo.width}
                          height={logo.height}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
