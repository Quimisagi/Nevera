import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [shoppingListSelectedItems, setShoppingListSelectedItems] = useState([]);
  const globalState = {
    shoppingListSelectedItems,
    setShoppingListSelectedItems,
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
