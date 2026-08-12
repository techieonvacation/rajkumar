import Image from "next/image";
import Link from "next/link";
import { FancyButton } from "@/components/ui/fancy-button";
import { SectionTitle } from "@/components/home/template/section-title";
import { CountUp } from "@/components/home/template/count-up";
import { MultiLine, RichTitle } from "@/components/home/template/rich-text";
import type { AboutSectionData } from "@/lib/home/section-types";

export function AboutSection({ section, points, clients }: AboutSectionData) {
  const perColumn = Math.max(1, section.pointsPerColumn);
  const columns = [points.slice(0, perColumn), points.slice(perColumn)].filter(
    (column) => column.length > 0,
  );

  return (
    <section className="tg-section about-two" id="about">
      <div className="about-two__shape-2" />
      <div className="about-two__shape-3">
        {section.shapeImage && (
          <Image
            src={section.shapeImage}
            alt=""
            width={560}
            height={583}
            priority
          />
        )}
      </div>
      <div className="tg-container">
        <div className="tg-row">
          <div className="tg-col-xl-6">
            <div className="about-two__left">
              <div className="about-two__img-box">
                <div className="about-two__img">
                  {section.image1 && (
                    <Image
                      src={section.image1}
                      alt={section.image1Alt}
                      width={495}
                      height={474}
                      sizes="(min-width: 1200px) 500px, (min-width: 768px) 620px, 100vw"
                    />
                  )}
                </div>
                <div className="about-two__img-2">
                  {section.image2 && (
                    <Image
                      src={section.image2}
                      alt={section.image2Alt}
                      width={336}
                      height={344}
                      sizes="(min-width: 768px) 336px, 100vw"
                    />
                  )}
                </div>
                <div className="about-two__shape-1" />
              </div>
              <div className="about-two__client-box">
                <ul className="about-two__client-img-list">
                  {clients.map((client) => (
                    <li key={client.id}>
                      <div className="about-two__client-img">
                        <Image
                          src={client.image}
                          alt={client.alt}
                          width={41}
                          height={40}
                        />
                      </div>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={section.clientsUrl || "#"}
                      aria-label="View all clients"
                    >
                      <span className="tg-icon-plus" />
                    </Link>
                  </li>
                </ul>
                <p className="about-two__client-text">
                  <span>
                    <CountUp
                      end={section.clientsCount}
                      duration={section.clientsCountDuration}
                    />
                  </span>
                  <span>{section.clientsCountSuffix}</span>{" "}
                  {section.clientsLabel}
                </p>
              </div>
            </div>
          </div>
          <div className="tg-col-xl-6">
            <div className="about-two__right">
              <SectionTitle tagline={section.tagline}>
                <RichTitle text={section.title} />
              </SectionTitle>
              <p className="about-two__text">{section.text}</p>
              <div className="about-two__points-box">
                {columns.map((column, columnIndex) => (
                  <ul className="about-two__points-list" key={columnIndex}>
                    {column.map((point) => (
                      <li key={point.id}>
                        <div className="icon">
                          <span className={section.pointIcon} />
                        </div>
                        <p>
                          <MultiLine text={point.text} />
                        </p>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <div className="about-two__experience-contact-and-btn">
                <div className="about-two__experience-box">
                  <div className="about-two__experience-count-box">
                    <h3>
                      <CountUp
                        end={section.experienceCount}
                        duration={section.experienceDuration}
                      />
                    </h3>
                    <span>{section.experienceSuffix}</span>
                  </div>
                  <p className="about-two__experience-text">
                    <MultiLine text={section.experienceLabel} />
                  </p>
                </div>
                <div className="about-two__call-box">
                  <div className="about-two__call-icon">
                    <span className={section.callIcon} />
                  </div>
                  <div className="about-two__call-content">
                    <span>{section.callLabel}</span>
                    <p>
                      <Link href={section.callUrl || "#"}>
                        {section.callNumber}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="about-two__btn-box">
                  <FancyButton variant="explore" href={section.ctaUrl || "#"}>
                    {section.ctaLabel}
                  </FancyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
