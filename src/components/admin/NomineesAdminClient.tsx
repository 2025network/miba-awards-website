"use client";

import { useEffect, useState } from "react";
import { ResourceManager } from "@/components/admin/ResourceManager";

type Category = { id: string; name: string };

export function NomineesAdminClient() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.ok ? response.json() : [])
      .then((data: Category[]) => setCategories(data));
  }, []);

  return (
    <ResourceManager
      title="Nominee Management"
      description="Create nominee profiles, assign categories, set review status, and prepare public profile pages."
      endpoint="/api/nominees"
      columns={["fullName", "state", "status", "organization"]}
      fields={[
        { name: "fullName", label: "Full name", required: true },
        { name: "categoryId", label: "Category", type: "select", options: categories, required: true },
        { name: "state", label: "State", required: true },
        { name: "organization", label: "Organization" },
        { name: "photo", label: "Photo URL" },
        { name: "status", label: "Status", type: "select", required: true, options: [
          { id: "PENDING", name: "PENDING" },
          { id: "APPROVED", name: "APPROVED" },
          { id: "REJECTED", name: "REJECTED" }
        ] },
        { name: "biography", label: "Biography", type: "textarea", required: true }
      ]}
    />
  );
}
