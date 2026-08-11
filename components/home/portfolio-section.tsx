"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import { SectionTitle } from "@/components/home/template/section-title";
import {
  PORTFOLIO_ITEMS,
  PORTFOLIO_SLIDE_COUNT,
  PORTFOLIO_TEXT,
} from "@/lib/home-sections";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "yet-another-react-lightbox/styles.css";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: { delay: 5000, disableOnInteraction: false },
  loop: true,
  navigation: { nextEl: ".swiper-prev", prevEl: ".swiper-next" },
  pagination: { el: ".swiper-pagination", clickable: true },
};

const lightboxSlides = PORTFOLIO_ITEMS.map((item) => ({ src: item.image }));

export function PortfolioSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="tg-section portfolio-two" id="portfolio">
      <div className="portfolio-two__shape-1 float-bob-y">
        <Image
          src="/template/shapes/portfolio-two-shape-1.png"
          alt=""
          width={783}
          height={1104}
        />
      </div>
      <div className="portfolio-two__shape-2" />
      <div className="portfolio-two__shape-3" />
      <div className="portfolio-two__shape-4" />
      <div className="tg-container">
        <SectionTitle tagline="Portfolio" align="center">
          Explore Our Creative <span>Journey</span>
          <br />
          <span> Crafting Success Through</span>
        </SectionTitle>
        <div className="portfolio-two__carousel-container">
          <Swiper {...swiperOptions} className="portfolio-two__carousel">
            {Array.from({ length: PORTFOLIO_SLIDE_COUNT }).map((_, slide) => (
              <SwiperSlide key={slide}>
                <div className="item">
                  <div className="portfolio-two__single-box">
                    <ul className="portfolio-two__box">
                      {PORTFOLIO_ITEMS.map((item, index) => (
                        <li
                          key={item.image}
                          className={activeIndex === index ? "active" : ""}
                          onMouseEnter={() => setActiveIndex(index)}
                        >
                          <div className="portfolio-two__box-content">
                            <div
                              className="single-portfolio-two__bg"
                              style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div className="portfolio-two__title">
                              <h3>
                                <Link href={item.href}>
                                  {item.title[0]}
                                  <br /> {item.title[1]}
                                </Link>
                              </h3>
                            </div>
                            <div className="portfolio-two__content-box">
                              <div
                                className="portfolio-two__icon"
                                onClick={() => setLightboxIndex(index)}
                              >
                                <Link
                                  href="#"
                                  aria-label={`Preview ${item.title.join(" ")}`}
                                  onClick={(event) => event.preventDefault()}
                                >
                                  <span className="tg-icon-right-arrow-1" />
                                </Link>
                              </div>
                              <div className="portfolio-two__title-box">
                                <h3 className="portfolio-two__title-2">
                                  <Link href={item.href}>
                                    {item.title[0]}
                                    <br /> {item.title[1]}
                                  </Link>
                                </h3>
                                <p className="portfolio-two__text">
                                  {PORTFOLIO_TEXT}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination" />
            <div className="swiper-nav">
              <div className="swiper-prev">
                <span className="tg-icon-right-up" />
              </div>
              <div className="swiper-next">
                <span className="tg-icon-right-up" />
              </div>
            </div>
          </Swiper>
        </div>
      </div>
      <Lightbox
        open={lightboxIndex !== null}
        index={lightboxIndex ?? 0}
        close={() => setLightboxIndex(null)}
        slides={lightboxSlides}
      />
    </section>
  );
}
