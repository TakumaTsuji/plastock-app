"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Package, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold">PLASTOCK</span>
        </div>
        
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">新規登録</CardTitle>
            <CardDescription className="text-center">
              アカウントを作成してPLASTOCKを始める
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">会社名</Label>
                <Input
                  id="company"
                  placeholder="株式会社..."
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">担当者名</Label>
                <Input
                  id="name"
                  placeholder="山田太郎"
                  className="w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="contact@company.com"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="03-1234-5678"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                placeholder="8文字以上"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード確認</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="パスワードを再入力"
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm font-normal">
                <Link href="/terms" className="text-primary hover:underline">
                  利用規約
                </Link>
                と
                <Link href="/privacy" className="text-primary hover:underline">
                  プライバシーポリシー
                </Link>
                に同意する
              </Label>
            </div>
            <Link href="/dashboard">
              <Button className="w-full" size="lg">
                アカウントを作成
              </Button>
            </Link>
            <div className="text-center text-sm text-muted-foreground">
              既にアカウントをお持ちの方は{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                ログイン
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}