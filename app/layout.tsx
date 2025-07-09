import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "dok.so - Secure AI-Driven Document Workflows",
  description:
    "Transform your document processing with customized, secure AI workflows. dok.so understands complex formats and automates your document operations while keeping your data safe and compliant.",
  keywords: "AI document processing, document workflows, secure AI, document automation, enterprise AI",
  authors: [{ name: "dok.so" }],
  openGraph: {
    title: "dok.so - Secure AI-Driven Document Workflows",
    description: "Transform your document processing with customized, secure AI workflows.",
    url: "https://dok.so",
    siteName: "dok.so",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dok.so - Secure AI-Driven Document Workflows",
    description: "Transform your document processing with customized, secure AI workflows.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
