import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavHeader } from "@/components/nav-header";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Logistics Analytics",
  description: "Scalable Logistics Analytics Platform",
};

export default async function RootLayout({ children }) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider
          defaultOpen={defaultOpen}
          className="flex flex-col pt-(--header-height) [--header-height:calc(--spacing(14))]"
        >
          <header className="bg-background fixed inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1.5" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <NavHeader />
            </div>
          </header>
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </div>
          </SidebarProvider>
      </body>
    </html>
  );
}
