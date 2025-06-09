import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../data/products';
import ProductList from '../components/product/ProductList';
import { ShoppingCart, Heart, Truck, RotateCcw, ShieldCheck, Minus, Plus, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const relatedProducts = product ? getRelatedProducts(product) : [];
  
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - ТворчеЛавка`;
    }
  }, [product]);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Товар не найден</h1>
        <p className="mb-8">К сожалению, запрашиваемый товар не существует или был удален.</p>
        <Link to="/catalog" className="btn-primary">
          Перейти в каталог
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center flex-wrap">
          <li className="flex items-center">
            <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
              Главная
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link to="/catalog" className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
              Каталог
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link to={`/catalog/${product.category}`} className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400">
              {product.category}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-slate-900 dark:text-slate-100 truncate">
            {product.name}
          </li>
        </ol>
      </nav>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product images */}
        <div>
          <div className="relative mb-4 aspect-square">
            <motion.img
              key={activeImage}
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="badge-primary py-1 px-2">Новинка</span>
              )}
              {product.oldPrice && (
                <span className="badge bg-accent-500 text-white py-1 px-2">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              )}
            </div>
          </div>
          
          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`border-2 rounded-md overflow-hidden min-w-[70px] h-[70px] ${
                  activeImage === index 
                    ? 'border-primary-600 dark:border-primary-400' 
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - вид ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <Star size={18} className="text-yellow-500" />
              <span className="font-medium">{product.rating}</span>
            </div>
            <span className="text-slate-600 dark:text-slate-400">
              {product.reviewCount} отзывов
            </span>
            <span className="text-slate-600 dark:text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-400">
              Артикул: {product.id.toString().padStart(6, '0')}
            </span>
          </div>
          
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{product.price} сом</span>
            {product.oldPrice && (
              <span className="text-lg text-slate-500 dark:text-slate-400 line-through">
                {product.oldPrice} сом
              </span>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-slate-700 dark:text-slate-300 mb-4">
              {product.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="font-medium">Бренд:</span> {product.brand}
              </div>
              <div>
                <span className="font-medium">Категория:</span> {product.category}
              </div>
            </div>
          </div>
          
          {/* Add to cart */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-md">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-12 text-center border-none focus:ring-0 p-0"
                  min="1"
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="flex-1 flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={18} />
                  <span>В корзину</span>
                </button>
                
                <button
                  className="btn-outline p-2"
                  aria-label="Добавить в избранное"
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>
            
            <div className={`text-sm ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </div>
          </div>
          
          {/* Shipping info */}
          <div className="border-t border-slate-200 dark:border-slate-800 mt-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-slate-600 dark:text-slate-400" />
                <span className="text-sm">Доставка по всему Кыргызстану</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={18} className="text-slate-600 dark:text-slate-400" />
                <span className="text-sm">14 дней на возврат</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-slate-600 dark:text-slate-400" />
                <span className="text-sm">Гарантия качества</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b border-slate-200 dark:border-slate-800 mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'description'
                  ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Описание
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'specifications'
                  ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Характеристики
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Отзывы ({product.reviewCount})
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        <div className="mb-12">
          {activeTab === 'description' && (
            <div>
              <p className="text-slate-700 dark:text-slate-300">
                {product.description}
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div>
              <table className="w-full">
                <tbody>
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <tr key={key} className="border-b border-slate-200 dark:border-slate-800">
                      <td className="py-3 pr-4 font-medium w-1/3">{key}</td>
                      <td className="py-3">{value.toString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Отзывы покупателей</h3>
                <button className="btn-primary">Написать отзыв</button>
              </div>
              
              <div className="mb-6 p-6 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    А
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <h4 className="font-medium">Анна В.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < 5 ? 'text-yellow-500' : 'text-slate-300'} />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">12 марта 2025</span>
                    </div>
                    <p className="mt-2">
                      Отличный товар! Я очень довольна покупкой. Качество превзошло мои ожидания, а цена очень приятная. Рекомендую!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                    М
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <h4 className="font-medium">Михаил П.</h4>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < 4 ? 'text-yellow-500' : 'text-slate-300'} />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">5 февраля 2025</span>
                    </div>
                    <p className="mt-2">
                      Хороший товар за свои деньги. Доставили быстро, всё соответствует описанию. Немного не понравилась упаковка, но это мелочи.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button className="btn-outline">Показать больше отзывов</button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
        <ProductList products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;