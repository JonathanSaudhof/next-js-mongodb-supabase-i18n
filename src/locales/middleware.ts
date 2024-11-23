import { createI18nMiddleware } from "next-international/middleware";

export const locales = ["en", "de"];

export const i18nMiddleWare = createI18nMiddleware({
  locales,
  defaultLocale: "en",
});
