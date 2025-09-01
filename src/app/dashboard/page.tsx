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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Plus, Search, AlertTriangle, Package, TrendingUp, Users } from "lucide-react"
import { InventoryListWidget } from "@/components/inventory-list-widget"
import { InventoryFormModal } from "@/components/inventory-form-modal"

const materialData = [
  { name: 'ABS', value: 35, color: '#37b7c4' },
  { name: 'PP', value: 25, color: '#10b981' },
  { name: 'PE', value: 20, color: '#f59e0b' },
  { name: 'その他', value: 20, color: '#64748b' },
]

const newMarketItems = [
  { id: 1, material: "ABS", grade: "高耐衝撃", quantity: "500kg", price: "¥180,000", supplier: "東京樹脂工業" },
  { id: 2, material: "PP", grade: "食品グレード", quantity: "300kg", price: "¥95,000", supplier: "関西プラスチック" },
  { id: 3, material: "PE", grade: "透明", quantity: "800kg", price: "¥240,000", supplier: "北陸化学" },
]

export default function DashboardPage() {
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
                <BreadcrumbPage>メインダッシュボード</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Balance Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">総在庫価値</CardTitle>
                  <CardDescription>
                    Trading / Dashboard
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="px-2 py-1 bg-primary/20 text-primary rounded">1D</div>
                  <div className="px-2 py-1 bg-muted text-muted-foreground rounded">7D</div>
                  <div className="px-2 py-1 bg-muted text-muted-foreground rounded">1M</div>
                  <div className="px-2 py-1 bg-muted text-muted-foreground rounded">1Y</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <div className="text-3xl font-bold">¥22,193,050</div>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">+4.73%</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                +¥985,420 (今月)
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <InventoryFormModal mode="add">
              <Button size="lg" className="h-16 w-full">
                <Plus className="mr-2 h-5 w-5" />
                在庫を新規登録
              </Button>
            </InventoryFormModal>
            <Button size="lg" variant="outline" className="h-16" asChild>
              <a href="/marketplace/search">
                <Search className="mr-2 h-5 w-5" />
                マーケットで資材を探す
              </a>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  総在庫数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">アイテム</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  今月の取引
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34</div>
                <div className="text-sm text-muted-foreground">件</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  出品中
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">アイテム</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  要注意在庫
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">12</div>
                <div className="text-sm text-muted-foreground">長期滞留</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inventory List Widget */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    在庫一覧
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    すべて見る
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <InventoryListWidget />
              </CardContent>
            </Card>

            {/* Material Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>材質別分布</CardTitle>
                <CardDescription>
                  現在の在庫の材質別構成比
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={materialData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {materialData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '割合']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  {materialData.map((material) => (
                    <div key={material.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: material.color }}
                      />
                      <span className="text-sm text-muted-foreground">
                        {material.name} ({material.value}%)
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                マーケットプレイス新着情報
              </CardTitle>
              <CardDescription>
                他社が出品した新着資材
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {newMarketItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div>
                        <div className="font-medium">{item.material} - {item.grade}</div>
                        <div className="text-sm text-muted-foreground">{item.supplier}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{item.price}</div>
                      <div className="text-sm text-muted-foreground">{item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="/marketplace/search">
                  マーケットプレイスを見る
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}