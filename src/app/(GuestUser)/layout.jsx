import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/globals.scss";
import GuestHeader from '@/components/GuestUser/Common/Header/Header';
import GuestFooter from '@/components/GuestUser/Common/Footer/Footer';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg_background`}>
                <GuestHeader />
                <main >{children}</main>
                <GuestFooter />
            </body>
        </html>
    );
};