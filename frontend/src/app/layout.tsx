import type {Metadata} from "next";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner"
import React from "react";

export const metadata: Metadata = {
    title: "Tesla Dashboard",
    description: "Control your Tesla",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body>
        {children}
        <Toaster/>
        </body>
        </html>
    );
}
