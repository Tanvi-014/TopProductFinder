export interface BuyOption {
  retailer: string;
  price: string;
  url: string;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface BenefitItem {
  type: 'pro' | 'con';
  text: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  rating: number;
  imageSearchQuery: string; // Query used to search or render placeholders/icons
  keyFeatures: string[];
  specs: ProductSpec[];
  pros: string[];
  cons: string[];
  verdict: string;
  buyOptions: BuyOption[];
  rank: number; // 1 for best, 2, 3...
  wishFeedback?: string; // Analysis of how this product meets the user's custom wishes and constraints
}

export interface SearchResult {
  category: string;
  summary: string;
  bestOverall: string;
  products: Product[];
  compareMatrix: {
    featureName: string;
    values: { [productId: string]: string };
  }[];
  sources: { title: string; url: string }[];
  isFallback?: boolean;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  category: string;
  timestamp: string;
}
