import { clip, tagsForPost } from "../utils/format";

export default function MissionCard({ post, onOpen }) {
  const tags = tagsForPost(post);

  return (
    <button
      onClick={() => onOpen(post)}
      style={cardBtn}
      type="button"
    >
      <h3 style={{ margin: "0 0 8px" }}>{post.title}</h3>
      <p style={{ margin: 0, opacity: 0.85 }}>{clip(post.body)}</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        {tags.map((t) => (
          <span key={t} style={pill}>{t}</span>
        ))}
      </div>
    </button>
  );
}

const cardBtn = {
  textAlign: "left",
  width: "100%",
  padding: 16,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.05)",
  color: "white",
  cursor: "pointer",
};

const pill = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(0,0,0,.18)",
  fontSize: 12,
  opacity: 0.9,
};
