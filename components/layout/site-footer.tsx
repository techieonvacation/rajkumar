import Image from "next/image";
import Link from "next/link";
import { FancyButton } from "@/components/ui/fancy-button";
import { Reveal } from "@/components/home/template/reveal";
import { NewsletterForm } from "@/components/home/template/newsletter-form";
import {
  RESOURCE_LINKS,
  SITE_PROFILE,
  USEFUL_LINKS,
} from "@/lib/site-profile";

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: "tg-icon-facebook" },
  { label: "Dribbble", href: "https://dribbble.com", icon: "tg-icon-dribble" },
  { label: "LinkedIn", href: SITE_PROFILE.linkedin, icon: "tg-icon-linkedin" },
];

export function SiteFooter() {
  return (
    <footer className="tg-section site-footer">
      <div className="site-footer__shape-1">
        <Image
          src="/template/shapes/site-footer-shape-1.png"
          alt=""
          width={240}
          height={635}
        />
      </div>
      <div className="site-footer__shape-2">
        <Image
          src="/template/shapes/site-footer-shape-2.png"
          alt=""
          width={265}
          height={635}
        />
      </div>
      <div className="site-footer__shape-3" />
      <div className="site-footer__shape-4" />
      <div className="site-footer__shape-5" />

      <div className="site-footer__top">
        <div className="site-footer__top-bg">
          <Image
            src="/template/backgrounds/site-footer-top-bg.jpg"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="tg-container">
          <div className="site-footer__top-inner">
            <div className="site-footer__logo">
              <Link href="/" aria-label={`${SITE_PROFILE.name} — Home`}>
                <span className="font-heading text-[32px] font-bold uppercase leading-none tracking-tight">
                  <span className="text-foreground">Rajesh</span>
                  <span className="text-primary">Kumar</span>
                </span>
              </Link>
            </div>
            <div className="site-footer__top-text-box">
              <p className="site-footer__top-text">
                India–China business consulting <br />
                that turns strategy into outcomes
              </p>
            </div>
            <div className="site-footer__btn-box">
              <FancyButton
                variant="explore"
                size="lg"
                href="/contact"
                className="px-10 py-4"
              >
                Get In Touch
              </FancyButton>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__main-content-box">
        <div className="tg-container">
          <div className="tg-row">
            <Reveal
              className="tg-col-xl-3 tg-col-lg-6 tg-col-md-6"
              animation="fade-in-up"
              delay="100ms"
            >
              <div className="footer-widget__contact">
                <ul className="footer-widget__contact-list">
                  <li>
                    <div className="icon-box">
                      <span className="tg-icon-pin" />
                      <p>Location</p>
                    </div>
                    <div className="text">
                      <p>{SITE_PROFILE.location}</p>
                    </div>
                  </li>
                  <li>
                    <div className="icon-box">
                      <span className="tg-icon-clock" />
                      <p>Working Time</p>
                    </div>
                    <div className="text">
                      <p>
                        Monday – Saturday (Sun – Closed) <br />
                        10:00 AM – 7:00 PM IST
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="icon-box">
                      <span className="tg-icon-contact" />
                      <p>Contact Us</p>
                    </div>
                    <div className="text">
                      <p>
                        <Link
                          href={`mailto:${SITE_PROFILE.email}`}
                          className="mail-box"
                        >
                          {SITE_PROFILE.email}
                        </Link>
                        <Link
                          href={SITE_PROFILE.phoneHref}
                          className="call-number"
                        >
                          {SITE_PROFILE.phone}
                        </Link>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal
              className="tg-col-xl-2 tg-col-lg-6 tg-col-md-6"
              animation="fade-in-up"
              delay="200ms"
            >
              <div className="footer-widget__quick-links">
                <h4 className="footer-widget__title">Pages</h4>
                <ul className="footer-widget__quick-links-list">
                  {USEFUL_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal
              className="tg-col-xl-3 tg-col-lg-6 tg-col-md-6"
              animation="fade-in-up"
              delay="300ms"
            >
              <div className="footer-widget__support">
                <h4 className="footer-widget__title">Support</h4>
                <ul className="footer-widget__quick-links-list">
                  {RESOURCE_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal
              className="tg-col-xl-4 tg-col-lg-6 tg-col-md-6"
              animation="fade-in-up"
              delay="400ms"
            >
              <div className="footer-widget__newsletter">
                <h4 className="footer-widget__title">Newsletter</h4>
                <div className="footer-widget__newsletter-box">
                  <p className="footer-widget__newsletter-text">
                    Get India–China market notes and advisory insights straight
                    to your inbox.
                  </p>
                  <NewsletterForm />
                  <div className="site-footer__social-box">
                    <h4 className="site-footer__social-title">Follow Us:</h4>
                    <div className="site-footer__social-box-inner">
                      {SOCIALS.map((social) => (
                        <Link
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                        >
                          <span className={social.icon} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="tg-container">
          <div className="tg-row">
            <div className="tg-col-xl-12">
              <div className="site-footer__bottom-inner">
                <div className="site-footer__copyright">
                  <p className="site-footer__copyright-text">
                    ⓒ Copyright {new Date().getFullYear()}{" "}
                    <Link href="/">{SITE_PROFILE.name}</Link> All rights
                    reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
