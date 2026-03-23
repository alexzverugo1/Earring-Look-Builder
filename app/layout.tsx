import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Banter Earring Look Builder",
  description: "Banter-inspired earring look builder prototype"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
