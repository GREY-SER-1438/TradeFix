import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="logo">TradeFix</Link>
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/services">Услуги</Link>
          <Link to="/catalog">Каталог</Link>
        </nav>
      </div>
    </header>
  )
}
