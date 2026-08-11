"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import { SectionTitle } from "@/components/home/template/section-title";
import { WORKS } from "@/lib/home-sections";
import "swiper/css";
import "yet-another-react-lightbox/styles.css";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: { delay: 5000, disableOnInteraction: false },
  loop: true,
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 30 },
    575: { slidesPerView: 1, spaceBetween: 30 },
    767: { slidesPerView: 2, spaceBetween: 30 },
    991: { slidesPerView: 3, spaceBetween: 30 },
    1199: { slidesPerView: 4, spaceBetween: 30 },
    1350: { slidesPerView: 4, spaceBetween: 30 },
  },
};

const CIRCLE_TEXT = " View All Project View All Project";
const CIRCLE_RADIUS = 73.6;

const lightboxSlides = WORKS.map((work) => ({ src: work.image }));

export function WorksSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const characters = CIRCLE_TEXT.split("");
  const step = 360 / characters.length;

  return (
    <section className="tg-section portfolio-one" id="works">
      <h2 className="portfolio-one__big-text">portfolio</h2>
      <div className="portfolio-one__shape-1">
        <Image
          src="/template/shapes/portfolio-one-shape-1.png"
          alt=""
          width={923}
          height={1948}
        />
      </div>
      <div className="portfolio-one__shape-2">
        <Image
          src="/template/shapes/portfolio-one-shape-2.png"
          alt=""
          width={1358}
          height={1948}
        />
      </div>
      <div className="tg-container">
        <div className="portfolio-one__top">
          <SectionTitle tagline="See Our Works">
            How We&apos;ve <span>Empowered</span>
            <br />
            <span>Businesses with Innovative</span>
            <br />
            Tech Solutions
          </SectionTitle>
          <Link href="/projects" className="portfolio-one__round-text-box">
            <div className="portfolio-one__round-text-box-outer">
              <div className="portfolio-one__round-text-box-inner">
                <div className="portfolio-one__curved-circle">
                  {characters.map((character, index) => (
                    <span
                      key={index}
                      style={{
                        position: "absolute",
                        left: "0%",
                        top: "0%",
                        transformOrigin: `0 ${CIRCLE_RADIUS}px`,
                        transform: `rotate(${index * step}deg)`,
                      }}
                    >
                      {character}
                    </span>
                  ))}
                </div>
                <div className="portfolio-one__round-icon">
                  <Image
                    src="/template/icon/portfolio-one-round-icon.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="portfolio-one__bottom">
        <Swiper {...swiperOptions} className="portfolio-one__carousel">
          {WORKS.map((work, index) => (
            <SwiperSlide key={work.image}>
              <div className="portfolio-one__single">
                <div className="portfolio-one__img-box">
                  <div className="portfolio-one__img">
                    <Image
                      src={work.image}
                      alt={work.title}
                      width={460}
                      height={350}
                      sizes="(min-width: 1199px) 25vw, (min-width: 991px) 33vw, (min-width: 767px) 50vw, 100vw"
                    />
                    <div className="portfolio-one__tag">
                      {work.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="portfolio-one__content">
                  <div className="portfolio-one__title-box">
                    <h3 className="portfolio-one__title">
                      <Link href="/projects">{work.title}</Link>
                    </h3>
                    <p className="portfolio-one__text">{work.text}</p>
                  </div>
                  <div
                    className="portfolio-one__arrow"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <Link
                      href="#"
                      aria-label={`Preview ${work.title}`}
                      onClick={(event) => event.preventDefault()}
                    >
                      <span className="tg-icon-right-arrow" />
                    </Link>
                  </div>
                  <div className="portfolio-one__year">
                    <span>{work.year}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
