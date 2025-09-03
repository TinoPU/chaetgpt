import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    title: "Chätgpt.ch",
    description: "TBD",
    openGraph: {
        title: "Chätgpt.ch",
        description: "TBD",
        url: "https://chätgpt.ch", // replace with your domain
        type: "website",
        images: [
            {
                url: "/preview.png",
                width: 1200,
                height: 630,
                alt: "Chätgpt.ch preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Chätgpt.ch",
        description: "TBD",
        images: ["/preview.png"],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
