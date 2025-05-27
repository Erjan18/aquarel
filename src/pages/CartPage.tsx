import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Trash2, X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, itemCount } = useCart();

  useEffect(() => {
    document.title = 'Корзина - ТворчеЛавка';
  }, []);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <ShoppingBag size={64} className="text-slate-400 dark:text-slate-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Ваша корзина пуста</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Добавьте товары в корзину, чтобы оформить заказ.
          </p>
          <Link to="/catalog" className="btn-primary">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Корзина</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="lg:w-2/3">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 hidden md:flex">
              <div className="w-2/5 font-medium">Товар</div>
              <div className="w-1/5 font-medium text-center">Цена</div>
              <div className="w-1/5 font-medium text-center">Количество</div>
              <div className="w-1/5 font-medium text-right">Сумма</div>
            </div>
            
            {items.map((item, index) => (
              <motion.div 
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-4 ${index < items.length - 1 ? 'border-b border-slate-200 dark:border-slate-700' : ''}`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Mobile layout */}
                  <div className="md:hidden flex justify-end">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      aria-label="Удалить товар"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  {/* Product info */}
                  <div className="flex items-center gap-4 md:w-2/5">
                    <Link to={`/product/${item.product.id}`} className="shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </Link>
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {item.product.brand}
                      </div>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:w-1/5 md:text-center">
                    <div className="md:hidden text-sm text-slate-600 dark:text-slate-400">Цена:</div>
                    <div>{item.product.price} сом</div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:w-1/5 md:flex md:justify-center">
                    <div className="md:hidden text-sm text-slate-600 dark:text-slate-400 mb-1">Количество:</div>
                    <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-md">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-10 text-center border-none focus:ring-0 p-0"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="md:w-1/5 md:text-right">
                    <div className="md:hidden text-sm text-slate-600 dark:text-slate-400">Сумма:</div>
                    <div className="font-medium">{item.product.price * item.quantity} сом</div>
                  </div>
                  
                  {/* Desktop remove button */}
                  <div className="hidden md:block">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                      aria-label="Удалить товар"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Сумма заказа</h2>
            
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Товары ({itemCount}):</span>
                <span>{totalPrice} сом</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка:</span>
                <span>Бесплатно</span>
              </div>
            </div>
            
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Итого:</span>
              <span>{totalPrice} сом</span>
            </div>
            
            <Link to="/checkout" className="btn-primary w-full flex justify-center items-center">
              Оформить заказ
            </Link>
            
            <div className="mt-4 text-center">
              <Link to="/catalog" className="text-primary-600 dark:text-primary-400 hover:underline text-sm">
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;