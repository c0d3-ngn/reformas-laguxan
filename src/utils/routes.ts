export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  PROJECTS: "/projects",
  CONTACT: "/contact",
  LEGAL: "/legal",
  PRIVACY: "/privacy",
} as const

export type Route = (typeof ROUTES)[keyof typeof ROUTES]
