import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "@/server-components/common";
import "@app/globals.css";
import Fathom from "../../../app/fathom";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "🛠 iron-session examples",
    description: "Set of examples for iron-session",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <Fathom />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
