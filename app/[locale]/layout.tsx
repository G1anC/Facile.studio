import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from 'next-intl/server';

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-manrope",
});

export const metadata: Metadata = {
    title: {
        default: "Facile. Studio",
        template: "%s | Facile. Studio"
    },
    description: "Facile. Studio - Agence digitale créative spécialisée dans le design et le développement web",
    keywords: ["design", "développement web", "studio créatif", "agence digitale", "UX/UI"],
    authors: [{ name: "Facile. Studio" }],
    creator: "Facile. Studio",
    publisher: "Facile. Studio",
    metadataBase: new URL('https://facile.studio'),
    alternates: {
        canonical: '/',
        languages: {
            'en': '/en',
            'fr': '/fr',
        },
    },
    openGraph: {
        type: "website",
        locale: "fr_FR",
        url: "https://facile.studio",
        title: "Facile. Studio",
        description: "Facile. Studio - Agence digitale créative spécialisée dans le design et le développement web",
        siteName: "Facile. Studio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Facile. Studio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Facile. Studio",
        description: "Facile. Studio - Agence digitale créative spécialisée dans le design et le développement web",
        images: ["/og-image.png"],
        creator: "@facilestudio",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon.png", type: "image/png", sizes: "32x32" },
        ],
    },
    // manifest: "/site.webmanifest",
    // verification: {
    //     google: "ton-code-de-verification-google", // Ajoute ton code Google Search Console
    //     // yandex: "ton-code-yandex",
    //     // bing: "ton-code-bing",
    // },
};

export default async function RootLayout({
                                             children,
                                             params
                                         }: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    const messages = await getMessages({ locale });

    return (
        <html lang={locale}>
        <head>
            <link rel="canonical" href={`https://facilestudio.com/${locale}`} />
        </head>
        <body className={manrope.variable}>
        <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}