import React from 'react';

import Clothing from 'interfaces/Clothing';

interface ICartContext {
  items: Clothing[];
  setItems: React.Dispatch<React.SetStateAction<Clothing[]>>;
}

const CartContext = React.createContext<Partial<ICartContext>>({});

export default CartContext;
