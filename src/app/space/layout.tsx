export default function ProtectedLayout({ children }) {
  return (
    <div>
      <span>Protected</span>
      {children}
    </div>
  );
}
