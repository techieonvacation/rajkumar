import Image from "next/image";
import { SectionTitle } from "@/components/home/template/section-title";
import { CountUp } from "@/components/home/template/count-up";
import { Reveal } from "@/components/home/template/reveal";
import { COUNTER_STATS } from "@/lib/home-sections";

export function CounterSection() {
  return (
    <section className="tg-section counter-one">
      <div className="counter-one__wrap">
        <div className="counter-one__bg-shape float-bob-x">
          <Image
            src="/template/shapes/counter-one-bg-shape.png"
            alt=""
            fill
            sizes="(min-width: 992px) 50vw, 100vw"
          />
        </div>
        <div className="counter-one__shape-1" />
        <div className="counter-one__shape-2" />
        <div className="tg-container">
          <SectionTitle tagline="The Numbers Speak" align="center">
            Exploring Business Growth <span>In IT</span>
            <br />
            <span> Consulting Solutions</span>
          </SectionTitle>
          <div className="tg-row">
            {COUNTER_STATS.map((stat) => (
              <Reveal
                key={stat.label}
                className="tg-col-xl-3 tg-col-lg-6 tg-col-md-6"
                animation={stat.animation}
                delay={stat.delay}
              >
                <div className="counter-one__single">
                  <div className="counter-one__icon">
                    <span className={stat.icon} />
                  </div>
                  <div className="counter-one__content">
                    <div className="counter-one__count-box">
                      <h3>
                        <CountUp end={stat.end} duration={stat.duration} />
                      </h3>
                      <span>{stat.suffix}</span>
                    </div>
                    <p className="counter-one__text">{stat.label}</p>
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
