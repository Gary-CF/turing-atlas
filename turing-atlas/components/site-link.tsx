import type { ComponentProps } from "react";
import Link from "next/link";
import { documentNavigation } from "@/lib/navigation";

export default function SiteLink(props: ComponentProps<"a"> & { href: string }) {
  return documentNavigation ? <a {...props} /> : <Link {...props} />;
}
