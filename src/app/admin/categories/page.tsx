import { AdminShell } from "@/components/admin/AdminShell";
import { ResourceManager } from "@/components/admin/ResourceManager";

export default function AdminCategoriesPage() {
  return (
    <AdminShell>
      <ResourceManager
        title="Category Management"
        description="Create and manage MIBA award categories used by nominations and nominees."
        endpoint="/api/categories"
        columns={["name", "description"]}
        fields={[
          { name: "name", label: "Category name", required: true },
          { name: "description", label: "Description", type: "textarea", required: true }
        ]}
      />
    </AdminShell>
  );
}
