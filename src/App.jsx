import { Routes, Route } from 'react-router-dom'
import Header from './shared/components/header.jsx'
import HomePage from './features/home/home-page.jsx'
import ServicesPage from './features/services/services-page.jsx'
import CatalogPage from './features/catalog/catalog-page.jsx'
import ProductDetailPage from './features/product/product-detail-page.jsx'
import LoginPage from './features/admin/login-page.jsx'
import DashboardPage from './features/admin/dashboard-page.jsx'
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
          <Route path="/admin" element={<DashboardPage />}>
            <Route path="products" element={<ProductsTable />} />
            <Route path="services" element={<ServicesTable />} />
            <Route path="requests" element={<RequestsTable />} />
          </Route>
        </Routes>
      </main>
      <footer className="footer">© 2026 Ремонт и продажа торгового оборудования</footer>
    </div>
  )
}
