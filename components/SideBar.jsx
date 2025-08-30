"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { SideBarOptions } from "@/services/Constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar() {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center mt-5">
        <Image
          src="/logo1.png"
          className="w-[75%] h-16"
          alt="MockMate Logo"
          width={90}
          height={90}
        />

        <Button
          className="w-full mt-3 lg:mt-5 cursor-pointer"
          onClick={() => {
            router.push("/dashboard/create-interview");
          }}
        >
          <Plus /> Create New Interview
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={`p-5 ${
                      pathName == option.path && "bg-blue-100"
                    }`}
                  >
                    <Link href={option.path}>
                      <option.icon
                        className={`${
                          pathName == option.path && "text-primary"
                        }`}
                      />
                      <span
                        className={`p-5 text-[16px] font-medium ${
                          pathName == option.path && "text-primary"
                        }`}
                      >
                        {option.name}{" "}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
