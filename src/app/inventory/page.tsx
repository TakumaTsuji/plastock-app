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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Filter, Edit, Trash2, ShoppingCart, ArrowUpDown } from "lucide-react"
import { InventoryFormModal } from "@/components/inventory-form-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

// サンプルデータ
const inventoryData = [
  {
    id: 1,
    material: "ABS",
    grade: "高耐衝撃",
    shape: "ペレット",
    quantity: 250,
    unit: "kg",
    location: "倉庫A-1",
    entryDate: "2024-12-15",
    status: "自社利用",
    value: 45000,
  },
  {
    id: 2,
    material: "PP",
    grade: "食品グレード",
    shape: "ペレット", 
    quantity: 180,
    unit: "kg",
    location: "倉庫B-3",
    entryDate: "2024-12-20",
    status: "出品中",
    value: 32400,
  },
  {
    id: 3,
    material: "PE",
    grade: "透明",
    shape: "シート",
    quantity: 95,
    unit: "m²",
    location: "倉庫A-5",
    entryDate: "2024-12-18",
    status: "自社利用",
    value: 28500,
  },
  {
    id: 4,
    material: "PC",
    grade: "光学グレード",
    shape: "ペレット",
    quantity: 75,
    unit: "kg",
    location: "倉庫C-2",
    entryDate: "2024-12-10",
    status: "自社利用",
    value: 67500,
  },
  {
    id: 5,
    material: "ABS",
    grade: "難燃",
    shape: "ペレット",
    quantity: 320,
    unit: "kg",
    location: "倉庫B-1",
    entryDate: "2024-12-22",
    status: "出品中",
    value: 64000,
  },
  {
    id: 6,
    material: "POM",
    grade: "標準",
    shape: "ペレット",
    quantity: 150,
    unit: "kg",
    location: "倉庫A-3",
    entryDate: "2024-12-08",
    status: "自社利用",
    value: 37500,
  },
  {
    id: 7,
    material: "PA66",
    grade: "ガラス繊維強化",
    shape: "ペレット",
    quantity: 85,
    unit: "kg",
    location: "倉庫C-1",
    entryDate: "2024-12-25",
    status: "自社利用",
    value: 59500,
  },
  {
    id: 8,
    material: "PP",
    grade: "自動車用",
    shape: "ペレット",
    quantity: 280,
    unit: "kg",
    location: "倉庫B-2",
    entryDate: "2024-12-12",
    status: "出品中",
    value: 44800,
  }
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    
    return matchesSearch && matchesStatus
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
                <BreadcrumbPage>在庫管理</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Header Actions */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">在庫管理</h1>
              <p className="text-muted-foreground">
                自社の在庫を一元管理できます
              </p>
            </div>
            <InventoryFormModal mode="add">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                在庫を新規登録
              </Button>
            </InventoryFormModal>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>検索・フィルタ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="材質、グレード、保管場所で検索..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      ステータス
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>ステータスでフィルタ</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                      すべて
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("自社利用")}>
                      自社利用
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("出品中")}>
                      出品中
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>在庫一覧 ({filteredData.length}件)</CardTitle>
                <div className="text-sm text-muted-foreground">
                  総価値: ¥{filteredData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button variant="ghost" className="p-0 h-auto font-medium">
                          材質
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>グレード・形状</TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 h-auto font-medium">
                          現在数量
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>保管場所</TableHead>
                      <TableHead>
                        <Button variant="ghost" className="p-0 h-auto font-medium">
                          入庫日
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>ステータス</TableHead>
                      <TableHead>価値</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.material}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{item.grade}</div>
                            <div className="text-muted-foreground">{item.shape}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono">
                            {item.quantity.toLocaleString()}{item.unit}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.location}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.entryDate}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === "出品中" ? "default" : "secondary"}
                            className={item.status === "出品中" ? "bg-blue-100 text-blue-800" : ""}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono">
                            ¥{item.value.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ShoppingCart className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredData.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  検索条件に一致する在庫が見つかりませんでした
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}