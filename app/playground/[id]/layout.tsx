import { SidebarProvider } from "@/components/ui/sidebar";

export default function PlayGroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
