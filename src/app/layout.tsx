import Navbar from "@/components/ui/common/Navbar";
import "../globals.css";
import { ClientProviders } from "./provider/ClientProviders";
import Footer from "@/components/ui/common/Footer";

export const metadata = {
  title: "Aidirectory",
  description: "Your AI-powered directory solution",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#007acc"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Navbar />
          <main
            style={{
              minHeight: "80vh",
              padding: "20px"
              // backgroundColor: "red"
            }}
          >
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
