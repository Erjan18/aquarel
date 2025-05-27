export interface User {
  id: number;
  name: string;
  email: string;
  favorites: number[];
  orders: Order[];
}

export interface Order {
  id: number;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
}

export interface OrderItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
}

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'card' | 'cash' | 'online';