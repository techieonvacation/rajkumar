import Image from "next/image";
import { FancyButton } from "@/components/ui/fancy-button";
import { SectionTitle } from "@/components/home/template/section-title";
import { ProgressBar } from "@/components/home/template/progress-bar";
import { SlideInRight } from "@/components/home/template/slide-in-right";
import { WHY_CHOOSE_SKILLS } from "@/lib/home-sections";

export function WhyChooseSection() {
  return (
    <section className="tg-section why-choose-one">
      <div className="why-choose-one__shape-3 float-bob-y">
        <Image
          src="/template/shapes/why-choose-one-shape-3.png"
          alt=""
          width={1022}
          height={751}
        />
      </div>
      <div className="why-choose-one__shape-4" />
      <div className="why-choose-one__shape-5" />
      <div className="tg-container">
        <div className="tg-row">
          <div className="tg-col-xl-5">
            <div className="why-choose-one__left">
              <SectionTitle tagline="Why Chooses Us">
                Elevate Growth <span>with Our</span>
                <br />
                <span>Cutting-Edge IT</span> Solutions
                <br /> for Success
              </SectionTitle>
              <p className="why-choose-one__text">
                Innovating and empowering businesses with tailored solutions for
                success and growth. Innovating and empowering{" "}
              </p>
              <ul className="why-choose-one__progress-list">
                {WHY_CHOOSE_SKILLS.map((skill) => (
                  <li key={skill.title}>
                    <ProgressBar title={skill.title} percent={skill.percent} />
                  </li>
                ))}
              </ul>
              <div className="why-choose-one__btn-and-client-info">
                <div className="why-choose-one__btn-box">
                  <FancyButton variant="explore" href="/about">
                    About Us
                  </FancyButton>
                </div>
                <div className="why-choose-one__client-box">
                  <div className="why-choose-one__client-img">
                    <Image
                      src="/template/resources/why-choose-one-client-img.jpg"
                      alt="Thomas Alison"
                      width={46}
                      height={46}
                    />
                  </div>
                  <div className="why-choose-one__client-content">
                    <h3>Thomas Alison</h3>
                    <span>Founder &amp; CEO</span>
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
                <Image
                  src="/template/resources/why-choose-one-img-1.png"
                  alt="Why choose us"
                  width={703}
                  height={703}
                  sizes="(min-width: 1200px) 670px, (min-width: 768px) 600px, 100vw"
                />
              </div>
              <div className="why-choose-one__shape-1 img-bounce">
                <Image
                  src="/template/shapes/why-choose-one-shape-1.png"
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
              <div className="why-choose-one__shape-2 float-bob-x">
                <Image
                  src="/template/shapes/why-choose-one-shape-2.png"
                  alt=""
                  width={142}
                  height={46}
                />
              </div>
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
}
