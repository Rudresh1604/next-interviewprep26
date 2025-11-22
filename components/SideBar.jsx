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
import { LogOut, Plus } from "lucide-react";
import { SideBarOptions } from "@/services/Constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export function AppSidebar() {
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        return;
      }
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
                        {option.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem className="p-1">
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="p-5 cursor-pointer hover:bg-red-50 text-red-600 flex items-center gap-3"
                >
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="text-[16px] font-medium text-red-600 whitespace-nowrap">
                    Logout
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
