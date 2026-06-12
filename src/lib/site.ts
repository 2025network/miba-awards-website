export const siteConfig = {
  name: "MIBA Awards",
  fullName: "Middle Belt Impact Awards",
  tagline: "Celebrating Excellence From The Heart Of Africa",
  description:
    "Recognizing leaders, innovators, creators, entrepreneurs, and changemakers shaping the future of the Middle Belt and Africa.",
  mainNavItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Categories", href: "/categories" },
    { label: "Nominate", href: "/nominate" },
    { label: "Vote", href: "/vote" }
  ],
  moreNavItems: [
    { label: "Hall of Fame", href: "/hall-of-fame" },
    { label: "Judges", href: "/judges" },
    { label: "News", href: "/news" },
    { label: "Ceremony", href: "/ceremony" },
    { label: "Winners", href: "/winners" },
    { label: "Sponsors", href: "/sponsors" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" }
  ],
  get navItems() {
    return [...this.mainNavItems, ...this.moreNavItems];
  }
};
