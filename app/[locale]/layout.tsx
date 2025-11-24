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
    title: "Facile.",
    description: "Facile. Studio",
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
        <body className={manrope.variable}>
        <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}