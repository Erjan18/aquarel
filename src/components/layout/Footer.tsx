import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube as YouTube, Scissors, Palette, ShoppingBag } from 'lucide-react';
import { categories } from '../../data/products';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-800 pt-12 pb-6 text-slate-700 dark:text-slate-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400 flex items-center">
              <span className="text-accent-500 mr-1">Творче</span>Лавка
            </h3>
            <p className="mb-4">
              Интернет-магазин товаров для творчества и рукоделия. Мы предлагаем широкий ассортимент материалов для рисования, шитья, вязания, скрапбукинга и других видов хобби.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors" aria-label="YouTube">
                <YouTube size={20} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <ShoppingBag size={18} className="mr-2" />
              Категории
            </h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link to={`/catalog/${category.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/catalog" className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Все категории &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Palette size={18} className="mr-2" />
              Информация
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Блог и мастер-классы
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/account/returns" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Возврат и обмен
                </Link>
              </li>
              <li>
                <Link to="/account/faq" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Частые вопросы
                </Link>
              </li>
              <li>
                <Link to="/account/about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/account/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Scissors size={18} className="mr-2" />
              Контакты
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>г. Бишкек, ул. Творческая, д. 42</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+79991234567" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  +996 (999) 123-456
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@creativeshop.kg" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  info@creativeshop.kg
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <p className="font-semibold">Режим работы:</p>
              <p>Пн-Пт: 9:00 - 20:00</p>
              <p>Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 dark:border-slate-700 mt-8 pt-6 text-sm text-slate-600 dark:text-slate-400 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 ТворчеЛавка. Все права защищены.</p>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <Link to="/account/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/account/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;