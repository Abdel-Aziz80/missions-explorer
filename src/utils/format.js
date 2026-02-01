export function clip(text, n = 120) {
  if (!text) return "";
  return text.length > n ? text.slice(0, n - 1) + "…" : text;
}

// Génère des tags “stack” fictifs mais crédibles
export function tagsForPost(post) {
  const pool = ["react", "next.js", "node.js", "express", "postgres", "api", "seo", "ui", "auth"];
  const id = post?.id ?? 1;
  const t1 = pool[id % pool.length];
  const t2 = pool[(id + 3) % pool.length];
  const t3 = pool[(id + 6) % pool.length];
  return Array.from(new Set([t1, t2, t3]));
}
