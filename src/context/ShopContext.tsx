import React, { createContext, useContext, useState } from 'react';
import { PerfumeItem, JournalEntry } from '../content/site';

export interface CartItem {
  id: string;
  name: string;
  size: string;
  price: number;
  priceFormatted: string;
  quantity: number;
  image: string;
  isSample?: boolean;
}

interface ShopContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: { name: string; size: string; price: string; image: string; isSample?: boolean }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  cartCount: number;
  cartTotal: number;
  
  // Modals
  selectedPerfume: PerfumeItem | null;
  setSelectedPerfume: (perfume: PerfumeItem | null) => void;
  
  isBookingOpen: boolean;
  setIsBookingOpen: (open: boolean) => void;
  
  isQuizOpen: boolean;
  setIsQuizOpen: (open: boolean) => void;
  
  selectedArticle: JournalEntry | null;
  setSelectedArticle: (article: JournalEntry | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: '01-sample',
      name: 'Discovery Set (5 × 3ml)',
      size: '5 × 3ml',
      price: 65,
      priceFormatted: '$65',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=800&auto=format&fit=crop',
      isSample: true,
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<PerfumeItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<JournalEntry | null>(null);

  const addToCart = ({
    name,
    size,
    price,
    image,
    isSample = false,
  }: {
    name: string;
    size: string;
    price: string;
    image: string;
    isSample?: boolean;
  }) => {
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
    const itemId = `${name}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          name,
          size,
          price: numericPrice,
          priceFormatted: price,
          quantity: 1,
          image,
          isSample,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        selectedPerfume,
        setSelectedPerfume,
        isBookingOpen,
        setIsBookingOpen,
        isQuizOpen,
        setIsQuizOpen,
        selectedArticle,
        setSelectedArticle,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
