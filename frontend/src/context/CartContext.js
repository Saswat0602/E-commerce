import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) { 
  let cartFromLS=Number(localStorage.getItem('cartCart')) || 0

  const [cart, setCart] = useState(cartFromLS);

 


  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
