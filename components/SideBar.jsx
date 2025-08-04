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
        <div className="flex justify-center w-[150px] gap-3 items-center">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100 font-semibold text-gray-900 text-2xl mb-2">
            PrepWise
          </h2>
        </div>
        <Button
          className="w-full cursor-pointer"
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
