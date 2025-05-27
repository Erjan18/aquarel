import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/Product';
import { useCart } from '../../contexts/CartContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Calculate discount percentage
  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : product.discount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="card h-full flex flex-col group">
        <div className="relative overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <span className="badge-primary py-1 px-2">Новинка</span>
            )}
            {discountPercentage && discountPercentage > 0 && (
              <span className="badge bg-accent-500 text-white py-1 px-2">-{discountPercentage}%</span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-2 right-2">
            <button 
              className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-md hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
              aria-label="Добавить в избранное"
            >
              <Heart size={18} className="text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-md font-medium line-clamp-2 mb-2">{product.name}</h3>
            
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
              <span className="mr-2">{product.brand}</span>
              <span className={`${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {product.inStock ? 'В наличии' : 'Нет в наличии'}
              </span>
            </div>
            
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-${i < Math.round(product.rating) ? 'yellow-500' : 'slate-300 dark:text-slate-600'}`}>★</span>
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">({product.reviewCount})</span>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-lg font-bold">{product.price} сом</span>
              {product.oldPrice && (
                <span className="text-sm text-slate-500 dark:text-slate-400 line-through">{product.oldPrice} сом</span>
              )}
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="btn-primary w-full flex items-center justify-center gap-2"
              disabled={!product.inStock}
            >
              <ShoppingCart size={16} />
              <span>В корзину</span>
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;