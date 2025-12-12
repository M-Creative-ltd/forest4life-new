import { reader } from "../reader";
import Footer from "./Footer";

export default async function FooterWrapper() {
  const settings = await reader.singletons.settings.read();
  
  // Fetch all active partners
  const allPartners = await reader.collections.partners.all();
  const activePartners = allPartners
    .filter(partnerEntry => partnerEntry.entry.is_active !== false)
    .map(partnerEntry => ({
      name: partnerEntry.entry.name,
      logo: partnerEntry.entry.logo || null,
      website: partnerEntry.entry.website || null,
    }))
    .slice(0, 6); // Limit to 6 partners for display
  
  if (!settings) {
    // Fallback to default values if settings not found
    return (
      <Footer
        organizationName="Forest4Life"
        description="The Forest4Life Project is dedicated to restoring degraded land in Rwanda through reforestation, agroforestry, and sustainable land management practices."
        logo="/images/partners/toyota/logo.jpg"
        tags={["Reforestation", "Community Training", "Youth Education"]}
        contact={{
          address: "Kigali, Rwanda",
          phone: "+250 XXX XXX XXX",
          email: "info@forest4life.org",
        }}
        socialLinks={[]}
        copyright="© 2024 Forest4Life. All rights reserved."
        tagline="Built with 💚 for a sustainable future"
        partners={activePartners}
      />
    );
  }

  return (
    <Footer
      organizationName={settings.footer?.organizationName || "Forest4Life"}
      description={settings.footer?.description || ""}
      logo={settings.logo || "/images/partners/toyota/logo.jpg"}
      tags={settings.footer?.tags || []}
      contact={settings.footer?.contact}
      socialLinks={settings.footer?.socialLinks}
      copyright={settings.footer?.copyright || "© 2024 Forest4Life. All rights reserved."}
      tagline={settings.footer?.tagline || "Built with 💚 for a sustainable future"}
      partners={activePartners}
    />
  );
}


