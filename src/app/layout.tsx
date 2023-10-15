import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/ui/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algo Displayer",
  description: "Visualization of different sort algorithms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header></Header>
        <div className="flex flex-grow">
          <aside className="hidden md:block w-30 bg-slate-100 p-2">
            <nav>
              <ul>
                <li>Sort </li>
                <li>NinePuzzle</li>
              </ul>
            </nav>
          </aside>

          <div className="flex-grow">{children}</div>
        </div>
        <footer className="h-28 bg-slate-100"></footer>
      </body>
    </html>
  );
}
