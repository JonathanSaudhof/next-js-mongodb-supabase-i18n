export const routes = {
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
