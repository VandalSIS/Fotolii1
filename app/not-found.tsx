import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 48, margin: 0 }}>404</h1>
          <p>Page not found</p>
          <Link href="/" style={{ color: "#c0843c" }}>Home</Link>
        </div>
      </body>
    </html>
  );
}
