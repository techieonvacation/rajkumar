import Image from "next/image";
import { SectionTitle } from "@/components/home/template/section-title";
import { MultiLine, RichTitle } from "@/components/home/template/rich-text";
import { toSectionAlignment } from "@/lib/home/section-options";
import type { ProcessSectionData } from "@/lib/home/section-types";

export function ProcessSection({ section, steps }: ProcessSectionData) {
  return (
    <section className="tg-section process-two">
      <div className="process-two__bg">
        {section.bgImage && (
          <Image src={section.bgImage} alt="" fill sizes="100vw" />
        )}
      </div>
      <div className="tg-container">
        <SectionTitle
          tagline={section.tagline}
          align={toSectionAlignment(section.align)}
        >
          <RichTitle text={section.title} />
        </SectionTitle>
        <ul className="tg-row">
          {steps.map((step, index) => (
            <li key={step.id} className="tg-col-lg-4">
              <div className="process-two__single">
                {index === section.shapeStepIndex && (
                  <>
                    <div className="process-two__shape-1 float-bob-x">
                      {section.shape1 && (
                        <Image
                          src={section.shape1}
                          alt=""
                          width={217}
                          height={72}
                        />
                      )}
                    </div>
                    <div className="process-two__shape-2 float-bob-x">
                      {section.shape2 && (
                        <Image
                          src={section.shape2}
                          alt=""
                          width={216}
                          height={71}
                        />
                      )}
                    </div>
                  </>
                )}
                <div className="process-two__count" />
                <h3 className="process-two__title">{step.title}</h3>
                <p className="process-two__text">
                  <MultiLine text={step.text} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
