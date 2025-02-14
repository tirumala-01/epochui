
import {
  Search,
  ChartLine,
  ChevronRightIcon,
  Container,
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
  SidebarInput,
  SidebarHeader,
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
        title: "Vehicle highlights",
        url: "/vehicle-highlights",
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
        title: "Cost",
        url: "/cost",
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
      <SidebarHeader >
        <SidebarGroup className="py-0 group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <form className="relative">
              <SidebarInput
                id="search"
                placeholder="Shipment or Vehicle"
                className="pl-8"
              />
              <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </form>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup >
        <SidebarMenu>
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
                          <SidebarMenuSubButton asChild>
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

        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}
