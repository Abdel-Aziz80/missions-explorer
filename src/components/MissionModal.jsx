import { tagsForPost } from "../utils/format";

export default function MissionModal({ mission, onClose }) {
  if (!mission) return null;

  const tags = tagsForPost(mission);

  return (
    <div style={overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <h2 style={{ margin: 0 }}>{mission.title}</h2>
          <button onClick={onClose} style={closeBtn} type="button">✕</button>
        </div>

        <p style={{ opacity: 0.9 }}>{mission.body}</p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tags.map((t) => <span key={t} style={pill}>{t}</span>)}
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            style={action}
          >
            Voir le code (démo)
          </a>
          <button onClick={onClose} style={actionBtn} type="button">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.55)",
  display: "grid",
  placeItems: "center",
  padding: 16,
};

const modal = {
  width: "min(720px, 100%)",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,.14)",
  background: "rgba(12,16,30,.92)",
  padding: 18,
  color: "white",
};

const closeBtn = {
  border: "1px solid rgba(255,255,255,.14)",
  background: "transparent",
  color: "white",
  borderRadius: 12,
  padding: "6px 10px",
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

const action = {
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.12)",
  color: "white",
};

const actionBtn = {
  padding: "10px 14px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.06)",
  color: "white",
  cursor: "pointer",
};
