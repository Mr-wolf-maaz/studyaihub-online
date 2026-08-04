import { notFound } from "next/navigation";

export default function Page() {
  // Return a 404 for the /templates route to remove the page from the site
  notFound();
}
