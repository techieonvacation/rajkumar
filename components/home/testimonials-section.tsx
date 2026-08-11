"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionTitle } from "@/components/home/template/section-title";
import { BrandStrip } from "@/components/home/template/brand-strip";
import {
  TESTIMONIALS,
  TESTIMONIAL_ROLE,
  TESTIMONIAL_TEXT,
  TESTIMONIAL_TITLE,
} from "@/lib/home-sections";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: { delay: 5000, disableOnInteraction: false },
  loop: true,
  navigation: { nextEl: ".swiper-prev", prevEl: ".swiper-next" },
  pagination: { el: ".swiper-pagination", clickable: true },
};

export function TestimonialsSection() {
  return (
    <section className="tg-section testimonial-one">
      <div className="testimonial-one__bg">
        <Image
          src="/template/backgrounds/testimonial-one-bg-1.jpg"
          alt=""
          fill
          sizes="27vw"
        />
      </div>
      <div className="testimonial-one__shape-1" />
      <div className="testimonial-one__shape-2 float-bob-y">
        <Image
          src="/template/shapes/testimonial-one-shape-2.png"
          alt=""
          width={291}
          height={754}
        />
      </div>
      <div className="tg-container">
        <div className="tg-row">
          <div className="tg-col-xl-3" />
          <div className="tg-col-xl-9">
            <div className="testimonial-one__content-box">
              <SectionTitle tagline="Client Testimonial">
                What Our Clients
                <span>
                  {" "}
                  - Say
                  <br />
                </span>
                <span> About Us</span>
              </SectionTitle>
              <Swiper {...swiperOptions} className="testimonial-one__carousel">
                {TESTIMONIALS.map((testimonial) => (
                  <SwiperSlide key={testimonial.name}>
                    <div className="testimonial-one__single">
                      <div className="testimonial-one__img-box">
                        <div className="testimonial-one__img">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={260}
                            height={292}
                          />
                        </div>
                      </div>
                      <div className="testimonial-one__content">
                        <h4 className="testimonial-one__title">
                          {TESTIMONIAL_TITLE}
                        </h4>
                        <p className="testimonial-one__text">
                          {TESTIMONIAL_TEXT}
                        </p>
                        <div className="testimonial-one__bottom">
                          <div className="testimonial-one__quote-and-client-info">
                            <div className="testimonial-one__quote">
                              <span className="tg-icon-left" />
                            </div>
                            <div className="testimonial-one__client-info">
                              <p className="testimonial-one__client-sub-title">
                                {TESTIMONIAL_ROLE}
                              </p>
                              <h3 className="testimonial-one__client-name">
                                <Link href="/testimonials">
                                  {testimonial.name}
                                </Link>
                              </h3>
                            </div>
                          </div>
                          <div className="testimonial-one__trustpilot-box">
                            <div className="testimonial-one__trustpilot-logo">
                              <Image
                                src="/template/resources/trustpilot-logo.png"
                                alt="Trustpilot"
                                width={162}
                                height={40}
                              />
                            </div>
                            <div className="testimonial-one__trustpilot-text-and-star">
                              <p className="testimonial-one__trustpilot-text">
                                5.0 Excellent{" "}
                              </p>
                              <ul className="testimonial-one__trustpilot-star-list">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <li key={index}>
                                    <div className="testimonial-one__trustpilot-star-icon">
                                      <Image
                                        src="/template/icon/star-icon.png"
                                        alt=""
                                        width={9}
                                        height={8}
                                      />
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
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
        </div>
      </div>
      <BrandStrip />
    </section>
  );
}
