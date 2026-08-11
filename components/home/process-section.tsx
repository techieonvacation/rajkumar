import { Fragment } from "react";
import Image from "next/image";
import { SectionTitle } from "@/components/home/template/section-title";
import { PROCESS_STEPS } from "@/lib/home-sections";

export function ProcessSection() {
  return (
    <section className="tg-section process-two">
      <div className="process-two__bg">
        <Image
          src="/template/backgrounds/process-two-bg.jpg"
          alt=""
          fill
          sizes="100vw"
        />
      </div>
      <div className="tg-container">
        <SectionTitle tagline="Working Process" align="center">
          Our Seamless Process
          <br />
          <span>From Concept to Creation</span>
        </SectionTitle>
        <ul className="tg-row">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="tg-col-lg-4"
            >
              <div className="process-two__single">
                {index === 1 && (
                  <>
                    <div className="process-two__shape-1 float-bob-x">
                      <Image
                        src="/template/shapes/process-two-shape-1.png"
                        alt=""
                        width={217}
                        height={72}
                      />
                    </div>
                    <div className="process-two__shape-2 float-bob-x">
                      <Image
                        src="/template/shapes/process-two-shape-2.png"
                        alt=""
                        width={216}
                        height={71}
                      />
                    </div>
                  </>
                )}
                <div className="process-two__count" />
                <h3 className="process-two__title">{step.title}</h3>
                <p className="process-two__text">
                  {step.text.map((line, lineIndex) => (
                    <Fragment key={line}>
                      {lineIndex > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
