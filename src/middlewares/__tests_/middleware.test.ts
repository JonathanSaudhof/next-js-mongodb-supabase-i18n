import chain from "@/lib/middleware/chain";
import { describe, it } from "vitest";
import { withI18n } from "../withI18n";
import { withAuth } from "../withAuth";
import { NextRequest } from "next/server";
import { routesConfig } from "@/config/routes.config";

describe("middleware", () => {
  it("should chain middlewares", async () => {
    const chainedMiddleware = chain([withI18n, withAuth]);

    const request = new NextRequest(routesConfig.protected.home);
    const response = await chainedMiddleware(request, {} as any, {} as any);

    console.log(response);
  });
});
