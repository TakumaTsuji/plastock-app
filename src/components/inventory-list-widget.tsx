"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ShoppingCart } from "lucide-react"

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
  },
]

export function InventoryListWidget() {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>材質</TableHead>
            <TableHead>数量</TableHead>
            <TableHead>保管場所</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead className="w-[100px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.slice(0, 5).map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{item.material}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.grade} • {item.shape}
                  </div>
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
              <TableCell>
                <Badge 
                  variant={item.status === "出品中" ? "default" : "secondary"}
                  className={item.status === "出品中" ? "bg-blue-100 text-blue-800" : ""}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
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
  )
}