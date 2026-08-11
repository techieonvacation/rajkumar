import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/home/template/section-title";
import { SlideInRight } from "@/components/home/template/slide-in-right";
import { ContactForm } from "@/components/home/template/contact-form";
import { CONTACT_DETAILS } from "@/lib/home-sections";

const MARQUEE_ITEMS = ["GET IN TOUCH *", "GET IN TOUCH *", "GET IN TOUCH *", "GET IN TOUCH *"];

export function ContactSection() {
  return (
    <section className="tg-section contact-two" id="contact">
      <div className="contact-sliding-text__wrap overflow-hidden">
        <ul className="contact-two__sliding-text-list" aria-hidden="true">
          {MARQUEE_ITEMS.map((item, index) => (
            <li key={index}>
              <h2 className="contact-two__sliding-text-title">{item}</h2>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="contact-two__bg"
        style={{
          backgroundImage: "url(/template/backgrounds/contact-two-bg.jpg)",
        }}
      />
      <div className="contact-two__shape-1 float-bob-y">
        <Image
          src="/template/shapes/contact-two-shape-1.png"
          alt=""
          width={690}
          height={847}
        />
      </div>
      <div className="contact-two__shape-2" />
      <div className="tg-container">
        <div className="tg-row">
          <div className="tg-col-xl-6">
            <div className="contact-two__left">
              <SectionTitle tagline="Get In Touch">
                Conversation<span> Reach</span>
                <br />
                <span>Out Anytime</span>
              </SectionTitle>
              <p className="contact-two__text">
                We&apos;re here to listen! Whether you have
                <br /> questions, feedback, or just want to say hello,
                <br /> feel free to reach out.{" "}
              </p>
              <ul className="contact-two__contact-list">
                {CONTACT_DETAILS.map((detail) => (
                  <li key={detail.label}>
                    <div className="icon">
                      <span className={detail.icon} />
                    </div>
                    <div className="content">
                      <span>{detail.label}</span>
                      <p>
                        {detail.href ? (
                          <Link href={detail.href}>{detail.value}</Link>
                        ) : (
                          detail.value
                        )}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tg-col-xl-6">
            <SlideInRight
              className="contact-two__right"
              duration="2500ms"
              delay="100ms"
            >
              <ContactForm />
            </SlideInRight>
          </div>
        </div>
      </div>
    </section>
  );
}
