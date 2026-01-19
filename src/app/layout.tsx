import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import type { ReactNode } from "react"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.css"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"]
})

export const metadata: Metadata = {
    title: "Better Auth Next.js Starter",
    description:
        "Better Auth Next.js Starter with Postgres, Prisma, shadcn/ui and Tanstack Query"
}

export const viewport: Viewport = {
    initialScale: 1,
    viewportFit: "cover",
    width: "device-width"
}

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} flex min-h-svh flex-col antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
