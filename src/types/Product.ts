export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  attributes: {
    [key: string]: string | number | boolean;
  };
  isNew?: boolean;
  isPopular?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface FilterOption {
  id: string;
  name: string;
  count: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterOptions {
  brands: FilterOption[];
  colors: FilterOption[];
  materials: FilterOption[];
  priceRange: PriceRange;
}