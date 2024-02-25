import type { Metadata } from "next";
import "./globals.css";
import Header from "./header";
import ThemeProvider from "@/providers/ThemeProvider";
import Footer from "./footer";

export const metadata: Metadata = {
  title: "School project app",
  description:
    "I decided to practice docker and next.js with this somewhat special project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="light">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
