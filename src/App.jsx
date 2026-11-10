import { Navigate, Outlet, Route, Routes } from 'react-router';
import { Layout } from './components/Layout'; import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home'; import { ProductList } from './pages/ProductList'; import { ProductDetail } from './pages/ProductDetail'; import { Cart } from './pages/Cart'; import { Login } from './pages/Login'; import { NotFound } from './pages/NotFound';
function ProductRoutes() { return <Outlet/>; }
export default function App() { return <Routes><Route element={<Layout/>}><Route index element={<Home/>}/><Route path="products" element={<ProductRoutes/>}><Route index element={<ProductList/>}/><Route path=":id" element={<ProductDetail/>}/></Route><Route element={<ProtectedRoute/>}><Route path="cart" element={<Cart/>}/></Route><Route path="login" element={<Login/>}/><Route path="404" element={<NotFound/>}/><Route path="*" element={<Navigate to="/404" replace/>}/></Route></Routes>; }
