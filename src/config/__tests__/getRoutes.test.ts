import { beforeAll, describe, expect, it, test } from "vitest";
import { registerRoutes } from "../routes";

describe("getRouteWithLocale", () => {
  const routes = {
    unprotected: {
      test: "/test",
      doubleSlash: "//test",
      endingSlash: "//test/",
    },
  };

  const getRouteWithLocaleTest = registerRoutes(routes);

  it("should get correct route unprotected", () => {
    const route = getRouteWithLocaleTest("unprotected.test", "en");
    expect(route).toBe(`/en/test`);
  });

  it("should take care of double slashes in routes", () => {
    const route = getRouteWithLocaleTest("unprotected.doubleSlash", "en");
    expect(route).toBe("/en/test");
  });

  it("should take care of double slashes in locales", () => {
    const route = getRouteWithLocaleTest("unprotected.doubleSlash", "/en");
    expect(route).toBe("/en/test");
  });

  it("should take care of double slashes in locales", () => {
    const route = getRouteWithLocaleTest("unprotected.endingSlash", "/en");
    expect(route).toBe("/en/test");
  });
});
