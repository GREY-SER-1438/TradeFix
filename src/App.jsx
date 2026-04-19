import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './shared/components/header.jsx'
import RequireAuth from './shared/components/require-auth.jsx'
import HomePage from './features/home/home-page.jsx'
import ServicesPage from './features/services/services-page.jsx'
import CatalogPage from './features/catalog/catalog-page.jsx'
import ProductDetailPage from './features/product/product-detail-page.jsx'
import LoginPage from './features/admin/login-page.jsx'
import DashboardPage from './features/admin/dashboard-page.jsx'
import CategoriesTable from './features/admin/categories-table.jsx'
import ProductsTable from './features/admin/products-table.jsx'
import ServicesTable from './features/admin/services-table.jsx'
import RequestsTable from './features/admin/requests-table.jsx'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<ProductDetailPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<DashboardPage />}>
              <Route index element={<Navigate to="categories" replace />} />
              <Route path="categories" element={<CategoriesTable />} />
              <Route path="products" element={<ProductsTable />} />
              <Route path="services" element={<ServicesTable />} />
              <Route path="requests" element={<RequestsTable />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-col">
            <span className="footer-brand">TradeFix</span>
            <p>Ремонт и продажа торгового оборудования. Работаем с 2015 года.</p>
          </div>
          <div className="footer-col">
            <span className="footer-heading">Навигация</span>
            <ul>
              <li><a href="/">Главная</a></li>
              <li><a href="/catalog">Каталог</a></li>
              <li><a href="/services">Услуги</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <span className="footer-heading">Контакты</span>
            <ul>
              <li>+7 (495) 123-45-67</li>
              <li>info@tradefix.ru</li>
              <li>г. Москва, ул. Ленина, 42</li>
              <li>Пн–Пт: 9:00 – 18:00</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">© 2026 TradeFix. Все права защищены.</div>
      </footer>
    </div>
  )
}
