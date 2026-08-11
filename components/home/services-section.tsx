import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/home/template/section-title";
import { SERVICES } from "@/lib/home-sections";

const CIRCLE_TEXT = " View All Project • View All Services •";
const CIRCLE_RADIUS = 73.6;

export function ServicesSection() {
  const characters = CIRCLE_TEXT.split("");
  const step = 360 / characters.length;

  return (
    <section className="tg-section services-two" id="services">
      <div className="services-two__shape-1" />
      <div className="tg-container">
        <div className="services-two__top">
          <SectionTitle tagline="Our Services">
            Your Business with Cutting-Edge IT
            <br /> Solutions{" "}
            <Image
              src="/template/services/section-title-img.jpg"
              alt=""
              width={120}
              height={40}
            />
            <span>Innovative IT Services</span>
            <br />
            <span>Tailored for Your Success</span>
          </SectionTitle>
          <Link href="/services" className="services-two__round-text-box">
            <div className="services-two__round-text-box-outer">
              <div className="services-two__round-text-box-inner">
                <div className="services-two__curved-circle">
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
                <div className="services-two__round-icon">
                  <Image
                    src="/template/icon/services-two-round-icon.png"
                    alt=""
                    width={42}
                    height={42}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="services-two__bottom">
          <div className="services-two__services-list">
            {SERVICES.map((service, index) => (
              <div
                key={service.title.join(" ")}
                className={`services-two__services-list-single${
                  index === 0 ? " services-two__services-list-single-1" : ""
                }`}
              >
                <div className="services-two__count-and-title">
                  <div className="services-two__count" />
                  <h3 className="services-two__title">
                    <Link href={service.href}>
                      {service.title[0]}
                      <br /> {service.title[1]}
                    </Link>
                  </h3>
                </div>
                <div className="services-two__service-list-box">
                  <ul className="services-two__services-list-inner">
                    {service.features.map((pair) => (
                      <li key={pair.join("-")}>
                        {pair.map((feature) => (
                          <p key={feature}>
                            <span className="tg-icon-plus" />
                            {feature}
                          </p>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="services-two__hover-img">
                  <Image
                    src={service.image}
                    alt={service.title.join(" ")}
                    width={250}
                    height={320}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
