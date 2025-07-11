import { ProjectPermissions } from "./enums"

export const ActiveMenuItems = [
  {
    id: "Home",
    navLink: "/home",
    icon: `<i class="fa-solid fa-house fa-lg"></i>`,
    permissions: ProjectPermissions.NONE
  },
    {
    id: "Data sources",
    navLink: "/data-sources",
    icon: `<i class="fa-solid fa-magnifying-glass-chart fa-lg"></i>`,
    permissions: ProjectPermissions.NONE
  },
]

export const DisabledMenuItems = [
  {
    id: "Disabled item",
    navLink: "/model-analysis",
    icon: `<i class="fa-solid fa-magnifying-glass fa-lg"></i>`
  },
]
