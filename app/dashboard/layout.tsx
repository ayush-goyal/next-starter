import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SignInRedirectHandler } from "@/components/auth/SignInRedirectHandler";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <SignInRedirectHandler />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <div className="flex h-screen w-full flex-col px-4 py-4">{children}</div>
    </SidebarProvider>
  );
}
