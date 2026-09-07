export interface ExternalItem {
 id: string;
 title: string;
 subtitle?: string;
 image?: string;
}

type ExternalRecord = Record<string, unknown>;

export async function fetchExternal(
 source: 'products' | 'news'
): Promise<ExternalItem[]> {
 if (source === 'products') {
 const items = await fetch(
 'https://fakestoreapi.com/products?limit=8',
 { cache: 'no-store' }
 ).then((r) => r.json());
 return (items as ExternalRecord[]).map((product) => ({
 id: String(product.id), title: String(product.title),
 subtitle: `$${String(product.price)} • ${String(product.category)}`,
 image: typeof product.image === 'string' ? product.image : undefined,
 }));
 }
 // source === 'news' — ดึงจาก Hacker News (Algolia)
 const data = await fetch(
 'https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=8'
 ).then((r) => r.json());
 return ((data as { hits?: ExternalRecord[] }).hits || []).map((hit) => ({
 id: String(hit.objectID), title: String(hit.title),
 subtitle: `${String(hit.points ?? 0)} points • by ${String(hit.author)}`,
 }));
}