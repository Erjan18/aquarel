import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, isLoggedIn } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Регистрация - ТворчеЛавка';
    
    // Redirect if already logged in
    if (isLoggedIn) {
      navigate('/account');
    }
  }, [isLoggedIn, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов');
      return;
    }
    
    try {
      setIsLoading(true);
      await register(name, email, password);
      navigate('/account');
    } catch (err) {
      setError('Ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Регистрация</h1>
          
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Имя
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Подтверждение пароля
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input w-full"
                required
              />
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:underline">
                Войти
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Или зарегистрироваться через
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="btn-outline flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#4285F4"/>
                  <path d="M4.547 14.927l3.025 2.232c.811-2.4 3.025-4.058 5.596-4.058 1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.621 5.48z" fill="#34A853"/>
                  <path d="M12.168 19.32c2.358 0 4.317-.813 5.762-2.211l-2.765-2.092c-.81.54-1.843.861-2.997.861-2.312 0-4.278-1.559-4.981-3.671l-3.043 2.342c1.362 2.698 4.153 4.771 8.024 4.771z" fill="#FBBC05"/>
                  <path d="M12.168 4.052c1.749 0 3.194.723 4.083 1.671l2.717-2.718C17.12.928 14.818 0 12.168 0a8.907 8.907 0 0 0-7.621 4.298l3.043 2.342c.737-2.111 2.704-3.588 5.047-3.588z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="btn-outline flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127c-.82-.088-1.643-.13-2.467-.127-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" fill="#1877F2"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
          
          <p className="mt-6 text-xs text-slate-600 dark:text-slate-400 text-center">
            Регистрируясь, вы соглашаетесь с нашими <a href="#" className="underline">Условиями использования</a> и <a href="#" className="underline">Политикой конфиденциальности</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;