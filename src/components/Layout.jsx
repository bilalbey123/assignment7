import { Outlet } from 'react-router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { NavBar } from './NavBar';
export function Layout() { const [theme, setTheme] = useLocalStorage('assignment7-theme', 'light'); return <div className={`app-shell theme-${theme}`}><NavBar theme={theme} onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} /><main className="page-wrap"><Outlet /></main><footer className="site-footer"><span>Everyday Goods</span><span>Good things for everyday life.</span></footer></div>; }
