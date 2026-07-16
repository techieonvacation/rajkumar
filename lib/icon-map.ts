import {
  Award,
  Globe,
  Users,
  TrendingUp,
  Building2,
  Languages,
  Briefcase,
  Star,
  BadgeCheck,
  Handshake,
  Target,
  Trophy,
  MapPin,
  Rocket,
  Sparkles,
  LineChart,
  type LucideIcon,
} from "lucide-react";

export const STAT_ICONS: Record<string, LucideIcon> = {
  award: Award,
  globe: Globe,
  users: Users,
  trending: TrendingUp,
  "trending-up": TrendingUp,
  building: Building2,
  building2: Building2,
  languages: Languages,
  briefcase: Briefcase,
  star: Star,
  badge: BadgeCheck,
  "badge-check": BadgeCheck,
  handshake: Handshake,
  target: Target,
  trophy: Trophy,
  "map-pin": MapPin,
  location: MapPin,
  rocket: Rocket,
  sparkles: Sparkles,
  chart: LineChart,
  "line-chart": LineChart,
};

export const STAT_ICON_OPTIONS = Object.keys(STAT_ICONS);

export function getStatIcon(name?: string): LucideIcon {
  if (!name) return Sparkles;
  return STAT_ICONS[name.toLowerCase().trim()] ?? Sparkles;
}
