import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

function TopNav() {
  return (
    <nav className="text-x1 flex w-full items-center justify-between border-b p-4 font-semibold">
      <div>Bucket List</div>
      <div>Ratings</div>
      <div>Recommendations</div>

      <div>Sign In</div>
    </nav>
  );
}

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="flex flex-col gap-4">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
