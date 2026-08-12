import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/home/template/section-title";
import { CurvedText } from "@/components/home/template/curved-text";
import { MultiLine, RichTitle } from "@/components/home/template/rich-text";
import type { ServicesSectionData } from "@/lib/home/section-types";

function toPairs(features: string[]) {
  const pairs: string[][] = [];
  for (let index = 0; index < features.length; index += 2) {
    pairs.push(features.slice(index, index + 2));
  }
  return pairs;
}

export function ServicesSection({ section, cards }: ServicesSectionData) {
  return (
    <section className="tg-section services-two" id="services">
      <div className="services-two__shape-1" />
      <div className="tg-container">
        <div className="services-two__top">
          <SectionTitle tagline={section.tagline}>
            <RichTitle
              text={section.title}
              image={
                section.titleImage ? (
                  <Image
                    src={section.titleImage}
                    alt=""
                    width={120}
                    height={40}
                  />
                ) : null
              }
            />
          </SectionTitle>
          <Link
            href={section.circleUrl || "#"}
            className="services-two__round-text-box"
          >
            <div className="services-two__round-text-box-outer">
              <div className="services-two__round-text-box-inner">
                <CurvedText
                  text={section.circleText}
                  radius={section.circleRadius}
                  className="services-two__curved-circle"
                />
                <div className="services-two__round-icon">
                  {section.circleIcon && (
                    <Image
                      src={section.circleIcon}
                      alt=""
                      width={42}
                      height={42}
                    />
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="services-two__bottom">
          <div className="services-two__services-list">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`services-two__services-list-single${
                  index === 0 ? " services-two__services-list-single-1" : ""
                }`}
              >
                <div className="services-two__count-and-title">
                  <div className="services-two__count" />
                  <h3 className="services-two__title">
                    <Link href={card.url || "#"}>
                      <MultiLine text={card.title} />
                    </Link>
                  </h3>
                </div>
                <div className="services-two__service-list-box">
                  <ul className="services-two__services-list-inner">
                    {toPairs(card.features).map((pair, pairIndex) => (
                      <li key={pairIndex}>
                        {pair.map((feature, featureIndex) => (
                          <p key={featureIndex}>
                            <span className="tg-icon-plus" />
                            {feature}
                          </p>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="services-two__hover-img">
                  {card.image && (
                    <Image
                      src={card.image}
                      alt={card.title.replace(/\s*\n\s*/g, " ")}
                      width={250}
                      height={320}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
