import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
  head: () => ({
    meta: [
      { title: "Platerea — Launch your business faster" },
      {
        name: "description",
        content: "Platerea: dashboard, AI tools, website builder, analytics and payments for your business.",
      },
      { property: "og:title", content: "Platerea — Launch your business faster" },
      {
        property: "og:description",
        content: "All-in-one business workspace for hotels, restaurants and shops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
