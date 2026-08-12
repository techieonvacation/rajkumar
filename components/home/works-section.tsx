"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import { SectionTitle } from "@/components/home/template/section-title";
import { CurvedText } from "@/components/home/template/curved-text";
import { RichTitle } from "@/components/home/template/rich-text";
import type { WorksSectionData } from "@/lib/home/section-types";
import "swiper/css";
import "yet-another-react-lightbox/styles.css";

export function WorksSection({ section, items }: WorksSectionData) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: section.slidesMobile,
    spaceBetween: section.spaceBetween,
    autoplay: { delay: section.autoplayDelay, disableOnInteraction: false },
    loop: section.loop,
    breakpoints: {
      320: {
        slidesPerView: section.slidesMobile,
        spaceBetween: section.spaceBetween,
      },
      575: {
        slidesPerView: section.slidesMobile,
        spaceBetween: section.spaceBetween,
      },
      767: {
        slidesPerView: section.slidesTablet,
        spaceBetween: section.spaceBetween,
      },
      991: {
        slidesPerView: section.slidesDesktop,
        spaceBetween: section.spaceBetween,
      },
      1199: {
        slidesPerView: section.slidesWide,
        spaceBetween: section.spaceBetween,
      },
      1350: {
        slidesPerView: section.slidesWide,
        spaceBetween: section.spaceBetween,
      },
    },
  };

  return (
    <section className="tg-section portfolio-one" id="works">
      <h2 className="portfolio-one__big-text">{section.bigText}</h2>
      <div className="portfolio-one__shape-1">
        {section.shape1 && (
          <Image src={section.shape1} alt="" width={923} height={1948} />
        )}
      </div>
      <div className="portfolio-one__shape-2">
        {section.shape2 && (
          <Image src={section.shape2} alt="" width={1358} height={1948} />
        )}
      </div>
      <div className="tg-container">
        <div className="portfolio-one__top">
          <SectionTitle tagline={section.tagline}>
            <RichTitle text={section.title} />
          </SectionTitle>
          <Link
            href={section.circleUrl || "#"}
            className="portfolio-one__round-text-box"
          >
            <div className="portfolio-one__round-text-box-outer">
              <div className="portfolio-one__round-text-box-inner">
                <CurvedText
                  text={section.circleText}
                  radius={section.circleRadius}
                  className="portfolio-one__curved-circle"
                />
                <div className="portfolio-one__round-icon">
                  {section.circleIcon && (
                    <Image
                      src={section.circleIcon}
                      alt=""
                      width={40}
                      height={40}
                    />
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="portfolio-one__bottom">
        <Swiper {...swiperOptions} className="portfolio-one__carousel">
          {items.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div className="portfolio-one__single">
                <div className="portfolio-one__img-box">
                  <div className="portfolio-one__img">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={460}
                        height={350}
                        sizes="(min-width: 1199px) 25vw, (min-width: 991px) 33vw, (min-width: 767px) 50vw, 100vw"
                      />
                    )}
                    <div className="portfolio-one__tag">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="portfolio-one__content">
                  <div className="portfolio-one__title-box">
                    <h3 className="portfolio-one__title">
                      <Link href={item.url || "#"}>{item.title}</Link>
                    </h3>
                    <p className="portfolio-one__text">{item.text}</p>
                  </div>
                  <div
                    className="portfolio-one__arrow"
                    onClick={
                      section.lightbox
                        ? () => setLightboxIndex(index)
                        : undefined
                    }
                  >
                    <Link
                      href="#"
                      aria-label={`Preview ${item.title}`}
                      onClick={(event) => event.preventDefault()}
                    >
                      <span className="tg-icon-right-arrow" />
                    </Link>
                  </div>
                  <div className="portfolio-one__year">
                    <span>{item.year}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {section.lightbox && (
        <Lightbox
          open={lightboxIndex !== null}
          index={lightboxIndex ?? 0}
          close={() => setLightboxIndex(null)}
          slides={items.map((item) => ({ src: item.image }))}
        />
      )}
    </section>
  );
}
