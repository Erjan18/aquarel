import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import { Palette, Scissors, Book, HandMetal, Sparkles, Baby, Activity } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'drawing': <Palette size={24} />,
  'sewing': <Scissors size={24} />,
  'knitting': <Activity size={24} />,
  'scrapbooking': <Book size={24} />,
  'sculpting': <HandMetal size={24} />,
  'decorating': <Sparkles size={24} />,
  'kids': <Baby size={24} />,
};

const CategoryCards: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Категории товаров</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/catalog/${category.id}`}
              className="group card flex flex-col items-center text-center p-4 md:p-6 hover:border-primary-400 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 mb-3 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                {iconMap[category.id] || <Palette size={24} />}
              </div>
              
              <h3 className="font-medium mb-2">{category.name}</h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {category.subcategories.slice(0, 3).map(sub => sub.name).join(', ')}
                {category.subcategories.length > 3 ? ' и др.' : ''}
              </p>
              
              <span className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-auto group-hover:underline">
                Смотреть все
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;