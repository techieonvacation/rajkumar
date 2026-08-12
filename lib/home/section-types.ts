import type {
  HomeAboutClient,
  HomeAboutPoint,
  HomeAboutSection,
  HomeCounterItem,
  HomeCounterSection,
  HomeProcessSection,
  HomeProcessStep,
  HomeServiceCard,
  HomeServicesSection,
  HomeWhyChooseSection,
  HomeWhyChooseSkill,
  HomeWorkItem,
  HomeWorksSection,
} from "@prisma/client";

export interface AboutSectionData {
  section: HomeAboutSection;
  points: HomeAboutPoint[];
  clients: HomeAboutClient[];
}

export interface CounterSectionData {
  section: HomeCounterSection;
  items: HomeCounterItem[];
}

export interface ServicesSectionData {
  section: HomeServicesSection;
  cards: HomeServiceCard[];
}

export interface WorksSectionData {
  section: HomeWorksSection;
  items: HomeWorkItem[];
}

export interface WhyChooseSectionData {
  section: HomeWhyChooseSection;
  skills: HomeWhyChooseSkill[];
}

export interface ProcessSectionData {
  section: HomeProcessSection;
  steps: HomeProcessStep[];
}
