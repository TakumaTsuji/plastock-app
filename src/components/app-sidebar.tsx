"use client"

import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  HelpCircle,
  User,
  Bell,
  LogOut,
  Map
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "ダッシュボード",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "在庫管理",
    url: "/inventory",
    icon: Package,
  },
  {
    title: "マーケットプレイス",
    url: "/marketplace/search",
    icon: ShoppingCart,
  },
  {
    title: "マップ検索",
    url: "/marketplace/map",
    icon: Map,
  },
  {
    title: "設定",
    url: "/settings",
    icon: Settings,
  },
]

const bottomItems = [
  {
    title: "ヘルプ",
    url: "/help",
    icon: HelpCircle,
  },
  {
    title: "プロフィール",
    url: "/profile",
    icon: User,
  },
  {
    title: "通知",
    url: "/notifications",
    icon: Bell,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-background">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">PLASTOCK</span>
            <span className="truncate text-xs text-muted-foreground">樹脂在庫管理</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>メイン</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>その他</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut className="h-4 w-4" />
              <span>ログアウト</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}