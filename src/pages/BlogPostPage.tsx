import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogPostById } from '../data/blog';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = getBlogPostById(parseInt(id || '0'));

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - ТворчеЛавка`;
    } else {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/blog"
        className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Вернуться к блогу
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {post.date}
            </div>
            <span>•</span>
            <div className="badge-primary">{post.category}</div>
            <span>•</span>
            <div>{post.author}</div>
          </div>
        </header>

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />

        <div 
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                className="flex items-center text-sm px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <Tag size={14} className="mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </footer>
      </article>
    </div>
  );
};

export default BlogPostPage;