import { Bath, BrickWall, Building2, House, PaintBucket, Ruler } from "@lucide/astro"
import { ROUTES } from "@utils/routes"

export const services = [
  { id: 1, icon: House },
  { id: 2, icon: Building2 },
  { id: 3, icon: Bath },
  { id: 4, icon: BrickWall },
  { id: 5, icon: PaintBucket },
  { id: 6, icon: Ruler },
] as const

export const footerServices = [
  { id: 1, href: ROUTES.SERVICES },
  { id: 2, href: ROUTES.SERVICES },
  { id: 3, href: ROUTES.SERVICES },
  { id: 4, href: ROUTES.SERVICES },
] as const
