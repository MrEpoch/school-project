import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "School project app",
  description: "I decided to practice docker and next.js with this somewhat special project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
