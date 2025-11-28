import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./NavBar";
import { LogActivityModalProvider } from "./LogActivityModalProvider";
import { AddGoalModalProvider } from "./AddGoalModalProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Logging App",
  description: "Your way to log AI interactions seamlessly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        <AddGoalModalProvider>
          <LogActivityModalProvider>
            <NavBar />
            <div className="pt-20">{children}</div>
          </LogActivityModalProvider>
        </AddGoalModalProvider>
      </body>
    </html>
  );
}