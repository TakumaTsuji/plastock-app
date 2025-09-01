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
import { Search, Filter, MapPin, Calendar, Building2, ShoppingCart, Heart } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

// マーケットプレイスのサンプルデータ（他社が出品している公開在庫）
const marketplaceData = [
  {
    id: 1,
    material: "ABS",
    grade: "高耐衝撃",
    shape: "ペレット",
    quantity: 500,
    unit: "kg",
    price: 180000,
    pricePerUnit: 360,
    supplier: "東京樹脂工業",
    location: "東京都",
    postedDate: "2024-12-25",
    description: "自動車部品製造で使用していた高品質なABS樹脂です。未使用品で保管状態良好。",
    isUrgent: false,
  },
  {
    id: 2,
    material: "PP",
    grade: "食品グレード",
    shape: "ペレット",
    quantity: 300,
    unit: "kg",
    price: 95000,
    pricePerUnit: 317,
    supplier: "関西プラスチック",
    location: "大阪府",
    postedDate: "2024-12-24",
    description: "食品包装用途で購入した高純度ポリプロピレンの余剰分です。",
    isUrgent: true,
  },
  {
    id: 3,
    material: "PE",
    grade: "透明",
    shape: "シート",
    quantity: 800,
    unit: "m²",
    price: 240000,
    pricePerUnit: 300,
    supplier: "北陸化学",
    location: "富山県",
    postedDate: "2024-12-23",
    description: "包装用透明シートの在庫処分。厚み0.1mm、幅1.2m。",
    isUrgent: false,
  },
  {
    id: 4,
    material: "PC",
    grade: "光学グレード",
    shape: "ペレット",
    quantity: 150,
    unit: "kg",
    price: 225000,
    pricePerUnit: 1500,
    supplier: "精密樹脂",
    location: "神奈川県",
    postedDate: "2024-12-22",
    description: "光学部品製造用ポリカーボネート。高透明、低複屈折。",
    isUrgent: false,
  },
  {
    id: 5,
    material: "PA66",
    grade: "ガラス繊維強化30%",
    shape: "ペレット",
    quantity: 200,
    unit: "kg",
    price: 160000,
    pricePerUnit: 800,
    supplier: "エンジニアリング樹脂",
    location: "愛知県",
    postedDate: "2024-12-21",
    description: "自動車エンジン周辺部品用の高強度ナイロン66。耐熱性に優れます。",
    isUrgent: true,
  },
]

export default function MarketplaceSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [materialFilter, setMaterialFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  let filteredData = marketplaceData.filter(item => {
    const matchesSearch = item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesMaterial = materialFilter === "all" || item.material === materialFilter
    
    return matchesSearch && matchesMaterial
  })

  // ソート
  filteredData = filteredData.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      case "price_low":
        return a.pricePerUnit - b.pricePerUnit
      case "price_high":
        return b.pricePerUnit - a.pricePerUnit
      case "quantity":
        return b.quantity - a.quantity
      default:
        return 0
    }
  })

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
              <BreadcrumbItem>
                <BreadcrumbPage>マーケットプレイス</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold">マーケットプレイス</h1>
            <p className="text-muted-foreground">
              他社が出品している樹脂材料を検索・購入できます
            </p>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="材質、グレード、出品者で検索..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        材質
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
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
                      <DropdownMenuItem onClick={() => setMaterialFilter("PA66")}>
                        PA66
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        並び順
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("newest")}>
                        新着順
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price_low")}>
                        価格安い順
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("price_high")}>
                        価格高い順
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("quantity")}>
                        数量多い順
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {filteredData.length}件の商品が見つかりました
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredData.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">
                          {item.material} - {item.grade}
                        </CardTitle>
                        {item.isUrgent && (
                          <Badge variant="destructive" className="text-xs">
                            緊急売却
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Building2 className="h-3 w-3" />
                        {item.supplier}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-muted-foreground">形状:</span>
                          <span className="ml-1 font-medium">{item.shape}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{item.postedDate}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">
                          ¥{item.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity.toLocaleString()}{item.unit} 
                          <span className="ml-2">
                            (¥{item.pricePerUnit.toLocaleString()}/{item.unit})
                          </span>
                        </div>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        購入する
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredData.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-muted-foreground text-center">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">検索結果が見つかりませんでした</h3>
                  <p>検索条件を変更して再度お試しください</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}