import { PropsWithChildren } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <div>
      <span>Protected</span>
      {children}
    </div>
  );
}
