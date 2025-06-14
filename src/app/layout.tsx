import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "JurNull",
  description: "Where Community Matters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <AppLayout>{children}</AppLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
