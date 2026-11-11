import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "商品展示頁面",
  description: "精品商店 - 簡易購物車範例",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
