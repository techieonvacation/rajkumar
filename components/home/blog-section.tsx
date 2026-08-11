"use client";

import Image from "next/image";
import Link from "next/link";
import { FancyButton } from "@/components/ui/fancy-button";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SectionTitle } from "@/components/home/template/section-title";
import { BLOG_EXCERPT, BLOG_POSTS } from "@/lib/home-sections";
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
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 30 },
    575: { slidesPerView: 1, spaceBetween: 30 },
    767: { slidesPerView: 2, spaceBetween: 30 },
    991: { slidesPerView: 2, spaceBetween: 30 },
    1199: { slidesPerView: 3, spaceBetween: 30 },
    1350: { slidesPerView: 3, spaceBetween: 30 },
  },
};

export function BlogSection() {
  return (
    <section className="tg-section blog-one" id="blog">
      <div className="blog-one__shape-1" />
      <div className="blog-one__shape-2" />
      <div className="tg-container">
        <SectionTitle tagline="News &amp; Blog" align="center">
          How We&apos;ve <span>Empowered Businesses</span>
          <br />
          <span> with Innovative</span>Tech Solutions
        </SectionTitle>
        <Swiper {...swiperOptions} className="blog-one__carousel">
          {BLOG_POSTS.map((post, index) => (
            <SwiperSlide key={`${post.title}-${index}`}>
              <div className="blog-one__single">
                <div className="blog-one__img">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={410}
                    height={248}
                    sizes="(min-width: 1199px) 33vw, (min-width: 767px) 50vw, 100vw"
                  />
                  <div className="blog-one__tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="blog-one__content">
                  <div className="blog-one__user">
                    <div className="blog-one__user-img">
                      <Image
                        src={post.avatar}
                        alt=""
                        width={32}
                        height={32}
                      />
                    </div>
                    <p className="blog-one__user-title">{post.author}</p>
                  </div>
                  <ul className="blog-one__meta">
                    <li>
                      <Link href="/blog">
                        <span className="tg-icon-calendar" />
                        {post.date}
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog">
                        <span className="tg-icon-chat" />
                        {post.comments}
                      </Link>
                    </li>
                  </ul>
                  <h3 className="blog-one__title">
                    <Link href="/blog">{post.title}</Link>
                  </h3>
                  <p className="blog-one__text">{BLOG_EXCERPT}</p>
                  <div className="blog-one__btn-box">
                    <FancyButton variant="slide" size="sm" href="/blog">
                      Read More
                    </FancyButton>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-nav">
            <div className="swiper-prev">
              <span className="tg-icon-right-up" />
            </div>
            <div className="swiper-next">
              <span className="tg-icon-right-up" />
            </div>
          </div>
          <div className="swiper-pagination" />
        </Swiper>
      </div>
    </section>
  );
}
