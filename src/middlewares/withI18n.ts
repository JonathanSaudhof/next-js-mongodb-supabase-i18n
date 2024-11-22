import { i18nMiddleWare } from "@/locales/middleware";
import { CustomMiddleware } from "@/lib/middleware/chain";

export function withI18n(middleWare: CustomMiddleware): CustomMiddleware {
  return (req, event, res) => {
    const response = i18nMiddleWare(req);
    return middleWare(req, event, response);
  };
}
