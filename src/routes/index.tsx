import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import type { Property } from "@/components/sections/PropertiesSection";

const PROPERTIES_URL =
  "https://functions.poehali.dev/c641307d-2265-431f-a094-af55a85709de?limit=100&is_active=true";

export const Route = createFileRoute("/")({
  loader: async (): Promise<{ properties: Property[] | null }> => {
    try {
      const response = await fetch(PROPERTIES_URL);
      if (!response.ok) return { properties: null };
      const data = (await response.json()) as { properties?: Property[] };
      return { properties: data.properties || [] };
    } catch {
      return { properties: null };
    }
  },
  component: Index,
});
