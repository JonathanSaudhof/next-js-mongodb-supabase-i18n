import getRoutesWithLocale from "@/config/routes.config";
import { CustomMiddleware } from "@/lib/middleware/chain";
import { createI18nMiddleware } from "next-international/middleware";
import { NextFetchEvent, NextRequest } from "next/server";

export const locales = ["en"];

export const i18nMiddleWare = createI18nMiddleware({
  locales,
  defaultLocale: "en",
});
