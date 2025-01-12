import uuid from 'uuid-random';

const id = uuid();

export function getItems(listOfItems){
  const temp = listOfItems.map((id) => {
    const item = Object.values(items).find((item) => item.id === id); 
    return item ? item : null; 
  }).filter(item => item !== null);  
  return temp;
}



export const items = [
  {
    id: uuid(),
    name: "bread",
    icon: require('../assets/icons/bread-loaf.png'),
    time: 10
  },
  {
    id: uuid(),
    name: "butter",
    icon: require('../assets/icons/biscuits.png'),
    time: 30
  },
  {
    id: uuid(),

    name: "carrots",
    icon: require('../assets/icons/carrot.png'),
    time: 20
  },
  {
    id: uuid(),
    name: "cheese",
    icon: require('../assets/icons/cheese.png'),
    time: 15
  },
  {
    id: uuid(),
    name: "chikuwa",
    icon: require('../assets/icons/sausages.png'),
    time: 7
  },
  {
    id: uuid(),
    name: "cooked-rice",
    icon: require('../assets/icons/rice-bowl.png'),
    time: 2
  },
  {
    id: uuid(),
    name: "eggplant",
    icon: require('../assets/icons/eggplant.png'),
    time: 7
  },
  {
    id: uuid(),
    name: "eggs",
    icon: require('../assets/icons/eggs.png'),
    time: 22
  },
  {
    id: uuid(),
    name: "fish",
    icon: require('../assets/icons/whole-fish.png'),
    time: 3
  },
  {
    id: uuid(),
    name: "kimchi",
    icon: require('../assets/icons/jam.png'),
    time: 35
  },
  {
    id: uuid(),
    name: "lettuce",
    icon: require('../assets/icons/lettuce.png'),
    time: 8
  },
  {
    id: uuid(),
    name: "milk",
    icon: require('../assets/icons/milk-bottle.png'),
    time: 7
  },
  {
    id: uuid(),
    name: "moyashi",
    icon: require('../assets/icons/basil.png'),
    time: 3
  },
  {
    id: uuid(),
    name: "mushroom",
    icon: require('../assets/icons/mushroom.png'),
    time: 6
  },
  {
    id: uuid(),
    name: "natto",
    icon: require('../assets/icons/grains-of-rice.png'),
    time: 7
  },
  {
    id: uuid(),
    name: "nuts",
    icon: require('../assets/icons/cashew.png'),
    time: 0
  },
  {
    id: uuid(),
    name: "onion",
    icon: require('../assets/icons/onion.png'),
    time: 24
  },
  {
    id: uuid(),
    name: "pork",
    icon: require('../assets/icons/meat.png'),
    time: 3
  },
  {
    id: uuid(),
    name: "potato",
    icon: require('../assets/icons/potato.png'),
    time: 24
  },
  {
    id: uuid(),
    name: "salt",
    icon: require('../assets/icons/salt.png'),
    time: 0
  },
  {
    id: uuid(),
    name: "spaghetti",
    icon: require('../assets/icons/spaghetti.png'),
    time: 0
  },
  {
    id: uuid(),
    name: "sugar",
    icon: require('../assets/icons/sugar.png'),
    time: 0
  },
  {
    id: uuid(),
    name: "tomato",
    icon: require('../assets/icons/tomato.png'),
    time: 5
  }
];

