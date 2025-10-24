export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/icon",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "fr",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
      meta: [
        { name: "theme-color", content: "#87AFB1" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "#87AFB1" },
        { property: "og:site_name", content: "Facile" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@facile_studio" },
      ],
    },
  },
  i18n: {
    locales: [
      {
        code: "fr",
        name: "Français",
        flag: "🇫🇷",
        file: "fr.json",
      },
      {
        code: "en",
        name: "English",
        flag: "🇬🇧",
        file: "en.json",
      },
      {
        code: "de",
        name: "Deutsch",
        flag: "🇩🇪",
        file: "de.json",
      },
      {
        code: "es",
        name: "Español",
        flag: "🇪🇸",
        file: "es.json",
      },
    ],
    defaultLocale: "fr",
    strategy: "no_prefix",
    langDir: "locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      redirectOn: "root",
    },
  },
});
