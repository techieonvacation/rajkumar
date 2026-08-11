export const ABOUT_POINTS = [
  ["Customized Solutions for", "Every Business"],
  ["Enhanced Security and Data", "Protection"],
  ["Scalable Infrastructure for", "Growth"],
  ["Continuous system", "monitoring and expert", "support"],
] as const;

export const ABOUT_CLIENT_IMAGES = [
  "/template/resources/about-two-client-img-1-1.jpg",
  "/template/resources/about-two-client-img-1-2.jpg",
  "/template/resources/about-two-client-img-1-3.jpg",
] as const;

export const SERVICES = [
  {
    title: ["Software Development", "Solutions"],
    href: "/services",
    image: "/template/services/services-2-1.jpg",
    features: [
      ["UI/UX Design", "Mobile Application"],
      ["Mobile Application", "Research"],
      ["Research", "UI/UX Design"],
    ],
  },
  {
    title: ["Cybersecurity Risk", "Management"],
    href: "/services",
    image: "/template/services/services-2-2.jpg",
    features: [
      ["Security", "Performance"],
      ["Scalability", "Reliability"],
      ["Innovation", "Efficiency"],
    ],
  },
  {
    title: ["Cloud Solutions", "Provider"],
    href: "/services",
    image: "/template/services/services-2-3.jpg",
    features: [
      ["Cloud Security", "Cloud Scalability"],
      ["Cloud Integration", "Cloud Performance"],
      ["Cloud Backup", "Cloud Optimization"],
    ],
  },
  {
    title: ["Data Analytics", "Consulting"],
    href: "/services",
    image: "/template/services/services-2-4.jpg",
    features: [
      ["Data Insights", "Predictive Analytics"],
      ["Big Data", "Business Intelligence"],
      ["Data Visualization", "Data Strategy"],
    ],
  },
] as const;

export const WHY_CHOOSE_SKILLS = [
  { title: "Camping Launches", percent: 86 },
  { title: "Innovation Design", percent: 76 },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Research & Discovery",
    text: [
      "We begin by understanding your needs,",
      "goals, and vision. Through brainstorming",
      "sessions and strategic planning.",
    ],
  },
  {
    title: "Design and Development",
    text: [
      "Once the strategy is in place, we move to",
      "designing and developing your vision. Our",
      "team collaborates closely to bring your ideas",
      "to life.",
    ],
  },
  {
    title: "Testing and Launch",
    text: [
      "Before going live, we rigorously test to",
      "ensure optimal functionality. After thorough",
      "quality checks, we launch your project.",
    ],
  },
] as const;

export const PORTFOLIO_ITEMS = [
  {
    title: ["Innovative Solutions,", "Powerful Results"],
    image: "/template/project/portfolio-2-1.jpg",
    href: "/portfolio",
  },
  {
    title: ["Transforming Ideas Into", "Digital Excellence"],
    image: "/template/project/portfolio-2-2.jpg",
    href: "/portfolio",
  },
  {
    title: ["Driving Success Through", "Technology"],
    image: "/template/project/portfolio-2-3.jpg",
    href: "/portfolio",
  },
  {
    title: ["Empowering Businesses", "with Cutting-Edge IT"],
    image: "/template/project/portfolio-2-4.jpg",
    href: "/portfolio",
  },
] as const;

export const PORTFOLIO_TEXT =
  "Explore How We've Empowered Businesses with Innovative Tech Solutions";

export const PORTFOLIO_SLIDE_COUNT = 3;

export const CONTACT_DETAILS = [
  {
    icon: "tg-icon-mail",
    label: "Email Us",
    value: "info@domain.com",
    href: "mailto:info@domain.com",
  },
  {
    icon: "tg-icon-phone-call",
    label: "Contact US",
    value: "+99 (00) 567 780",
    href: "tel:9900567780",
  },
  {
    icon: "tg-icon-pin",
    label: "Our Address",
    value: "1629 N. Dixie Avenue, Kentucky, 42701",
    href: null,
  },
] as const;
