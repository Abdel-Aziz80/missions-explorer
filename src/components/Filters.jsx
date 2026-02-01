export default function Filters({ tag, setTag, sort, setSort, tags }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        style={selStyle}
      >
        <option value="">Tous les tags</option>
        {tags.map((t) => <option key={t} value={t}>{t}</option>)}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={selStyle}
      >
        <option value="new">Tri: récents</option>
        <option value="az">Tri: A → Z</option>
        <option value="za">Tri: Z → A</option>
      </select>
    </div>
  );
}

const selStyle = {
  padding: "12px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.25)",
  color: "white",
  outline: "none",
};
