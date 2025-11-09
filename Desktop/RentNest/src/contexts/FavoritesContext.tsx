import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: string[];
  addToFavorites: (roomId: string) => void;
  removeFromFavorites: (roomId: string) => void;
  isFavorite: (roomId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('rentnest_favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addToFavorites = (roomId: string) => {
    const newFavorites = [...favorites, roomId];
    setFavorites(newFavorites);
    localStorage.setItem('rentnest_favorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (roomId: string) => {
    const newFavorites = favorites.filter(id => id !== roomId);
    setFavorites(newFavorites);
    localStorage.setItem('rentnest_favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (roomId: string) => {
    return favorites.includes(roomId);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
