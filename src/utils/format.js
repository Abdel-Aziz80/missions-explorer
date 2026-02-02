export function clip(text, max = 90) {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "…" : text;
}

export function tagsForPost(post) {
  if (!post?.tags) return [];
  return post.tags.map(t => t.toLowerCase());
}