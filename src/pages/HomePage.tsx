import React, { useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryCards from '../components/home/CategoryCards';
import FeaturedProducts from '../components/home/FeaturedProducts';
import BlogPreview from '../components/home/BlogPreview';
import { getNewProducts } from '../data/products';
import ProductList from '../components/product/ProductList';

const HomePage: React.FC = () => {
  const newProducts = getNewProducts();

  useEffect(() => {
    document.title = 'ТворчеЛавка - Магазин товаров для творчества';
  }, []);

  return (
    <div>
      <HeroBanner />
      
      <CategoryCards />
      
      <FeaturedProducts />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Новинки</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2 md:mt-0">
              Недавно добавленные товары в нашем каталоге
            </p>
          </div>
          
          <ProductList products={newProducts} />
        </div>
      </section>
      
      <section className="py-12 bg-primary-50 dark:bg-primary-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Подпишитесь на нашу рассылку</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            Получайте информацию о новых поступлениях, акциях и мастер-классах
          </p>
          
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Ваш email"
              className="input flex-grow"
            />
            <button className="btn-primary ml-2 whitespace-nowrap">
              Подписаться
            </button>
          </div>
        </div>
      </section>
      
      <BlogPreview />
      
      <section className="py-12 bg-slate-100 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Доставляем заказы по всей России. Курьером, в пункты выдачи или почтой.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Гарантия качества</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Мы тщательно отбираем товары и сотрудничаем только с проверенными брендами.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Поддержка клиентов</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Наши консультанты помогут с выбором и ответят на все вопросы по товарам.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;