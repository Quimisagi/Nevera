import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [shoppingListAddedItems, setShoppingListAddedItems] = useState([]);
  const [fridge, setFridge] = useState([]);
  const [freezer, setFreezer] = useState([]);
  const [basket, setBasket] = useState([]);

  const globalState = {
    shoppingListAddedItems,
    setShoppingListAddedItems,
    fridge,
    setFridge,
    freezer,
    setFreezer,
    basket,
    setBasket,
  };
  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
