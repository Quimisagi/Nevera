
import items from '../data/items';

export function getItems(id){
  const temp = shoppingListAddedItems.map((id) => {
    const item = Object.values(items).find((item) => item.id === id); 
    return item ? item : null; 
  }).filter(item => item !== null);  
  setAddedItems(temp);
}
