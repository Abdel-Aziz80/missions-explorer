import { useEffect, useMemo, useState } from "react";
import { apiGet } from "../api/client";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import MissionCard from "../components/MissionCard";
import MissionModal from "../components/MissionModal";
import Status from "../components/Status";
import { tagsForPost } from "../utils/format";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState("new");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      setLoading(true);
      setErr("");
      try {
        const data = await apiGet("/api/missions");
        if (!alive) return;
        setPosts(data.missions ?? []);
      } catch (e) {
        if (!alive) return;
        setErr(e.message || "Erreur inconnue");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => { alive = false; };
  }, []);

  const allTags = useMemo(() => {
    const set = new Set();
    posts.forEach(p => tagsForPost(p).forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);


  const filtered = useMemo(() => {
    let list = [...posts];

    // search
    if (q.trim()) {
  const s = q.trim().toLowerCase();
  list = list.filter((p) => {
    const inTitle = p.title.toLowerCase().includes(s);
    const inBody = p.description.toLowerCase().includes(s);
    const inTags = tagsForPost(p).some((t) => t.toLowerCase().includes(s));

    return inTitle || inBody || inTags;
    });
    }

    // tag
    if (tag) {
      list = list.filter(p => tagsForPost(p).includes(tag));
    }

    // sort
    if (sort === "az") list.sort((a,b) => a.title.localeCompare(b.title));
    if (sort === "za") list.sort((a,b) => b.title.localeCompare(a.title));
    if (sort === "new") list.sort((a,b) => b.id - a.id);

    return list;
  }, [posts, q, tag, sort]);

  return (
    <div style={wrap}>
      <header style={header}>
        <div>
          <h1 style={{ margin: 0 }}>Missions Explorer <span style={badge}>démo</span></h1>
          <p style={{ margin: "6px 0 0", opacity: 0.85 }}>
            React + API : recherche, filtres, états loading/erreur, modal détail.
          </p>
        </div>
      </header>

      <section style={{ marginTop: 14 }}>
        <SearchBar  value={q}  onChange={(val) => {
            setQ(val);
            setTag(""); // reset tag filter
          }}
        />
        <Filters tag={tag} setTag={setTag} sort={sort} setSort={setSort} tags={allTags} />
      </section>

      {loading && <Status kind="loading" message="Chargement des missions…" />}
      {err && <Status kind="erreur" message={err} />}
      {!loading && !err && filtered.length === 0 && (
        <Status kind="info" message="Aucun résultat. Essaie un autre mot-clé." />
      )}

      <section className="grid3"  style={grid}>
        {filtered.map((post) => (
          <MissionCard key={post.id} post={post} onOpen={setOpen} />
        ))}
      </section>

      <MissionModal mission={open} onClose={() => setOpen(null)} />
    </div>
  );
}

const wrap = {
  minHeight: "100vh",
  padding: 18,
  background:
    "radial-gradient(900px 700px at 15% 10%, rgba(109,92,255,.22), transparent 60%)," +
    "radial-gradient(900px 700px at 85% 20%, rgba(45,212,255,.18), transparent 60%)," +
    "linear-gradient(180deg, #050814, #070b1b)",
  color: "white",
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  padding: 16,
  borderRadius: 18,
  border: "1px solid rgba(255,255,255,.12)",
  background: "rgba(255,255,255,.05)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12,
  marginTop: 14,
};

const badge = {
  fontSize: 12,
  padding: "3px 8px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,.14)",
  opacity: 0.85,
};
