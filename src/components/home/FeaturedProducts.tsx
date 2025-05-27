import React from 'react';
import ProductList from '../product/ProductList';
import { getPopularProducts } from '../../data/products';

const FeaturedProducts: React.FC = () => {
  const popularProducts = getPopularProducts();

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Популярные товары</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 md:mt-0">
            Самые востребованные товары для вашего творчества
          </p>
        </div>
        
        <ProductList products={popularProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;