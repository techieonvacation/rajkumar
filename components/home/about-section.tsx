import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/home/template/section-title";
import { CountUp } from "@/components/home/template/count-up";
import { ABOUT_CLIENT_IMAGES, ABOUT_POINTS } from "@/lib/home-sections";

export function AboutSection() {
  return (
    <section className="tg-section about-two" id="about">
      <div className="about-two__shape-2" />
      <div className="about-two__shape-3">
        <Image
          src="/template/shapes/about-two-shape-3.png"
          alt=""
          width={560}
          height={583}
        />
      </div>
      <div className="tg-container">
        <div className="tg-row">
          <div className="tg-col-xl-6">
            <div className="about-two__left">
              <div className="about-two__img-box">
                <div className="about-two__img">
                  <Image
                    src="/template/resources/about-two-img-1.jpg"
                    alt="Consulting team at work"
                    width={495}
                    height={474}
                  />
                </div>
                <div className="about-two__img-2">
                  <Image
                    src="/template/resources/about-two-img-2.jpg"
                    alt="Client strategy session"
                    width={336}
                    height={344}
                  />
                </div>
                <div className="about-two__shape-1" />
              </div>
              <div className="about-two__client-box">
                <ul className="about-two__client-img-list">
                  {ABOUT_CLIENT_IMAGES.map((src) => (
                    <li key={src}>
                      <div className="about-two__client-img">
                        <Image src={src} alt="" width={36} height={35} />
                      </div>
                    </li>
                  ))}
                  <li>
                    <Link href="/about" aria-label="View all clients">
                      <span className="tg-icon-plus" />
                    </Link>
                  </li>
                </ul>
                <p className="about-two__client-text">
                  <span>
                    <CountUp end={120} duration={2} />
                  </span>
                  <span>K</span> Satisfied Client
                </p>
              </div>
            </div>
          </div>
          <div className="tg-col-xl-6">
            <div className="about-two__right">
              <SectionTitle tagline="About Us">
                Unlock Your Business <span>Potential</span>
                <br />
                <span>with Our best Cutting-Edge</span> IT
                <br /> Solutions to grow
              </SectionTitle>
              <p className="about-two__text">
                Transform your business with our innovative IT solutions,
                tailored to address your unique challenges and drive growth in
                today&apos;s digital landscape.
              </p>
              <div className="about-two__points-box">
                {[ABOUT_POINTS.slice(0, 2), ABOUT_POINTS.slice(2)].map(
                  (group, groupIndex) => (
                    <ul className="about-two__points-list" key={groupIndex}>
                      {group.map((lines) => (
                        <li key={lines[0]}>
                          <div className="icon">
                            <span className="tg-icon-tick-inside-circle" />
                          </div>
                          <p>
                            {lines.map((line, lineIndex) => (
                              <Fragment key={line}>
                                {lineIndex > 0 && <br />}
                                {line}
                              </Fragment>
                            ))}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
              <div className="about-two__experience-contact-and-btn">
                <div className="about-two__experience-box">
                  <div className="about-two__experience-count-box">
                    <h3>
                      <CountUp end={25} duration={2} />
                    </h3>
                    <span>+</span>
                  </div>
                  <p className="about-two__experience-text">
                    Years of
                    <br /> Experience
                  </p>
                </div>
                <div className="about-two__call-box">
                  <div className="about-two__call-icon">
                    <span className="tg-icon-customer-service-headset" />
                  </div>
                  <div className="about-two__call-content">
                    <span>call us for inquiry</span>
                    <p>
                      <Link href="tel:00123456767">+00 (123) 456767</Link>
                    </p>
                  </div>
                </div>
                <div className="about-two__btn-box">
                  <Link href="/about" className="thm-btn">
                    Learn More
                    <span className="tg-icon-right-arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
