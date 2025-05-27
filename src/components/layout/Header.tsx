import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, Sun, Moon } from 'lucide-react';
import { categories } from '../../data/products';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { getProductsBySearch } from '../../data/products';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { itemCount } = useCart();
  const { isLoggedIn } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const searchResults = getProductsBySearch(searchQuery);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  const handleSearchFocus = () => {
    setShowSearchResults(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => setShowSearchResults(false), 200);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md' : 'bg-white dark:bg-slate-900'}`}>
      <div className="container mx-auto px-4">
        {/* Top bar with contacts and user menu */}
        <div className="py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm">
          <div className="hidden md:flex space-x-4">
            <span>Телефон: +996 (999) 123-456</span>
            <span>Email: info@creativeshop.kg</span>
          </div>
          <div className="flex space-x-4 items-center">
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/blog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Блог</Link>
            <Link to="/account/orders" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Доставка и оплата</Link>
          </div>
        </div>

        {/* Main header */}
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400 flex items-center">
            <span className="text-accent-500 mr-1">Творче</span>Лавка
          </Link>

          {/* Search form */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="input w-full pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              
              {/* Search results dropdown */}
              {showSearchResults && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {product.price} сом
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-600 dark:text-slate-400">
                      По вашему запросу ничего не найдено
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to={isLoggedIn ? "/account" : "/login"} className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <User size={24} />
              <span className="hidden md:inline ml-1">{isLoggedIn ? 'Кабинет' : 'Войти'}</span>
            </Link>
            <Link to="/account/favorites" className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <Heart size={24} />
              <span className="hidden md:inline ml-1">Избранное</span>
            </Link>
            <Link to="/cart" className="flex items-center hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="hidden md:inline ml-1">Корзина</span>
            </Link>
            <button
              className="md:hidden flex items-center"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Categories navigation */}
        <nav className="hidden md:block py-3 border-t border-slate-200 dark:border-slate-800">
          <ul className="flex space-x-6 overflow-x-auto">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/catalog/${category.id}`}
                  className="whitespace-nowrap hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search on mobile */}
        <div className="md:hidden py-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Поиск товаров..."
              className="input w-full pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}>
          <div
            className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-slate-900 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Меню</h2>
              <button onClick={toggleMenu} aria-label="Закрыть меню">
                <X size={24} />
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Категории</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/catalog/${category.id}`}
                      className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      onClick={toggleMenu}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Информация</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/blog"
                    className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={toggleMenu}
                  >
                    Блог
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/orders"
                    className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={toggleMenu}
                  >
                    Доставка и оплата
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/contact"
                    className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={toggleMenu}
                  >
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Аккаунт</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to={isLoggedIn ? "/account" : "/login"}
                    className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={toggleMenu}
                  >
                    {isLoggedIn ? 'Личный кабинет' : 'Войти'}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/favorites"
                    className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={toggleMenu}
                  >
                    Избранное
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="block py-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onClick={toggleMenu}
                  >
                    Корзина
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;