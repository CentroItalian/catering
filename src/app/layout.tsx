import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CENTRO Italian Catering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-italiana`}
      >
        {children}
      </body>
    </html>
  );
}
