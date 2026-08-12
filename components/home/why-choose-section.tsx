import Image from "next/image";
import { FancyButton } from "@/components/ui/fancy-button";
import { SectionTitle } from "@/components/home/template/section-title";
import { ProgressBar } from "@/components/home/template/progress-bar";
import { SlideInRight } from "@/components/home/template/slide-in-right";
import { RichTitle } from "@/components/home/template/rich-text";
import type { WhyChooseSectionData } from "@/lib/home/section-types";

export function WhyChooseSection({ section, skills }: WhyChooseSectionData) {
  return (
    <section className="tg-section why-choose-one">
      <div className="why-choose-one__shape-3 float-bob-y">
        {section.shape3 && (
          <Image src={section.shape3} alt="" width={1022} height={751} />
        )}
      </div>
      <div className="why-choose-one__shape-4" />
      <div className="why-choose-one__shape-5" />
      <div className="tg-container">
        <div className="tg-row">
          <div className="tg-col-xl-5">
            <div className="why-choose-one__left">
              <SectionTitle tagline={section.tagline}>
                <RichTitle text={section.title} />
              </SectionTitle>
              <p className="why-choose-one__text">{section.text}</p>
              <ul className="why-choose-one__progress-list">
                {skills.map((skill) => (
                  <li key={skill.id}>
                    <ProgressBar title={skill.title} percent={skill.percent} />
                  </li>
                ))}
              </ul>
              <div className="why-choose-one__btn-and-client-info">
                <div className="why-choose-one__btn-box">
                  <FancyButton variant="explore" href={section.ctaUrl || "#"}>
                    {section.ctaLabel}
                  </FancyButton>
                </div>
                <div className="why-choose-one__client-box">
                  <div className="why-choose-one__client-img">
                    {section.clientImage && (
                      <Image
                        src={section.clientImage}
                        alt={section.clientName}
                        width={46}
                        height={46}
                      />
                    )}
                  </div>
                  <div className="why-choose-one__client-content">
                    <h3>{section.clientName}</h3>
                    <span>{section.clientRole}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tg-col-xl-7">
            <SlideInRight
              className="why-choose-one__right"
              duration="1.2s"
              delay="0.4s"
            >
              <div className="why-choose-one__img">
                {section.image && (
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    width={703}
                    height={703}
                    sizes="(min-width: 1200px) 670px, (min-width: 768px) 600px, 100vw"
                  />
                )}
              </div>
              <div className="why-choose-one__shape-1 img-bounce">
                {section.shape1 && (
                  <Image src={section.shape1} alt="" width={80} height={80} />
                )}
              </div>
              <div className="why-choose-one__shape-2 float-bob-x">
                {section.shape2 && (
                  <Image src={section.shape2} alt="" width={142} height={46} />
                )}
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
}
