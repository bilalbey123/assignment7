import { Link } from 'react-router';
export function NotFound() { return <section className="not-found"><span className="eyebrow muted">404 — NOTHING HERE</span><h1>This page took<br/>a <em>wrong turn.</em></h1><p>The address may be out of date, or the page has moved on.</p><Link className="button button-dark" to="/">Back to the beginning <span>→</span></Link></section>; }
