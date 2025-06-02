import uuid from 'uuid-random';

const id = uuid();

export function getItems(itemsIds, items){
  const temp = itemsIds.map((id) => {
    const item = Object.values(items).find((item) => item.id === id); 
    return item ? item : null; 
  }).filter(item => item !== null);  
  return temp;
}

export const defaultItems = [
  {
    id: uuid(),
    name: "bread",
    icon: require('../assets/icons/bread-loaf.png'),
    fridgeTime: 7,
    freezerTime: 90,
    basketTime: 3
  },
  {
    id: uuid(),
    name: "butter",
    icon: require('../assets/icons/biscuits.png'),
    fridgeTime: 60,
    freezerTime: 180,
    basketTime: 10
  },
  {
    id: uuid(),
    name: "carrots",
    icon: require('../assets/icons/carrot.png'),
    fridgeTime: 30,
    freezerTime: 365,
    basketTime: 10
  },
  {
    id: uuid(),
    name: "cheese",
    icon: require('../assets/icons/cheese.png'),
    fridgeTime: 21,
    freezerTime: 180,
    basketTime: 7
  },
  {
    id: uuid(),
    name: "chikuwa",
    icon: require('../assets/icons/sausages.png'),
    fridgeTime: 5,
    freezerTime: 30,
    basketTime: 1
  },
  {
    id: uuid(),
    name: "cooked-rice",
    icon: require('../assets/icons/rice-bowl.png'),
    fridgeTime: 3,
    freezerTime: 30,
    basketTime: 1
  },
  {
    id: uuid(),
    name: "eggplant",
    icon: require('../assets/icons/eggplant.png'),
    fridgeTime: 5,
    freezerTime: 180,
    basketTime: 3
  },
  {
    id: uuid(),
    name: "eggs",
    icon: require('../assets/icons/eggs.png'),
    fridgeTime: 30,
    freezerTime: 0,
    basketTime: 7
  },
  {
    id: uuid(),
    name: "fish",
    icon: require('../assets/icons/whole-fish.png'),
    fridgeTime: 2,
    freezerTime: 90,
    basketTime: 1
  },
  {
    id: uuid(),
    name: "kimchi",
    icon: require('../assets/icons/jam.png'),
    fridgeTime: 90,
    freezerTime: 0,
    basketTime: 14
  },
  {
    id: uuid(),
    name: "lettuce",
    icon: require('../assets/icons/lettuce.png'),
    fridgeTime: 7,
    freezerTime: 0,
    basketTime: 3
  },
  {
    id: uuid(),
    name: "milk",
    icon: require('../assets/icons/milk-bottle.png'),
    fridgeTime: 7,
    freezerTime: 30,
    basketTime: 1
  },
  {
    id: uuid(),
    name: "moyashi",
    icon: require('../assets/icons/basil.png'),
    fridgeTime: 2,
    freezerTime: 0,
    basketTime: 1
  },
  {
    id: uuid(),
    name: "mushroom",
    icon: require('../assets/icons/mushroom.png'),
    fridgeTime: 7,
    freezerTime: 30,
    basketTime: 2
  },
  {
    id: uuid(),
    name: "natto",
    icon: require('../assets/icons/grains-of-rice.png'),
    fridgeTime: 10,
    freezerTime: 60,
    basketTime: 3
  },
  {
    id: uuid(),
    name: "nuts",
    icon: require('../assets/icons/cashew.png'),
    fridgeTime: 180,
    freezerTime: 365,
    basketTime: 180
  },
  {
    id: uuid(),
    name: "onion",
    icon: require('../assets/icons/onion.png'),
    fridgeTime: 30,
    freezerTime: 180,
    basketTime: 60
  },
  {
    id: uuid(),
    name: "pork",
    icon: require('../assets/icons/meat.png'),
    fridgeTime: 3,
    freezerTime: 120,
    basketTime: 1
  },
  {
    id: uuid(),
    name: "potato",
    icon: require('../assets/icons/potato.png'),
    fridgeTime: 30,
    freezerTime: 90,
    basketTime: 90
  },
  {
    id: uuid(),
    name: "salt",
    icon: require('../assets/icons/salt.png'),
    fridgeTime: 0,
    freezerTime: 0,
    basketTime: 365
  },
  {
    id: uuid(),
    name: "spaghetti",
    icon: require('../assets/icons/spaghetti.png'),
    fridgeTime: 0,
    freezerTime: 0,
    basketTime: 365
  },
  {
    id: uuid(),
    name: "sugar",
    icon: require('../assets/icons/sugar.png'),
    fridgeTime: 0,
    freezerTime: 0,
    basketTime: 365
  },
  {
    id: uuid(),
    name: "tomato",
    icon: require('../assets/icons/tomato.png'),
    fridgeTime: 9,
    freezerTime: 50,
    basketTime: 3
  },
  {
    id: uuid(),
    name: "yogurt",
    icon: require('../assets/icons/yogurt.png'),
    fridgeTime: 14,
    freezerTime: 60,
    basketTime: 2
  },
  {
    id: uuid(),
    name: "banana",
    icon: require('../assets/icons/banana.png'),
    fridgeTime: 5,
    freezerTime: 60,
    basketTime: 5
  },
  {
    id: uuid(),
    name: "apple",
    icon: require('../assets/icons/apple-fruit.png'),
    fridgeTime: 30,
    freezerTime: 180,
    basketTime: 14
  },
  {
    id: uuid(),
    name: "tofu",
    icon: require('../assets/icons/tofu.png'),
    fridgeTime: 7,
    freezerTime: 60,
    basketTime: 1
  },
  {
    id: uuid(),
    name: "spinach",
    icon: require('../assets/icons/spinach.png'),
    fridgeTime: 5,
    freezerTime: 60,
    basketTime: 2
  },
  {
    id: uuid(),
    name: "cucumber",
    icon: require('../assets/icons/cucumber.png'),
    fridgeTime: 7,
    freezerTime: 0,
    basketTime: 3
  },
  {
    id: uuid(),
    name: "mayonnaise",
    icon: require('../assets/icons/mayonnaise.png'),
    fridgeTime: 60,
    freezerTime: 0,
    basketTime: 30
  },
  {
    id: uuid(),
    name: "cabbage",
    icon: require('../assets/icons/cabbage.png'),
    fridgeTime: 14,
    freezerTime: 60,
    basketTime: 5
  },
  {
    id: uuid(),
    name: "corn",
    icon: require('../assets/icons/corn.png'),
    fridgeTime: 7,
    freezerTime: 90,
    basketTime: 3
  },
  {
    id: uuid(),
    name: "chicken",
    icon: require('../assets/icons/fried-chicken.png'),
    fridgeTime: 2,
    freezerTime: 60,
    basketTime: 1
  }
];
