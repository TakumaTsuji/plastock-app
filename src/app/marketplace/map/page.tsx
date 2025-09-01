"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { 
  SidebarInset, 
  SidebarProvider, 
  SidebarTrigger 
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapInventoryViewer } from "@/components/map-inventory-viewer"
import { Search, Filter, MapPin, Navigation } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export default function MarketplaceMapPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [materialFilter, setMaterialFilter] = useState("all")
  const [radiusFilter, setRadiusFilter] = useState("all")

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  ダッシュボード
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/marketplace/search">
                  マーケットプレイス
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>マップ検索</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white">マップ検索</h1>
            <p className="text-muted-foreground">
              地図上で近くの在庫資材を検索・確認できます
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="border-gray-700 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="材質、グレード、エリアで検索..."
                      className="pl-10 bg-input border-gray-600"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Filter className="mr-2 h-4 w-4" />
                        材質
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card border-gray-700">
                      <DropdownMenuLabel>材質でフィルタ</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setMaterialFilter("all")}>
                        すべて
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setMaterialFilter("ABS")}>
                        ABS
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setMaterialFilter("PP")}>
                        PP
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setMaterialFilter("PE")}>
                        PE
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setMaterialFilter("PC")}>
                        PC
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                        <Navigation className="mr-2 h-4 w-4" />
                        検索範囲
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card border-gray-700">
                      <DropdownMenuItem onClick={() => setRadiusFilter("all")}>
                        全国
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRadiusFilter("10")}>
                        10km以内
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRadiusFilter("50")}>
                        50km以内
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setRadiusFilter("100")}>
                        100km以内
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <MapPin className="mr-2 h-4 w-4" />
                    現在地から検索
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Container */}
          <Card className="border-gray-700 bg-card/50 backdrop-blur flex-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white">
                  <MapPin className="h-5 w-5" />
                  在庫マップ
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                    32件表示中
                  </Badge>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    フィルタリセット
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <MapInventoryViewer 
                searchTerm={searchTerm}
                materialFilter={materialFilter}
                radiusFilter={radiusFilter}
              />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}