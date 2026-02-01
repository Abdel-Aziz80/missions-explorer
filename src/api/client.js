export async function apiGet(path) {
  const url = `https://dummyjson.com${path}`;
  const res = await fetch(url);

  if (!res.ok) {
    const msg = `API error ${res.status}`;
    throw new Error(msg);
  }
  return res.json();
}
