import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blog';
import { ArrowRight } from 'lucide-react';

const BlogPreview: React.FC = () => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Блог и мастер-классы</h2>
          <Link 
            to="/blog" 
            className="text-primary-600 dark:text-primary-400 hover:underline flex items-center mt-2 md:mt-0"
          >
            Все статьи
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`} 
              className="card group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 bg-primary-600 text-white px-3 py-1 text-sm">
                  {post.category}
                </div>
              </div>
              
              <div className="p-4">
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {post.date}
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center">
                  <span className="text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:underline">
                    Читать далее
                  </span>
                  <ArrowRight size={14} className="ml-1 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;