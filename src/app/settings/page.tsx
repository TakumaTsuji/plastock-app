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
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Building2, 
  Users, 
  CreditCard, 
  Bell, 
  Shield, 
  Key,
  Plus,
  Edit,
  Trash2
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
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
                <BreadcrumbPage>設定</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div>
            <h1 className="text-2xl font-bold">設定</h1>
            <p className="text-muted-foreground">
              アカウント設定、会社情報、メンバー管理などを行えます
            </p>
          </div>

          <Tabs defaultValue="company" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="company">会社情報</TabsTrigger>
              <TabsTrigger value="members">メンバー</TabsTrigger>
              <TabsTrigger value="billing">支払い</TabsTrigger>
              <TabsTrigger value="notifications">通知</TabsTrigger>
              <TabsTrigger value="security">セキュリティ</TabsTrigger>
            </TabsList>

            {/* 会社情報 */}
            <TabsContent value="company">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      会社基本情報
                    </CardTitle>
                    <CardDescription>
                      会社の基本情報を管理します
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">会社名</Label>
                        <Input id="companyName" defaultValue="株式会社サンプル樹脂" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessType">事業形態</Label>
                        <Input id="businessType" defaultValue="樹脂加工業" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">住所</Label>
                      <Input id="address" defaultValue="東京都港区虎ノ門1-1-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">電話番号</Label>
                        <Input id="phone" defaultValue="03-1234-5678" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input id="email" defaultValue="contact@sample-resin.co.jp" />
                      </div>
                    </div>
                    <Button>変更を保存</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>取引情報</CardTitle>
                    <CardDescription>
                      マーケットプレイスでの取引に関する設定
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">銀行名</Label>
                        <Input id="bankName" placeholder="例: 三菱UFJ銀行" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="branchName">支店名</Label>
                        <Input id="branchName" placeholder="例: 虎ノ門支店" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accountType">口座種別</Label>
                        <Input id="accountType" placeholder="普通・当座" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">口座番号</Label>
                        <Input id="accountNumber" placeholder="1234567" />
                      </div>
                    </div>
                    <Button>更新</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* メンバー管理 */}
            <TabsContent value="members">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        メンバー管理
                      </CardTitle>
                      <CardDescription>
                        チームメンバーの招待と権限管理
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      メンバーを招待
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* メンバーリスト */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                            YT
                          </div>
                          <div>
                            <div className="font-medium">山田太郎</div>
                            <div className="text-sm text-muted-foreground">yamada@sample-resin.co.jp</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>管理者</Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-medium">
                            SH
                          </div>
                          <div>
                            <div className="font-medium">佐藤花子</div>
                            <div className="text-sm text-muted-foreground">sato@sample-resin.co.jp</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">メンバー</Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-medium">
                            TK
                          </div>
                          <div>
                            <div className="font-medium">田中健一</div>
                            <div className="text-sm text-muted-foreground">tanaka@sample-resin.co.jp</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">読み取り専用</Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 支払い情報 */}
            <TabsContent value="billing">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      プラン・支払い情報
                    </CardTitle>
                    <CardDescription>
                      現在のプランと支払い方法
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">プロフェッショナルプラン</div>
                        <div className="text-sm text-muted-foreground">月額 ¥19,800</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>アクティブ</Badge>
                        <Button variant="outline" size="sm">変更</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>支払い方法</Label>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-4 w-4" />
                          <div>
                            <div className="font-medium">**** **** **** 1234</div>
                            <div className="text-sm text-muted-foreground">有効期限 12/26</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">変更</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>次回請求日</Label>
                      <div className="text-sm text-muted-foreground">2024年1月15日</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>請求履歴</CardTitle>
                    <CardDescription>
                      過去の請求履歴を確認できます
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2">
                        <div className="text-sm">2024年12月</div>
                        <div className="text-sm">¥19,800</div>
                        <Button variant="ghost" size="sm">PDF</Button>
                      </div>
                      <div className="flex items-center justify-between p-2">
                        <div className="text-sm">2024年11月</div>
                        <div className="text-sm">¥19,800</div>
                        <Button variant="ghost" size="sm">PDF</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* 通知設定 */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    通知設定
                  </CardTitle>
                  <CardDescription>
                    メールや システム通知の設定を管理
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">在庫アラート</div>
                        <div className="text-sm text-muted-foreground">在庫が少なくなった時の通知</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">マーケット新着通知</div>
                        <div className="text-sm text-muted-foreground">新しい商品が出品された時の通知</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">取引完了通知</div>
                        <div className="text-sm text-muted-foreground">売買が完了した時の通知</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">システムメンテナンス</div>
                        <div className="text-sm text-muted-foreground">メンテナンス情報の通知</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">マーケティング情報</div>
                        <div className="text-sm text-muted-foreground">新機能や特別オファーの通知</div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* セキュリティ */}
            <TabsContent value="security">
              <div className="grid gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      セキュリティ
                    </CardTitle>
                    <CardDescription>
                      アカウントのセキュリティ設定
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">現在のパスワード</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">新しいパスワード</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>パスワードを変更</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      二要素認証
                    </CardTitle>
                    <CardDescription>
                      アカウントのセキュリティを強化
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">二要素認証を有効にする</div>
                        <div className="text-sm text-muted-foreground">SMS認証を使用してアカウントを保護</div>
                      </div>
                      <Button variant="outline">設定する</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}