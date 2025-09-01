interface DropdownItem {
  name: string
  link: string
  image: string
  description?: string
}

interface DropdownCategory {
  title: string
  description: string
  items: DropdownItem[]
}

export interface NavItem {
  name: string
  link?: string
  hasDropdown?: boolean
  dropdownCategory?: DropdownCategory
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Our projects",
    link: "/about",
    hasDropdown: true,
    dropdownCategory: {
      title: "Our Services",
      description: "Explore our range of professional services",
      items: [
        {
          name: "Mining",
          link: "/mining",
          image: "https://images.pexels.com/photos/46801/coal-briquette-black-46801.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Custom websites and web applications",
        },
        {
          name: "Agriculture",
          link: "/agriculture",
          image: "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "User-centered design solutions",
        },
        {
          name: "Oil & Gas",
          link: "/oil-and-gas",
          image: "https://images.pexels.com/photos/3216911/pexels-photo-3216911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description: "Grow your online presence",
        },
        {
          name: "Philanthropy",
          link: "/philanthropy",
          image: "https://images.pexels.com/photos/6646862/pexels-photo-6646862.jpeg?auto=compress&cs=tinysrgb&w=600",
          description: "Expert advice for your business",
        },
      ],
    },
  },
  {
    name: "Bsp Annual Report",
    link: "/career",
  },
  {
    name: "Events",
    link: "/blog",
  },
  {
    name: "Contact",
    link: "/contact",
  },
]
