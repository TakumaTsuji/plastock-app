"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Package, Clock, MapPin, Phone, Mail } from "lucide-react"

// Leafletを動的インポート（SSR対応）
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
)

interface InventoryLocation {
  id: number
  company: string
  material: string
  grade: string
  quantity: number
  unit: string
  price: number
  lat: number
  lng: number
  address: string
  contact: {
    phone: string
    email: string
  }
  distance?: number
  postedDate: string
  description: string
}

// サンプルデータ（日本の主要都市に配置）
const inventoryLocations: InventoryLocation[] = [
  {
    id: 1,
    company: "東京樹脂工業",
    material: "ABS",
    grade: "高耐衝撃",
    quantity: 500,
    unit: "kg",
    price: 180000,
    lat: 35.6762,
    lng: 139.6503,
    address: "東京都新宿区西新宿1-1-1",
    contact: { phone: "03-1234-5678", email: "contact@tokyo-resin.co.jp" },
    distance: 5.2,
    postedDate: "2024-12-25",
    description: "自動車部品製造で使用していた高品質なABS樹脂"
  },
  {
    id: 2,
    company: "関西プラスチック",
    material: "PP",
    grade: "食品グレード",
    quantity: 300,
    unit: "kg",
    price: 95000,
    lat: 34.6937,
    lng: 135.5023,
    address: "大阪府大阪市北区梅田1-1-1",
    contact: { phone: "06-1234-5678", email: "info@kansai-plastic.co.jp" },
    distance: 12.1,
    postedDate: "2024-12-24",
    description: "食品包装用途で購入した高純度ポリプロピレン"
  },
  {
    id: 3,
    company: "北陸化学",
    material: "PE",
    grade: "透明",
    quantity: 800,
    unit: "m²",
    price: 240000,
    lat: 36.7077,
    lng: 137.2134,
    address: "富山県富山市総曲輪1-1-1",
    contact: { phone: "076-1234-5678", email: "sales@hokuriku-chem.co.jp" },
    distance: 8.9,
    postedDate: "2024-12-23",
    description: "包装用透明シートの在庫処分品"
  },
  {
    id: 4,
    company: "精密樹脂",
    material: "PC",
    grade: "光学グレード",
    quantity: 150,
    unit: "kg",
    price: 225000,
    lat: 35.4437,
    lng: 139.6380,
    address: "神奈川県横浜市西区みなとみらい1-1-1",
    contact: { phone: "045-1234-5678", email: "order@seimitsu-resin.co.jp" },
    distance: 3.7,
    postedDate: "2024-12-22",
    description: "光学部品製造用ポリカーボネート"
  },
  {
    id: 5,
    company: "エンジニアリング樹脂",
    material: "PA66",
    grade: "ガラス繊維強化30%",
    quantity: 200,
    unit: "kg",
    price: 160000,
    lat: 35.1815,
    lng: 136.9066,
    address: "愛知県名古屋市中村区名駅1-1-1",
    contact: { phone: "052-1234-5678", email: "eng@eng-resin.co.jp" },
    distance: 15.3,
    postedDate: "2024-12-21",
    description: "自動車エンジン周辺部品用の高強度ナイロン"
  },
  {
    id: 6,
    company: "九州ポリマー",
    material: "ABS",
    grade: "難燃",
    quantity: 400,
    unit: "kg",
    price: 200000,
    lat: 33.5904,
    lng: 130.4017,
    address: "福岡県福岡市中央区天神1-1-1",
    contact: { phone: "092-1234-5678", email: "contact@kyushu-polymer.co.jp" },
    distance: 22.1,
    postedDate: "2024-12-20",
    description: "家電製品用難燃性ABS樹脂"
  }
]

interface MapInventoryViewerProps {
  searchTerm: string
  materialFilter: string
  radiusFilter: string
}

export function MapInventoryViewer({ searchTerm, materialFilter, radiusFilter }: MapInventoryViewerProps) {
  const [selectedLocation, setSelectedLocation] = useState<InventoryLocation | null>(null)
  const [leafletLoaded, setLeafletLoaded] = useState(false)

  useEffect(() => {
    // Leaflet CSSを動的に読み込み
    if (typeof window !== 'undefined') {
      // CSSの動的インポートはビルド時に問題が発生するため、直接スタイルを適用
      setLeafletLoaded(true)
    }
  }, [])

  const filteredLocations = inventoryLocations.filter(location => {
    const matchesSearch = location.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesMaterial = materialFilter === "all" || location.material === materialFilter
    
    const matchesRadius = radiusFilter === "all" || (location.distance && location.distance <= parseInt(radiusFilter))
    
    return matchesSearch && matchesMaterial && matchesRadius
  })

  if (!leafletLoaded) {
    return (
      <div className="flex items-center justify-center h-96 bg-muted/50 rounded-md">
        <div className="text-muted-foreground">マップを読み込み中...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 gap-4 p-4">
      {/* Map */}
      <div className="flex-1 h-96 rounded-md overflow-hidden border border-gray-700">
        <MapContainer
          center={[35.6762, 139.6503]} // 東京中心
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              eventHandlers={{
                click: () => setSelectedLocation(location),
              }}
            >
              <Popup>
                <div className="p-2 min-w-64">
                  <div className="font-bold text-lg mb-2">
                    {location.material} - {location.grade}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3 w-3" />
                      {location.company}
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-3 w-3" />
                      {location.quantity.toLocaleString()}{location.unit}
                    </div>
                    <div className="font-bold text-lg">
                      ¥{location.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <Card className="w-80 border-gray-700 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">
              {selectedLocation.material} - {selectedLocation.grade}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              {selectedLocation.company}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">数量</span>
                <span className="font-mono text-white">
                  {selectedLocation.quantity.toLocaleString()}{selectedLocation.unit}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">価格</span>
                <span className="font-bold text-lg text-white">
                  ¥{selectedLocation.price.toLocaleString()}
                </span>
              </div>
              {selectedLocation.distance && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">距離</span>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                    {selectedLocation.distance}km
                  </Badge>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">住所</div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-3 w-3 mt-0.5 text-muted-foreground" />
                <span className="text-white">{selectedLocation.address}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">連絡先</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span className="text-white">{selectedLocation.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-white">{selectedLocation.contact.email}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">詳細</div>
              <p className="text-sm text-white">{selectedLocation.description}</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              投稿日: {selectedLocation.postedDate}
            </div>

            <div className="space-y-2 pt-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Package className="mr-2 h-4 w-4" />
                購入手続きへ
              </Button>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                詳細情報を見る
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}