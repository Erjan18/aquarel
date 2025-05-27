import React, { useState, useEffect } from 'react';
import { useLocation, Link, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { User, Package, Heart, LogOut, MapPin, Settings, HelpCircle, CreditCard } from 'lucide-react';

const AccountPage: React.FC = () => {
  const { user, isLoggedIn, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('');
  
  useEffect(() => {
    document.title = 'Личный кабинет - ТворчеЛавка';
    
    // Extract the active tab from the URL
    const path = location.pathname.split('/');
    setActiveTab(path[path.length - 1]);
    
    // Redirect if not logged in
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [location.pathname, isLoggedIn, navigate]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Личный кабинет</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          {/* User info */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl font-bold">
                {user?.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold">{user?.name}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">{user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="btn-outline w-full flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Выйти
            </button>
          </div>
          
          {/* Navigation */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
            <nav>
              <ul>
                <li>
                  <Link
                    to="/account/profile"
                    className={`flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                      activeTab === 'profile' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''
                    }`}
                  >
                    <User size={18} />
                    <span>Профиль</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/orders"
                    className={`flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                      activeTab === 'orders' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''
                    }`}
                  >
                    <Package size={18} />
                    <span>Мои заказы</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/favorites"
                    className={`flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                      activeTab === 'favorites' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''
                    }`}
                  >
                    <Heart size={18} />
                    <span>Избранное</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/addresses"
                    className={`flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                      activeTab === 'addresses' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''
                    }`}
                  >
                    <MapPin size={18} />
                    <span>Адреса доставки</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/payment"
                    className={`flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                      activeTab === 'payment' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''
                    }`}
                  >
                    <CreditCard size={18} />
                    <span>Способы оплаты</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/settings"
                    className={`flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                      activeTab === 'settings' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''
                    }`}
                  >
                    <Settings size={18} />
                    <span>Настройки</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/account/help"
                    className={`flex items-center gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-700 ${
                      activeTab === 'help' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : ''
                    }`}
                  >
                    <HelpCircle size={18} />
                    <span>Помощь</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="lg:w-3/4 bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/account/profile\" replace />} />
            <Route path="/profile" element={<ProfileTab />} />
            <Route path="/orders" element={<OrdersTab />} />
            <Route path="/favorites" element={<FavoritesTab />} />
            <Route path="/addresses" element={<AddressesTab />} />
            <Route path="/payment" element={<PaymentTab />} />
            <Route path="/settings" element={<SettingsTab />} />
            <Route path="/help" element={<HelpTab />} />
            <Route path="*" element={<Navigate to="/account/profile\" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const ProfileTab: React.FC = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    birthday: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user's profile
    alert('Профиль обновлен');
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Мой профиль</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              ФИО
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+996 (___) ___-___"
              className="input w-full"
            />
          </div>
          
          <div>
            <label htmlFor="birthday" className="block text-sm font-medium mb-1">
              Дата рождения
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="input w-full"
            />
          </div>
        </div>
        
        <button type="submit" className="btn-primary">
          Сохранить изменения
        </button>
      </form>
      
      <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8">
        <h3 className="text-lg font-semibold mb-4">Смена пароля</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
              Текущий пароль
            </label>
            <input
              type="password"
              id="currentPassword"
              className="input w-full"
            />
          </div>
          
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
                Новый пароль
              </label>
              <input
                type="password"
                id="newPassword"
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Подтверждение пароля
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="input w-full"
              />
            </div>
          </div>
        </div>
        
        <button className="btn-primary">
          Изменить пароль
        </button>
      </div>
    </div>
  );
};

const OrdersTab: React.FC = () => {
  const location = useLocation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  
  useEffect(() => {
    if (location.state && location.state.orderSuccess) {
      setShowSuccess(true);
      setOrderNumber(location.state.orderNumber);
      
      // Clear location state after displaying the message
      window.history.replaceState({}, document.title);
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  
  const mockOrders = [
    {
      id: 12345,
      date: '15 апреля 2025',
      status: 'delivered',
      totalPrice: 3570,
      itemCount: 3,
    },
    {
      id: 12344,
      date: '2 марта 2025',
      status: 'shipped',
      totalPrice: 1250,
      itemCount: 1,
    },
    {
      id: 12343,
      date: '18 февраля 2025',
      status: 'processing',
      totalPrice: 2840,
      itemCount: 2,
    },
  ];
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'В обработке';
      case 'shipped':
        return 'Отправлен';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-200';
    }
  };
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Мои заказы</h2>
      
      {showSuccess && orderNumber && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg">
          <div className="font-bold">Заказ успешно оформлен!</div>
          <p>Номер вашего заказа: {orderNumber}. Информация о заказе отправлена на ваш email.</p>
        </div>
      )}
      
      {mockOrders.length > 0 ? (
        <div className="space-y-4">
          {mockOrders.map(order => (
            <div
              key={order.id}
              className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
            >
              <div className="bg-slate-50 dark:bg-slate-800 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className={`text-sm px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                 
                </div>
              </div>
              
              <div className="p-4">
                
                <div className="flex items-center">
                  {/* Placeholder for product thumbnails */}
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
                  {order.itemCount > 1 && (
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-md -ml-4"></div>
                  )}
                  {order.itemCount > 2 && (
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-md -ml-4 flex items-center justify-center">
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 flex justify-center">
            <Package size={48} className="text-slate-400 dark:text-slate-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">У вас пока нет заказов</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Перейдите в каталог, чтобы сделать первую покупку
          </p>
          <Link to="/catalog" className="btn-primary">
            Перейти в каталог
          </Link>
        </div>
      )}
    </div>
  );
};

const FavoritesTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Избранное</h2>
      
      <div className="text-center py-12">
        <div className="mb-4 flex justify-center">
          <Heart size={48} className="text-slate-400 dark:text-slate-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Список избранного пуст</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Добавляйте товары в избранное, чтобы быстро находить их позже
        </p>
        <Link to="/catalog" className="btn-primary">
          Перейти в каталог
        </Link>
      </div>
    </div>
  );
};

const AddressesTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Адреса доставки</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 border-dashed flex flex-col items-center justify-center text-center">
          <MapPin size={24} className="text-slate-400 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Добавьте новый адрес доставки
          </p>
          <button className="btn-outline">
            Добавить адрес
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Способы оплаты</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 border-dashed flex flex-col items-center justify-center text-center">
          <CreditCard size={24} className="text-slate-400 dark:text-slate-600 mb-2" />
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Добавьте новую карту
          </p>
          <button className="btn-outline">
            Добавить карту
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Настройки</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Уведомления</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Email-уведомления о заказах</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Получать уведомления о статусе заказов
                </div>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SMS-уведомления</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Получать SMS о статусе заказов
                </div>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Рассылка о новинках и акциях</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Получать информацию о новых поступлениях и скидках
                </div>
              </div>
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h3 className="font-semibold mb-3">Удаление аккаунта</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            При удалении аккаунта вся ваша информация будет удалена безвозвратно. Это действие нельзя отменить.
          </p>
          <button className="text-red-600 border border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400 dark:border-red-400 rounded-md px-4 py-2 text-sm font-medium">
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
};

const HelpTab: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Помощь</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Часто задаваемые вопросы</h3>
          
          <div className="space-y-4">
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
              <button className="flex justify-between items-center w-full p-4">
                <span className="font-medium text-left">Как оформить заказ?</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="px-4 pb-4 text-slate-600 dark:text-slate-400">
                <p>
                  Для оформления заказа добавьте товары в корзину, перейдите в корзину, нажмите кнопку "Оформить заказ" и следуйте инструкциям на экране.
                </p>
              </div>
            </div>
            
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
              <button className="flex justify-between items-center w-full p-4">
                <span className="font-medium text-left">Какие способы доставки доступны?</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
              <button className="flex justify-between items-center w-full p-4">
                <span className="font-medium text-left">Как вернуть товар?</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
              <button className="flex justify-between items-center w-full p-4">
                <span className="font-medium text-left">Какие способы оплаты вы принимаете?</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
              <button className="flex justify-between items-center w-full p-4">
                <span className="font-medium text-left">Как узнать статус заказа?</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h3 className="font-semibold mb-3">Связаться с нами</h3>
          
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium mb-1">
                  Имя
                </label>
                <input
                  type="text"
                  id="contactName"
                  className="input w-full"
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  className="input w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="contactSubject" className="block text-sm font-medium mb-1">
                  Тема
                </label>
                <input
                  type="text"
                  id="contactSubject"
                  className="input w-full"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="contactMessage" className="block text-sm font-medium mb-1">
                  Сообщение
                </label>
                <textarea
                  id="contactMessage"
                  rows={4}
                  className="input w-full"
                ></textarea>
              </div>
            </div>
            
            <button type="submit" className="btn-primary">
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;