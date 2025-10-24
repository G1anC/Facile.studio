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
