import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-900 text-white">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Фон баннера"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Все для вашего творчества
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl mb-6 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Широкий ассортимент товаров для рисования, шитья, вязания, скрапбукинга и других видов рукоделия. Создавайте шедевры вместе с нами!
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to="/catalog" className="btn bg-white text-primary-700 hover:bg-slate-100 focus:ring-white">
                Каталог товаров
              </Link>
              <Link to="/blog" className="btn border border-white hover:bg-white/10 focus:ring-white">
                Мастер-классы
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <img
              src="https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Творческие материалы"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
            
            <div className="absolute -bottom-6 -right-6 bg-accent-500 rounded-lg p-4 shadow-lg hidden md:block">
              <div className="text-lg font-bold">Скидка 15%</div>
              <div className="text-sm">на первый заказ</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary-400 opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-secondary-400 opacity-20 animate-pulse delay-1000"></div>
    </div>
  );
};

export default HeroBanner;