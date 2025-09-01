"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, ShoppingCart } from "lucide-react"

interface InventoryFormModalProps {
  children: React.ReactNode
  mode?: "add" | "edit"
  defaultValues?: any
}

export function InventoryFormModal({ 
  children, 
  mode = "add", 
  defaultValues 
}: InventoryFormModalProps) {
  const [isMarketplaceEnabled, setIsMarketplaceEnabled] = useState(false)
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {mode === "add" ? "在庫を新規登録" : "在庫情報を編集"}
          </DialogTitle>
          <DialogDescription>
            在庫の詳細情報を入力してください。マーケットプレイスへの出品も同時に行えます。
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material">材質 *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="材質を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abs">ABS</SelectItem>
                      <SelectItem value="pp">PP (ポリプロピレン)</SelectItem>
                      <SelectItem value="pe">PE (ポリエチレン)</SelectItem>
                      <SelectItem value="pc">PC (ポリカーボネート)</SelectItem>
                      <SelectItem value="pom">POM (ポリアセタール)</SelectItem>
                      <SelectItem value="pa66">PA66 (ナイロン66)</SelectItem>
                      <SelectItem value="pps">PPS</SelectItem>
                      <SelectItem value="peek">PEEK</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">グレード *</Label>
                  <Input id="grade" placeholder="例: 高耐衝撃、食品グレード" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shape">形状 *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="形状を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pellet">ペレット</SelectItem>
                      <SelectItem value="sheet">シート</SelectItem>
                      <SelectItem value="rod">丸棒</SelectItem>
                      <SelectItem value="plate">板材</SelectItem>
                      <SelectItem value="tube">パイプ</SelectItem>
                      <SelectItem value="powder">粉体</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">色</Label>
                  <Input id="color" placeholder="例: 透明、白、黒" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 在庫情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">在庫情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">数量 *</Label>
                  <Input id="quantity" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">単位 *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="単位" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="t">t (トン)</SelectItem>
                      <SelectItem value="m">m (メートル)</SelectItem>
                      <SelectItem value="m2">m² (平米)</SelectItem>
                      <SelectItem value="m3">m³ (立米)</SelectItem>
                      <SelectItem value="pcs">個</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">単価 (円)</Label>
                  <Input id="unitPrice" type="number" placeholder="0" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">保管場所 *</Label>
                  <Input id="location" placeholder="例: 倉庫A-1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entryDate">入庫日</Label>
                  <Input id="entryDate" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">備考・メモ</Label>
                <Textarea 
                  id="notes" 
                  placeholder="品質情報、使用用途、注意事項など"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* マーケットプレイス出品 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  マーケットプレイス出品
                </CardTitle>
                <Switch
                  checked={isMarketplaceEnabled}
                  onCheckedChange={setIsMarketplaceEnabled}
                />
              </div>
            </CardHeader>
            {isMarketplaceEnabled && (
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                  この在庫をマーケットプレイスに出品します。他の企業が購入できるようになります。
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="saleQuantity">販売数量 *</Label>
                    <Input id="saleQuantity" type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">販売価格 (円) *</Label>
                    <Input id="salePrice" type="number" placeholder="0" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="marketplaceDescription">公開向けコメント *</Label>
                  <Textarea 
                    id="marketplaceDescription" 
                    placeholder="購入者向けの商品説明文。品質情報、使用用途、特徴などを記載してください。"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minOrderQuantity">最小注文数量</Label>
                    <Input id="minOrderQuantity" type="number" placeholder="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryArea">配送可能地域</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="配送範囲" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nationwide">全国</SelectItem>
                        <SelectItem value="kanto">関東エリア</SelectItem>
                        <SelectItem value="kansai">関西エリア</SelectItem>
                        <SelectItem value="chubu">中部エリア</SelectItem>
                        <SelectItem value="kyushu">九州エリア</SelectItem>
                        <SelectItem value="pickup">引き取りのみ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliveryNotes">配送に関する特記事項</Label>
                  <Textarea 
                    id="deliveryNotes" 
                    placeholder="配送方法、梱包方法、送料負担などについて"
                    rows={2}
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </div>
        
        <DialogFooter>
          <Button variant="outline">キャンセル</Button>
          <Button className="bg-green-600 hover:bg-green-700">
            {mode === "add" ? "在庫を登録" : "変更を保存"}
            {isMarketplaceEnabled && " & 出品"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}