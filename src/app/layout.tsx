import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo Visualizer",
  description: "Simple todo app to visualize your task list"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
