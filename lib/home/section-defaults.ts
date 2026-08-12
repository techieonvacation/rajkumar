export type AboutSectionDefaults = {
  tagline: string;
  title: string;
  text: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  shapeImage: string;
  clientsUrl: string;
  clientsCount: number;
  clientsCountSuffix: string;
  clientsCountDuration: number;
  clientsLabel: string;
  pointsPerColumn: number;
  pointIcon: string;
  experienceCount: number;
  experienceDuration: number;
  experienceSuffix: string;
  experienceLabel: string;
  callIcon: string;
  callLabel: string;
  callNumber: string;
  callUrl: string;
  ctaLabel: string;
  ctaUrl: string;
  published: boolean;
}

export type AboutPointDefaults = {
  text: string;
  order: number;
  published: boolean;
}

export type AboutClientDefaults = {
  image: string;
  alt: string;
  order: number;
  published: boolean;
}

export type CounterSectionDefaults = {
  tagline: string;
  title: string;
  align: string;
  bgShape: string;
  published: boolean;
}

export type CounterItemDefaults = {
  icon: string;
  value: number;
  duration: number;
  suffix: string;
  label: string;
  animation: string;
  delay: string;
  order: number;
  published: boolean;
}

export type ServicesSectionDefaults = {
  tagline: string;
  title: string;
  titleImage: string;
  circleText: string;
  circleRadius: number;
  circleUrl: string;
  circleIcon: string;
  published: boolean;
}

export type ServiceCardDefaults = {
  title: string;
  url: string;
  image: string;
  features: string[];
  order: number;
  published: boolean;
}

export type WorksSectionDefaults = {
  bigText: string;
  tagline: string;
  title: string;
  circleText: string;
  circleRadius: number;
  circleUrl: string;
  circleIcon: string;
  shape1: string;
  shape2: string;
  autoplayDelay: number;
  loop: boolean;
  spaceBetween: number;
  slidesMobile: number;
  slidesTablet: number;
  slidesDesktop: number;
  slidesWide: number;
  lightbox: boolean;
  published: boolean;
}

export type WorkItemDefaults = {
  image: string;
  title: string;
  text: string;
  year: string;
  url: string;
  tags: string[];
  order: number;
  published: boolean;
}

export type WhyChooseSectionDefaults = {
  tagline: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaUrl: string;
  clientImage: string;
  clientName: string;
  clientRole: string;
  image: string;
  imageAlt: string;
  shape1: string;
  shape2: string;
  shape3: string;
  published: boolean;
}

export type WhyChooseSkillDefaults = {
  title: string;
  percent: number;
  order: number;
  published: boolean;
}

export type ProcessSectionDefaults = {
  tagline: string;
  title: string;
  align: string;
  bgImage: string;
  shape1: string;
  shape2: string;
  shapeStepIndex: number;
  published: boolean;
}

export type ProcessStepDefaults = {
  title: string;
  text: string;
  order: number;
  published: boolean;
}

export const ABOUT_SECTION_DEFAULTS: AboutSectionDefaults = {
  tagline: "About Us",
  title:
    "Unlock Your Business [Potential]\n[with Our best Cutting-Edge] IT\n Solutions to grow",
  text: "Transform your business with our innovative IT solutions, tailored to address your unique challenges and drive growth in today's digital landscape.",
  image1: "/template/resources/about-two-img-1.jpg",
  image1Alt: "Consulting team at work",
  image2: "/template/resources/about-two-img-2.jpg",
  image2Alt: "Client strategy session",
  shapeImage: "/template/shapes/about-two-shape-3.png",
  clientsUrl: "/about",
  clientsCount: 120,
  clientsCountSuffix: "K",
  clientsCountDuration: 2,
  clientsLabel: "Satisfied Client",
  pointsPerColumn: 2,
  pointIcon: "tg-icon-tick-inside-circle",
  experienceCount: 25,
  experienceDuration: 2,
  experienceSuffix: "+",
  experienceLabel: "Years of\n Experience",
  callIcon: "tg-icon-customer-service-headset",
  callLabel: "call us for inquiry",
  callNumber: "+00 (123) 456767",
  callUrl: "tel:00123456767",
  ctaLabel: "Learn More",
  ctaUrl: "/about",
  published: true,
};

export const ABOUT_POINT_DEFAULTS: AboutPointDefaults[] = [
  { text: "Customized Solutions for\nEvery Business", order: 0, published: true },
  { text: "Enhanced Security and Data\nProtection", order: 1, published: true },
  { text: "Scalable Infrastructure for\nGrowth", order: 2, published: true },
  {
    text: "Continuous system\nmonitoring and expert\nsupport",
    order: 3,
    published: true,
  },
];

export const ABOUT_CLIENT_DEFAULTS: AboutClientDefaults[] = [
  {
    image: "/template/resources/about-two-client-img-1-1.jpg",
    alt: "",
    order: 0,
    published: true,
  },
  {
    image: "/template/resources/about-two-client-img-1-2.jpg",
    alt: "",
    order: 1,
    published: true,
  },
  {
    image: "/template/resources/about-two-client-img-1-3.jpg",
    alt: "",
    order: 2,
    published: true,
  },
];

export const COUNTER_SECTION_DEFAULTS: CounterSectionDefaults = {
  tagline: "The Numbers Speak",
  title: "Exploring Business Growth [In IT]\n[ Consulting Solutions]",
  align: "center",
  bgShape: "/template/shapes/counter-one-bg-shape.png",
  published: true,
};

export const COUNTER_ITEM_DEFAULTS: CounterItemDefaults[] = [
  {
    icon: "tg-icon-trophy",
    value: 120,
    duration: 3,
    suffix: "+",
    label: "award Winning",
    animation: "fade-in-left",
    delay: "100ms",
    order: 0,
    published: true,
  },
  {
    icon: "tg-icon-user",
    value: 99,
    duration: 2.5,
    suffix: "%",
    label: "Satisfied client",
    animation: "fade-in-left",
    delay: "200ms",
    order: 1,
    published: true,
  },
  {
    icon: "tg-icon-chat",
    value: 10,
    duration: 2,
    suffix: "M",
    label: "worldwide reviews",
    animation: "fade-in-right",
    delay: "200ms",
    order: 2,
    published: true,
  },
  {
    icon: "tg-icon-laughing",
    value: 200,
    duration: 3,
    suffix: "+",
    label: "Happy Clients",
    animation: "fade-in-right",
    delay: "400ms",
    order: 3,
    published: true,
  },
];

export const SERVICES_SECTION_DEFAULTS: ServicesSectionDefaults = {
  tagline: "Our Services",
  title:
    "Your Business with Cutting-Edge IT\n Solutions {image}[Innovative IT Services]\n[Tailored for Your Success]",
  titleImage: "/template/services/section-title-img.jpg",
  circleText: " View All Project • View All Services •",
  circleRadius: 73.6,
  circleUrl: "/services",
  circleIcon: "/template/icon/services-two-round-icon.png",
  published: true,
};

export const SERVICE_CARD_DEFAULTS: ServiceCardDefaults[] = [
  {
    title: "Software Development\n Solutions",
    url: "/services",
    image: "/template/services/services-2-1.jpg",
    features: [
      "UI/UX Design",
      "Mobile Application",
      "Mobile Application",
      "Research",
      "Research",
      "UI/UX Design",
    ],
    order: 0,
    published: true,
  },
  {
    title: "Cybersecurity Risk\n Management",
    url: "/services",
    image: "/template/services/services-2-2.jpg",
    features: [
      "Security",
      "Performance",
      "Scalability",
      "Reliability",
      "Innovation",
      "Efficiency",
    ],
    order: 1,
    published: true,
  },
  {
    title: "Cloud Solutions\n Provider",
    url: "/services",
    image: "/template/services/services-2-3.jpg",
    features: [
      "Cloud Security",
      "Cloud Scalability",
      "Cloud Integration",
      "Cloud Performance",
      "Cloud Backup",
      "Cloud Optimization",
    ],
    order: 2,
    published: true,
  },
  {
    title: "Data Analytics\n Consulting",
    url: "/services",
    image: "/template/services/services-2-4.jpg",
    features: [
      "Data Insights",
      "Predictive Analytics",
      "Big Data",
      "Business Intelligence",
      "Data Visualization",
      "Data Strategy",
    ],
    order: 3,
    published: true,
  },
];

export const WORKS_SECTION_DEFAULTS: WorksSectionDefaults = {
  bigText: "portfolio",
  tagline: "See Our Works",
  title: "How We've [Empowered]\n[Businesses with Innovative]\nTech Solutions",
  circleText: " View All Project View All Project",
  circleRadius: 73.6,
  circleUrl: "/projects",
  circleIcon: "/template/icon/portfolio-one-round-icon.png",
  shape1: "/template/shapes/portfolio-one-shape-1.png",
  shape2: "/template/shapes/portfolio-one-shape-2.png",
  autoplayDelay: 5000,
  loop: true,
  spaceBetween: 30,
  slidesMobile: 1,
  slidesTablet: 2,
  slidesDesktop: 3,
  slidesWide: 4,
  lightbox: true,
  published: true,
};

export const WORK_ITEM_DEFAULTS: WorkItemDefaults[] = [
  {
    image: "/template/project/portfolio-1-1.jpg",
    title: "Innovative Digital Solutions for a Smarter Future",
    text: "Pioneering next-gen IT solutions that enhance efficiency and innovation.",
    year: "2025",
    url: "/projects",
    tags: ["Web Development", "Branding"],
    order: 0,
    published: true,
  },
  {
    image: "/template/project/portfolio-1-2.jpg",
    title: "Empowering Businesses with Cutting-Edge Technology",
    text: "Delivering smart, scalable, and future-proof tech solutions for growth.",
    year: "2025",
    url: "/projects",
    tags: ["UI/UX Design", "Product Design"],
    order: 1,
    published: true,
  },
  {
    image: "/template/project/portfolio-1-3.jpg",
    title: "Transforming Ideas into Scalable IT Solutions",
    text: "Turning complex challenges into streamlined, high-performance systems.",
    year: "2025",
    url: "/projects",
    tags: ["UI/UX Design", "Cyber Security"],
    order: 2,
    published: true,
  },
  {
    image: "/template/project/portfolio-1-4.jpg",
    title: "Driving Digital Excellence with Custom IT Services",
    text: "Tailor-made IT solutions designed to optimize and elevate your business.",
    year: "2025",
    url: "/projects",
    tags: ["Branding", "Product Design"],
    order: 3,
    published: true,
  },
  {
    image: "/template/project/portfolio-1-5.jpg",
    title: "Seamless Tech Innovations for Business Growth",
    text: "Bridging the gap between technology and success with seamless integration.",
    year: "2025",
    url: "/projects",
    tags: ["UI/UX Design", "Product Design"],
    order: 4,
    published: true,
  },
  {
    image: "/template/project/portfolio-1-6.jpg",
    title: "Future-Ready IT Solutions for Every Industry",
    text: "Adaptive and robust IT services built to thrive in a dynamic landscape.",
    year: "2025",
    url: "/projects",
    tags: ["UI/UX Design", "Product Design"],
    order: 5,
    published: true,
  },
];

export const WHY_CHOOSE_SECTION_DEFAULTS: WhyChooseSectionDefaults = {
  tagline: "Why Chooses Us",
  title: "Elevate Growth [with Our]\n[Cutting-Edge IT] Solutions\n for Success",
  text: "Innovating and empowering businesses with tailored solutions for success and growth. Innovating and empowering ",
  ctaLabel: "About Us",
  ctaUrl: "/about",
  clientImage: "/template/resources/why-choose-one-client-img.jpg",
  clientName: "Thomas Alison",
  clientRole: "Founder & CEO",
  image: "/template/resources/why-choose-one-img-1.png",
  imageAlt: "Why choose us",
  shape1: "/template/shapes/why-choose-one-shape-1.png",
  shape2: "/template/shapes/why-choose-one-shape-2.png",
  shape3: "/template/shapes/why-choose-one-shape-3.png",
  published: true,
};

export const WHY_CHOOSE_SKILL_DEFAULTS: WhyChooseSkillDefaults[] = [
  { title: "Camping Launches", percent: 86, order: 0, published: true },
  { title: "Innovation Design", percent: 76, order: 1, published: true },
];

export const PROCESS_SECTION_DEFAULTS: ProcessSectionDefaults = {
  tagline: "Working Process",
  title: "Our Seamless Process\n[From Concept to Creation]",
  align: "center",
  bgImage: "/template/backgrounds/process-two-bg.jpg",
  shape1: "/template/shapes/process-two-shape-1.png",
  shape2: "/template/shapes/process-two-shape-2.png",
  shapeStepIndex: 1,
  published: true,
};

export const PROCESS_STEP_DEFAULTS: ProcessStepDefaults[] = [
  {
    title: "Research & Discovery",
    text: "We begin by understanding your needs,\ngoals, and vision. Through brainstorming\nsessions and strategic planning.",
    order: 0,
    published: true,
  },
  {
    title: "Design and Development",
    text: "Once the strategy is in place, we move to\ndesigning and developing your vision. Our\nteam collaborates closely to bring your ideas\nto life.",
    order: 1,
    published: true,
  },
  {
    title: "Testing and Launch",
    text: "Before going live, we rigorously test to\nensure optimal functionality. After thorough\nquality checks, we launch your project.",
    order: 2,
    published: true,
  },
];
