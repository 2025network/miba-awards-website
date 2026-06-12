import { AdminShell } from "@/components/admin/AdminShell";
import { ResourceManager } from "@/components/admin/ResourceManager";

export default function AdminSponsorsPage() {
  return (
    <AdminShell>
      <ResourceManager
        title="Sponsor Management"
        description="Add sponsor companies, logo URLs, websites, and partner tiers."
        endpoint="/api/sponsors"
        columns={["companyName", "tier", "website"]}
        fields={[
          { name: "companyName", label: "Company name", required: true },
          { name: "tier", label: "Tier", required: true },
          { name: "website", label: "Website URL" },
          { name: "logo", label: "Logo URL" }
        ]}
      />
    </AdminShell>
  );
}
