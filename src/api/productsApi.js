const BASE_URL = 'https://dummyjson.com/products';
async function readResponse(response) { if (!response.ok) throw new Error(`Request failed (${response.status})`); return response.json(); }
export async function fetchProducts(signal) { return readResponse(await fetch(`${BASE_URL}?limit=100`, { signal })); }
export async function fetchProduct(id, signal) { return readResponse(await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, { signal })); }
