import { redirect } from "next/navigation";

export default async function RootPage() {
  // Redirect directly to dashboard - no authentication required
  redirect("/dashboard");
}
