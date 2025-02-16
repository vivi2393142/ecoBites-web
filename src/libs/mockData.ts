import { CookHistory, Difficulty, type Recipe, RewardCuisine, RewardIngredient } from 'libs/schema';

export const mockRecipes: Recipe[] = [
  {
    name: 'Sausage and Pak Choi Stir-Fry with Greek Yogurt Dressing',
    ingredients: [
      'British Pork Sausages',
      'Pak Choi',
      'Greek Style Yogurt',
      'Spring Onions',
      'Soy Sauce',
      'Sesame Oil',
      'Garlic',
      'Ginger',
    ],
    time: 20,
    difficulty: Difficulty.EASY,
    instructions: [
      'Slice sausages and stir-fry until cooked through.',
      'Add chopped Pak Choi and spring onions, stir-fry until tender-crisp.',
      'Serve with a dollop of Greek yogurt as a dressing.',
    ],
  },
  {
    name: 'Frittata with Sausage, Pepper and Spring Onion',
    ingredients: [
      'Eggs',
      'British Pork Sausages',
      'Orange Bell Pepper',
      'Spring Onions',
      'Olive Oil',
      'Cheese (optional)',
    ],
    time: 35,
    difficulty: Difficulty.MEDIUM,
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Slice sausages and peppers, chop spring onions. Cook sausages until browned, then add peppers and onions and cook until softened.',
      'Whisk eggs and pour over the sausage and vegetable mixture in an oven-safe skillet. Bake for 20-25 minutes, or until set.',
    ],
  },
  {
    name: 'Greek Yogurt and Pak Choi Salad with Sausage Croutons',
    ingredients: [
      'Greek Style Yogurt',
      'Pak Choi',
      'British Pork Sausages',
      'Lettuce/Cabbage',
      'Bread',
      'Lemon',
      'Salt',
      'Pepper',
    ],
    time: 25,
    difficulty: Difficulty.MEDIUM,
    instructions: [
      'Chop Lettuce/Cabbage and Pak Choi and mix in a bowl.',
      'Slice sausages and cube bread. Cook sausages until browned and crispy, then toss with bread cubes to create croutons.',
      'Whisk Greek yogurt with lemon juice, salt, and pepper. Toss salad with dressing and top with sausage croutons.',
    ],
  },
];

export const mockRewardCuisines = {
  [RewardCuisine.BREAD]: 3,
  [RewardCuisine.CAKE]: 0,
  [RewardCuisine.FRIED_RICE]: 1,
  [RewardCuisine.SALAD]: 0,
  [RewardCuisine.FISH_AND_CHIPS]: 0,
};

export const mockRewardIngredients = {
  [RewardIngredient.APPLE]: 1,
  [RewardIngredient.BUTTER]: 0,
  [RewardIngredient.EGG]: 0,
  [RewardIngredient.FISH]: 3,
  [RewardIngredient.FLOUR]: 0,
  [RewardIngredient.MEAT]: 5,
  [RewardIngredient.RICE]: 0,
  [RewardIngredient.VEGETABLE]: 1,
};

export const mockCookHistory: Record<string, CookHistory> = {
  '1': {
    name: 'Sausage and Pak Choi Stir-Fry with Greek Yogurt Dressing',
    ingredients: [
      'British Pork Sausages',
      'Pak Choi',
      'Greek Style Yogurt',
      'Spring Onions',
      'Soy Sauce',
      'Sesame Oil',
      'Garlic',
      'Ginger',
    ],
    time: 20,
    difficulty: Difficulty.EASY,
    instructions: [
      'Slice sausages and stir-fry until cooked through.',
      'Add chopped Pak Choi and spring onions, stir-fry until tender-crisp.',
      'Serve with a dollop of Greek yogurt as a dressing.',
    ],
    comment: '',
    img: '',
    isDone: false,
  },
  '2': {
    name: 'Frittata with Sausage, Pepper and Spring Onion',
    ingredients: [
      'Eggs',
      'British Pork Sausages',
      'Orange Bell Pepper',
      'Spring Onions',
      'Olive Oil',
      'Cheese (optional)',
    ],
    time: 35,
    difficulty: Difficulty.MEDIUM,
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Slice sausages and peppers, chop spring onions. Cook sausages until browned, then add peppers and onions and cook until softened.',
      'Whisk eggs and pour over the sausage and vegetable mixture in an oven-safe skillet. Bake for 20-25 minutes, or until set.',
    ],
    comment: '',
    img: '',
    isDone: true,
  },
};
