import { useParams, useNavigate, Link } from 'react-router';
import { fetchProduct } from '../api/productsApi';
import { useFetch } from '../hooks/useFetch';
import { useCartStore } from '../store/cartStore';
export function ProductDetail() {
  const { id } = useParams(); const navigate = useNavigate();
  const { loading, error, data: product } = useFetch((signal) => fetchProduct(id, signal), [id]);
  const addItem = useCartStore((state) => state.addItem);
  if (loading) return <div className="state-message"><span className="spinner"/>Finding this item…</div>;
  if (error) return <div className="detail-error"><span className="eyebrow muted">A LITTLE DETOUR</span><h1>We couldn’t find that product.</h1><p>It may have moved, or the link might be out of date.</p><button className="button button-dark" onClick={() => navigate('/products')}>Back to the collection <span>→</span></button></div>;
  return <section className="detail-page"><button className="back-link" onClick={() => navigate('/products')}>← <span>Back to the collection</span></button><div className="detail-layout"><div className="detail-image"><img src={product.thumbnail} alt={product.title}/></div><div className="detail-copy"><span className="eyebrow muted">{product.category}</span><h1>{product.title}</h1><div className="detail-rating">★ {product.rating?.toFixed(1) ?? '—'} <span>·</span> {product.stock} in stock</div><div className="detail-price">${product.price.toFixed(2)}</div><p>{product.description}</p><button className="button button-dark add-button" onClick={() => addItem(product)}>Add to bag <span>＋</span></button><div className="detail-footnote">A good pick for everyday. Thoughtfully chosen, ready to be yours.</div><Link className="underlined-link" to={`/products/${Number(id) + 1}`}>Next find →</Link></div></div></section>;
}
