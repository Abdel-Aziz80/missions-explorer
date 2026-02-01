export default function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Rechercher (ex: react, node, api)…"
      style={{
        width: "100%", padding: "12px 14px", borderRadius: 14,
        border: "1px solid rgba(255,255,255,.12)", background: "rgba(0,0,0,.25)",
        color: "white", outline: "none"
      }}
    />
  );
}
