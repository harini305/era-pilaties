export const metadata = { title: "Page not found — ERA Reformer Pilates" };

export default function NotFound() {
  return (
    <main
      className="wrap"
      style={{ minHeight: "100svh", display: "grid", alignContent: "center", gap: "1.5rem" }}
    >
      <h1 className="display" style={{ fontSize: "var(--fs-h2)" }}>
        Page not found
      </h1>
      <p>This page doesn’t exist on the new ERA site.</p>
      <p>
        <a href="/" className="btn">
          Back to ERA
        </a>
      </p>
    </main>
  );
}
