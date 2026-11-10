import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';
export function NavBar({ theme, onToggleTheme }) {
  const { user, dispatch } = useAuth();
  const count = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const navigate = useNavigate();
  function logout() { dispatch({ type: 'LOGGED_OUT' }); navigate('/'); }
  return <header className="topbar"><NavLink className="brand" to="/" aria-label="Everyday home"><span className="brand-mark">e.</span><span>everyday<span className="brand-dot">.</span></span></NavLink><nav className="nav-links" aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/products">Shop</NavLink><NavLink to="/cart">Cart <span className="cart-count">{count}</span></NavLink></nav><div className="nav-actions"><button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle colour theme">{theme === 'light' ? '☾' : '☀'}<span>{theme === 'light' ? 'Dark' : 'Light'}</span></button>{user ? <div className="user-chip"><span className="user-name">{user.username}</span><button className="text-button" onClick={logout}>Log out</button></div> : <NavLink className="login-link" to="/login">Log in <span>↗</span></NavLink>}</div></header>;
}
