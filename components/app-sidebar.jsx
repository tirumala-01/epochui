'use client';
import { usePathname } from 'next/navigation';

import {
  Search,
  ChevronRightIcon,
  Truck,
  Compass
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroupLabel,
  SidebarInput,
  SidebarHeader,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navMenu = [
  {
    title: "Vehicle",
    url: "#",
    icon: Truck,
    isActive: true,
    items: [
      {
        title: "Fuel Efficiency",
        url: "/fuel-efficiency",
      },
      {
        title: "Total Mileage and Fuel",
        url: "/total-mileage",
      }
    ]
  },
  {
    title: "Route",
    url: "#",
    icon: Compass,
    isActive: true,
    items: [
      {
        title: "Delivery Time",
        url: "/delivery-time",
      },
      {
        title: "Shipment Cost",
        url: "/shipment-cost",
      },
      {
        title: "Expensive Routes",
        url: "/expensive-routes",
      }
    ]
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="top-(--delta) h-[calc(100svh-var(--delta))]! [--delta:calc(var(--header-height)+1px)]">
      <SidebarHeader>
        <SidebarGroup className="py-0 group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarGroupLabel>Search</SidebarGroupLabel>
            <SidebarMenuButton asChild isActive={usePathname() === '/search'}>
              <a href='/search'>
                <Search />
                <span>Shipment, Vehicle, Logs</span>
              </a>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            {navMenu.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild isActive={subItem.url === usePathname()}>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
