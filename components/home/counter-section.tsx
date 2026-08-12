import Image from "next/image";
import { SectionTitle } from "@/components/home/template/section-title";
import { CountUp } from "@/components/home/template/count-up";
import { Reveal } from "@/components/home/template/reveal";
import { RichTitle } from "@/components/home/template/rich-text";
import {
  toRevealAnimation,
  toSectionAlignment,
} from "@/lib/home/section-options";
import type { CounterSectionData } from "@/lib/home/section-types";

export function CounterSection({ section, items }: CounterSectionData) {
  return (
    <section className="tg-section counter-one">
      <div className="counter-one__wrap">
        <div className="counter-one__bg-shape float-bob-x">
          {section.bgShape && (
            <Image
              src={section.bgShape}
              alt=""
              fill
              sizes="(min-width: 992px) 50vw, 100vw"
            />
          )}
        </div>
        <div className="counter-one__shape-1" />
        <div className="counter-one__shape-2" />
        <div className="tg-container">
          <SectionTitle
            tagline={section.tagline}
            align={toSectionAlignment(section.align)}
          >
            <RichTitle text={section.title} />
          </SectionTitle>
          <div className="tg-row">
            {items.map((item) => (
              <Reveal
                key={item.id}
                className="tg-col-xl-3 tg-col-lg-6 tg-col-md-6"
                animation={toRevealAnimation(item.animation)}
                delay={item.delay}
              >
                <div className="counter-one__single">
                  <div className="counter-one__icon">
                    <span className={item.icon} />
                  </div>
                  <div className="counter-one__content">
                    <div className="counter-one__count-box">
                      <h3>
                        <CountUp end={item.value} duration={item.duration} />
                      </h3>
                      <span>{item.suffix}</span>
                    </div>
                    <p className="counter-one__text">{item.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
