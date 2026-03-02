import { reader } from "../reader";
import Header from "./Header";

export default async function HeaderWrapper() {
  const settings = await reader.singletons.settings.read();
      const defaultNavigation = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Projects", href: "/project" },
        { name: "Blogs", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ];
  const defaultCTA = { text: "Contact Us", href: "/contact" };
  
  if (!settings) {
    // Fallback to default values if settings not found
    return (
      <Header
        siteName="Forest4Life"
        logo="/images/partners/toyota/logo.jpg"
        navigation={defaultNavigation}
        primaryCTA={defaultCTA}
      />
    );
  }

  return (
    <Header
      siteName={settings.siteName || "Forest4Life"}
      logo={settings.logo || "/images/partners/toyota/logo.jpg"}
      navigation={defaultNavigation}
      primaryCTA={defaultCTA}
    />
  );
}

