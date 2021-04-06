import Clothing from './Clothing';

export default interface Cart {
  items: Clothing[];
}

export interface CartItem {
  amount: number;
  item: Clothing;
}
