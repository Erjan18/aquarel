import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { CreditCard, Truck, MapPin } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'courier' | 'pickup' | 'post';
  paymentMethod: 'card' | 'cash' | 'online';
  comments: string;
}

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'courier',
    paymentMethod: 'card',
    comments: '',
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with user data if logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name,
        email: user.email,
      }));
    }
  }, [isLoggedIn, user]);
  
  useEffect(() => {
    document.title = 'Оформление заказа - ТворчеЛавка';
    
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Введите ФИО';
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/[^0-9+]/g, ''))) {
      newErrors.phone = 'Введите корректный телефон';
    }
    
    if (formData.deliveryMethod !== 'pickup') {
      if (!formData.address.trim()) newErrors.address = 'Введите адрес';
      if (!formData.city.trim()) newErrors.city = 'Введите город';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Введите индекс';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate order processing
      setTimeout(() => {
        clearCart();
        navigate('/account/orders', { 
          state: { 
            orderSuccess: true,
            orderNumber: Math.floor(100000 + Math.random() * 900000)
          } 
        });
      }, 1500);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Оформление заказа</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* Contact information */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Контактная информация</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                    ФИО*
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`input w-full ${errors.fullName ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input w-full ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Телефон*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+996(___) ___-___-"
                    className={`input w-full ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Delivery method */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Способ доставки</h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="courier"
                    checked={formData.deliveryMethod === 'courier'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <Truck size={18} className="text-primary-600 dark:text-primary-400" />
                      Курьерская доставка
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Доставка курьером по адресу в течение 1-2 дней. Стоимость: бесплатно.
                    </p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={formData.deliveryMethod === 'pickup'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <MapPin size={18} className="text-primary-600 dark:text-primary-400" />
                      Самовывоз из магазина
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Самовывоз из нашего магазина по адресу: г. Бишкек, ул. Творческая, д. 42. Стоимость: бесплатно.
                    </p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="post"
                    checked={formData.deliveryMethod === 'post'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                      Почта Кыргызстана
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Доставка Почтой Кыргызстана в течение 3-7 дней. Стоимость: бесплатно при заказе от 3000 сом.
                    </p>
                  </div>
                </label>
              </div>
              
              {formData.deliveryMethod !== 'pickup' && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">
                      Адрес*
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`input w-full ${errors.address ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">
                      Город*
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`input w-full ${errors.city ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                      Индекс*
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`input w-full ${errors.postalCode ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment method */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
              
              <div className="space-y-4">
                <label className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <CreditCard size={18} className="text-primary-600 dark:text-primary-400" />
                      Банковская карта
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Оплата банковской картой онлайн. Поддерживаются карты Visa, Mastercard, МИР.
                    </p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400">
                        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                        <circle cx="12" cy="12" r="2"></circle>
                        <path d="M6 12h.01M18 12h.01"></path>
                      </svg>
                      Наличными при получении
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Оплата наличными курьеру при доставке или при самовывозе из магазина.
                    </p>
                  </div>
                </label>
                
                <label className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400">
                        <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
                        <path d="M13 13h4"></path>
                        <path d="M11 17 7 9l6-4"></path>
                      </svg>
                      Онлайн-оплата
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Оплата через системы Сбербанк Онлайн, ЮMoney, QIWI.
                    </p>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Comments */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Дополнительная информация</h2>
              
              <div>
                <label htmlFor="comments" className="block text-sm font-medium mb-1">
                  Комментарий к заказу
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full"
                  placeholder="Например, особые пожелания по доставке"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
            
            <div className="mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="text-primary-600 dark:text-primary-400">{item.quantity}×</span>
                    <span className="text-sm">{item.product.name}</span>
                  </div>
                  <span className="font-medium">{item.product.price * item.quantity} сом</span>
                </div>
              ))}
            </div>
            
            <div className="border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Товары ({items.length}):</span>
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
            
            <button
              type="submit"
              className="btn-primary w-full flex justify-center items-center"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Оформление...' : 'Подтвердить заказ'}
            </button>
            
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center mt-4">
              Нажимая кнопку "Подтвердить заказ", вы соглашаетесь с условиями <a href="#" className="underline">пользовательского соглашения</a> и <a href="#" className="underline">политики конфиденциальности</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;