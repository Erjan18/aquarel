import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, BlogPost } from '../data/blog';
import { Search, Calendar, Tag } from 'lucide-react';

const BlogPage: React.FC = () => {
  const allPosts = getBlogPosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = 'Блог и мастер-классы - ТворчеЛавка';
  }, []);
  
  // Get unique categories
  const categories = [...new Set(allPosts.map(post => post.category))];
  
  // Get unique tags
  const tags = [...new Set(allPosts.flatMap(post => post.tags))];
  
  // Filter posts based on search, category, and tag
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Блог и мастер-классы</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Полезные статьи, советы и пошаговые мастер-классы для всех видов творчества и рукоделия
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          {/* Search */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по блогу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
          
          {/* Categories */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-bold mb-3">Категории</h2>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                    className={`block w-full text-left px-2 py-1 rounded ${
                      category === selectedCategory
                        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tags */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mb-6">
            <h2 className="text-lg font-bold mb-3">Теги</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`text-sm px-3 py-1 rounded-full ${
                    tag === selectedTag
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                      : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Clear filters */}
          {(searchQuery || selectedCategory || selectedTag) && (
            <button
              onClick={clearFilters}
              className="btn-outline w-full mb-6"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
        
        {/* Blog posts */}
        <div className="lg:w-3/4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Статьи не найдены</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                По вашему запросу не найдено статей. Попробуйте изменить параметры поиска.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary"
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="card group h-full flex flex-col">
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
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 mb-2">
          <Calendar size={14} className="mr-1" />
          {post.date}
        </div>
        
        <h2 className="text-xl font-bold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {post.tags.slice(0, 3).map(tag => (
            <div key={tag} className="text-xs flex items-center px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
              <Tag size={10} className="mr-1" />
              {tag}
            </div>
          ))}
        </div>
        
        <Link 
          to={`/blog/${post.id}`}
          className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:underline inline-flex items-center"
        >
          Читать далее
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;