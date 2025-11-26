import {
  TrendingUp,
  Users,
  Clock,
  Shield,
  ArrowDown,
  ArrowUpRight,
  Calculator,
  Phone,
  ArrowRight,
  Play,
  Activity,
  Zap,
  Flame,
  Building,
  Leaf,
  Globe,
} from 'lucide-react'

const iconMap = {
  TrendingUp,
  Users,
  Clock,
  Shield,
  ArrowDown,
  ArrowUpRight,
  Calculator,
  Phone,
  ArrowRight,
  Play,
  Activity,
  Zap,
  Flame,
  Building,
  Leaf,
  Globe,
}

export const getIconComponent = (iconName, fallback = ArrowRight) => {
  if (!iconName) return fallback
  return iconMap[iconName] || fallback
}

export default iconMap

