export const SITE_PROFILE = {
  name: "Rajesh Kumar",
  chineseTitle: "中國通",
  role: "India–China Business Consultant",
  credentialLine:
    "CITIC-CLSA Alum · JNU · HSK 5 (C1) · Govt. of India Youth Delegate to China, 2014",
  shortBio:
    "Thirteen years of cross-functional leadership across India and China — turning language fluency, compliance rigour and operational discipline into measurable commercial outcomes.",
  email: "rk.hify@gmail.com",
  phone: "+91 98110 00000",
  phoneHref: "tel:+919811000000",
  whatsapp: "https://wa.me/919811000000",
  location: "New Delhi, India",
  availability: "Available for engagements",
  linkedin: "https://www.linkedin.com/in/rajesh-kumar-656455141",
} as const;

export const SITE_SOCIALS = [
  { label: "LinkedIn", href: SITE_PROFILE.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${SITE_PROFILE.email}`, icon: "mail" },
  { label: "WhatsApp", href: SITE_PROFILE.whatsapp, icon: "message-circle" },
  { label: "WeChat", href: "/contact", icon: "qr" },
] as const;

export const USEFUL_LINKS = [
  { label: "About Me", href: "/about" },
  { label: "Consulting Services", href: "/services" },
  { label: "Career & Experience", href: "/experience" },
  { label: "Insights & Notes", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const RESOURCE_LINKS = [
  { label: "China Market Entry", href: "/services#market-entry" },
  { label: "Compliance & Risk", href: "/services#compliance" },
  { label: "Business Interpretation", href: "/services#interpretation" },
  { label: "Mandarin Training", href: "/services#language" },
  { label: "FAQ", href: "/faq" },
] as const;
