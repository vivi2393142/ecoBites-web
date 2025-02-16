import { Page, type PageSetting, RewardIngredient, RewardCuisine } from './schema';

import appleImg from '../assets/img/apple.png';
import breadImg from '../assets/img/bread.png';
import butterImg from '../assets/img/butter.png';
import cakeImg from '../assets/img/cake.png';
import eggImg from '../assets/img/egg.png';
import fishAndChipsImg from '../assets/img/fish_and_chips.png';
import fishImg from '../assets/img/fish.png';
import flourImg from '../assets/img/flour.png';
import friedRiceImg from '../assets/img/fried_rice.png';
import meatImg from '../assets/img/meat.png';
import riceImg from '../assets/img/rice.png';
import saladImg from '../assets/img/salad.png';
import vegetableImg from '../assets/img/vegetable.png';

export const pageSettings: Record<Page, PageSetting> = {
  [Page.HOME]: {
    route: '/home',
    // TODO: get label, icon, enable from API
    label: 'Home',
  },
  [Page.REWARDS]: {
    route: '/rewards',
    label: 'Rewards',
  },
  [Page.SCAN]: {
    route: '/scan',
    label: 'Scan Result',
  },
  [Page.COOKING]: {
    route: '/cooking', // with recipe id
    label: 'Cooking',
  },
};

export const rewardRecipe = {
  [RewardCuisine.BREAD]: {
    style: 'Bakery',
    ingredients: [RewardIngredient.EGG, RewardIngredient.FLOUR],
  },
  [RewardCuisine.CAKE]: {
    style: 'Bakery',
    ingredients: [
      RewardIngredient.EGG,
      RewardIngredient.FLOUR,
      RewardIngredient.BUTTER,
      RewardIngredient.APPLE,
    ],
  },
  [RewardCuisine.SALAD]: {
    style: 'Cold Dishes',
    ingredients: [RewardIngredient.MEAT, RewardIngredient.VEGETABLE],
  },
  [RewardCuisine.FRIED_RICE]: {
    style: 'Chinese Cuisine',
    ingredients: [RewardIngredient.MEAT, RewardIngredient.VEGETABLE, RewardIngredient.RICE],
  },
  [RewardCuisine.FISH_AND_CHIPS]: {
    style: 'English Cuisine',
    ingredients: [RewardIngredient.FISH, RewardIngredient.FLOUR],
  },
};

export const ingredientToImage = {
  [RewardIngredient.APPLE]: appleImg,
  [RewardIngredient.BUTTER]: butterImg,
  [RewardIngredient.EGG]: eggImg,
  [RewardIngredient.FISH]: fishImg,
  [RewardIngredient.FLOUR]: flourImg,
  [RewardIngredient.MEAT]: meatImg,
  [RewardIngredient.RICE]: riceImg,
  [RewardIngredient.VEGETABLE]: vegetableImg,
};

export const cuisineToImage = {
  [RewardCuisine.BREAD]: breadImg,
  [RewardCuisine.CAKE]: cakeImg,
  [RewardCuisine.FRIED_RICE]: friedRiceImg,
  [RewardCuisine.SALAD]: saladImg,
  [RewardCuisine.FISH_AND_CHIPS]: fishAndChipsImg,
};

export const rewardIngredientLabel = {
  EGG: 'Egg',
  FLOUR: 'Flour',
  BUTTER: 'Butter',
  APPLE: 'Apple',
  VEGETABLE: 'Vegetable',
  MEAT: 'Meat',
  RICE: 'Rice',
  FISH: 'Fish',
};

export const rewardCuisineLabel = {
  BREAD: 'Bread',
  CAKE: 'Cake',
  FRIED_RICE: 'Fried Rice',
  SALAD: 'Salad',
  FISH_AND_CHIPS: 'Fish & Chips',
};
