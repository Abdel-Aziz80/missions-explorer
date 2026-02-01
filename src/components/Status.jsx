export default function Status({ kind, message }) {
  if (!kind) return null;
  return (
    <div style={{
      padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,.12)",
      background: "rgba(255,255,255,.04)", margin: "12px 0"
    }}>
      <strong style={{ textTransform: "capitalize" }}>{kind}</strong>
      <div style={{ opacity: 0.85 }}>{message}</div>
    </div>
  );
}
