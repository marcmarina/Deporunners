import { useContext } from 'react';
import Clothing from 'interfaces/Clothing';
import CartContext from './context';

export default function useCart() {
  const { items, setItems } = useContext(CartContext);

  const addItem = (item: Clothing) => {
    if (setItems) {
      setItems([...(items ?? []), item]);
    }
  };

  return {
    addItem,
    items,
  };
}
