import { registerRoutes } from "./routes";

export const routesConfig = {
  protected: {
    home: "/space",
    resetPassword: "/space/reset-password",
  },
  unprotected: {
    protected: "/",
    signIn: "/sign-in",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
  },
};

const getRoutesWithLocale = registerRoutes(routesConfig);

export default getRoutesWithLocale;
