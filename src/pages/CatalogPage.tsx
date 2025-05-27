import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory, categories } from '../data/products';
import ProductList from '../components/product/ProductList';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const products = getProductsByCategory(category);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState('popular');

  // Get current category
  const currentCategory = category 
    ? categories.find(c => c.id === category) 
    : { name: 'Все товары', subcategories: [] };

  // Get unique brands
  const brands = [...new Set(products.map(product => product.brand))];

  // Filter products
  const filteredProducts = products.filter(product => {
    // Price filter
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    // Brand filter
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    
    return priceMatch && brandMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'new':
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default: // popular
        return a.isPopular ? -1 : b.isPopular ? 1 : 0;
    }
  });

  // Toggle filter visibility for mobile
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedBrands([]);
  };

  useEffect(() => {
    document.title = currentCategory 
      ? `${currentCategory.name} - ТворчеЛавка` 
      : 'Каталог товаров - ТворчеЛавка';
  }, [currentCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {currentCategory ? currentCategory.name : 'Все товары'}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {filteredProducts.length} товаров
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={toggleFilter}
            className="w-full btn-outline flex items-center justify-center gap-2"
          >
            <Filter size={18} />
            <span>Фильтры</span>
          </button>
        </div>
        
        {/* Filters sidebar */}
        <div 
          className={`${
            isFilterOpen ? 'fixed inset-0 z-40 bg-black bg-opacity-50' : 'hidden lg:block'
          }`}
          onClick={() => setIsFilterOpen(false)}
        >
          <div 
            className={`
              ${isFilterOpen ? 'fixed top-0 right-0 h-full overflow-y-auto w-80' : 'relative w-64'} 
              bg-white dark:bg-slate-800 p-6 shadow-lg rounded-lg
            `}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Фильтры</h2>
              {isFilterOpen && (
                <button onClick={() => setIsFilterOpen(false)} aria-label="Закрыть">
                  <X size={20} />
                </button>
              )}
            </div>
            
            {/* Price filter */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Цена</h3>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="input w-full"
                  placeholder="От"
                />
                <span>-</span>
                <input
                  type="number"
                  min="0"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="input w-full"
                  placeholder="До"
                />
              </div>
            </div>
            
            {/* Brand filter */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Бренды</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="rounded border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor={`brand-${brand}`} className="ml-2">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Subcategories */}
            {currentCategory && currentCategory.subcategories && currentCategory.subcategories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Подкатегории</h3>
                <div className="space-y-2">
                  {currentCategory.subcategories.map(sub => (
                    <div key={sub.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`sub-${sub.id}`}
                        className="rounded border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={`sub-${sub.id}`} className="ml-2">
                        {sub.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reset filters */}
            <button
              onClick={resetFilters}
              className="btn-outline w-full"
            >
              Сбросить фильтры
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Sort options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center">
              <SlidersHorizontal size={18} className="mr-2 text-slate-600 dark:text-slate-400" />
              <span className="text-slate-600 dark:text-slate-400 mr-2">Сортировать:</span>
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
                className="input py-1"
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">По возрастанию цены</option>
                <option value="price-desc">По убыванию цены</option>
                <option value="rating">По рейтингу</option>
                <option value="new">Сначала новинки</option>
              </select>
            </div>
            
            <div className="text-slate-600 dark:text-slate-400">
              Показано {sortedProducts.length} из {products.length} товаров
            </div>
          </div>
          
          {/* Products */}
          <ProductList products={sortedProducts} />
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;