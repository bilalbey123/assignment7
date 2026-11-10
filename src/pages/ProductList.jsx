import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { fetchProducts } from '../api/productsApi';
import { useFetch } from '../hooks/useFetch';
import { ProductCard } from '../components/ProductCard';
export function ProductList() {
  const { loading, error, data } = useFetch(fetchProducts, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? ''; const category = searchParams.get('category') ?? '';
  const products = data?.products ?? [];
  const categories = useMemo(() => [...new Set(products.map((product) => product.category))].sort(), [products]);
  const filtered = products.filter((product) => product.title.toLowerCase().includes(query.trim().toLowerCase()) && (!category || product.category === category));
  function updateParam(key, value) { setSearchParams((current) => { const next = new URLSearchParams(current); if (value) next.set(key, value); else next.delete(key); return next; }); }
  return <section className="catalog-page"><div className="catalog-heading"><div><span className="eyebrow muted">THE COLLECTION</span><h1>Find your <em>everyday.</em></h1><p>Useful things, lovely details, and a little room to browse.</p></div><span className="item-total">{loading ? '…' : `${filtered.length} items`}</span></div><div className="filter-bar"><label className="search-field"><span>⌕</span><input aria-label="Search by product title" placeholder="Search the collection" value={query} onChange={(event) => updateParam('q', event.target.value)}/><kbd>↵</kbd></label><label className="category-field"><span>Category</span><select value={category} onChange={(event) => updateParam('category', event.target.value)}><option value="">All categories</option>{categories.map((item) => <option value={item} key={item}>{item}</option>)}</select><b>⌄</b></label></div>{loading && <div className="state-message"><span className="spinner"/>Loading the collection…</div>}{error && <div className="state-message error-state"><strong>We couldn’t load the collection.</strong><span>{error.message}</span><button className="text-button" onClick={() => window.location.reload()}>Try again</button></div>}{!loading && !error && filtered.length === 0 && <div className="empty-results"><span>⌕</span><h2>No finds just yet.</h2><p>Try another name or choose a different category.</p><button className="underlined-link" onClick={() => setSearchParams({})}>Clear filters →</button></div>}{!loading && !error && filtered.length > 0 && <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product}/>)}</div>}</section>;
}
