export enum Page {
  HOME = 'HOME',
  REWARDS = 'REWARDS',
  COOKING = 'COOKING',
  SCAN = 'SCAN',
}

export interface PageSetting {
  route: string;
  label: string;
  // children?: Record<string, Pick<GuardFunctionSetting, 'route' | 'defaultLabel'>>;
}

export enum RewardIngredient {
  EGG = 'EGG',
  FLOUR = 'FLOUR',
  BUTTER = 'BUTTER',
  APPLE = 'APPLE',
  VEGETABLE = 'VEGETABLE',
  MEAT = 'MEAT',
  RICE = 'RICE',
  FISH = 'FISH',
}

export enum RewardCuisine {
  BREAD = 'BREAD',
  CAKE = 'CAKE',
  FRIED_RICE = 'FRIED_RICE',
  SALAD = 'SALAD',
  FISH_AND_CHIPS = 'FISH_AND_CHIPS',
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export interface Recipe {
  name: string;
  ingredients: string[];
  time: number;
  difficulty: Difficulty;
  instructions: string[];
}

export interface CookHistory extends Recipe {
  comment: string;
  img: string; // TODO: check type
  isDone: boolean;
}
