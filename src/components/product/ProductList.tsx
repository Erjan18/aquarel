import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types/Product';

interface ProductListProps {
  products: Product[];
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({ products, title }) => {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            К сожалению, товары не найдены.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;