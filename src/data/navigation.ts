import { Briefcase, FolderOpen, Home, Info, Phone } from "@lucide/astro"
import { ROUTES } from "@utils/routes"

export const navLinks = [
  { textKey: "nav.home", href: ROUTES.HOME, icon: Home },
  { textKey: "nav.about", href: ROUTES.ABOUT, icon: Info },
  { textKey: "nav.services", href: ROUTES.SERVICES, icon: Briefcase },
  { textKey: "nav.projects", href: ROUTES.PROJECTS, icon: FolderOpen },
  { textKey: "nav.contact", href: ROUTES.CONTACT, icon: Phone },
] as const
