import {
  useMutation,
  UseMutationOptions,
  useQuery,
  type DefinedInitialDataOptions,
} from '@tanstack/react-query';

import { RewardCuisine, RewardIngredient } from 'libs/schema';
import * as path from 'api/path';
import axiosClient from 'api/axiosClient';

/** getUserRewards */
interface OriginGetUserRewardsResponse {
  status: string;
  data: {
    email: string;
    username: string;
    ingredient_cards_collection: Record<string, number>;
    recipe_cards_collecton: Record<string, number>;
    created_at: {
      _seconds: number;
      _nanoseconds: number;
    };
  };
}

interface GetUserRewardsResponse {
  ingredientCards: Partial<Record<RewardIngredient, number>>;
  cuisineCards: Partial<Record<RewardCuisine, number>>;
}

export const useUserRewards = (
  { userId }: { userId: string },
  options?: Omit<
    DefinedInitialDataOptions<GetUserRewardsResponse, Error, GetUserRewardsResponse>,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetUserRewardsResponse>({
    queryKey: ['getUserRewards'],
    queryFn: async () => {
      const { data: result } = await axiosClient.get<OriginGetUserRewardsResponse>(
        `${path.USER_REWARDS}/${userId}`,
      );

      if (result.status === 'ok') {
        const newIngredientCards: Partial<GetUserRewardsResponse['ingredientCards']> = {};
        Object.entries(result.data.recipe_cards_collecton).forEach(([name, ctn]) => {
          const uppercasedName = name.toUpperCase() as RewardIngredient;
          if (Object.values(RewardIngredient).includes(uppercasedName)) {
            newIngredientCards[uppercasedName] = ctn;
          }
        });
        const newCuisineCards: Partial<GetUserRewardsResponse['cuisineCards']> = {};
        Object.entries(result.data.ingredient_cards_collection).forEach(([name, ctn]) => {
          const uppercasedName = name.toUpperCase() as RewardCuisine;
          if (Object.values(RewardCuisine).includes(uppercasedName)) {
            newCuisineCards[uppercasedName] = ctn;
          }
        });

        return {
          ingredientCards: newIngredientCards,
          cuisineCards: newCuisineCards,
        };
      }

      return { ingredientCards: {}, cuisineCards: {} };
    },
    ...options,
    refetchOnMount: true,
  });

/** getRewardCard */
interface OriginGetRewardResponse {
  status: string;
  data: string[];
}

interface GetRewardResponse {
  cards: RewardIngredient[];
}

export const useReward = (
  { amount, userId }: { amount: number; userId: string },
  options?: Omit<
    DefinedInitialDataOptions<GetRewardResponse, Error, GetRewardResponse>,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetRewardResponse>({
    queryKey: ['getReward'],
    queryFn: async () => {
      const { data: result } = await axiosClient.get<OriginGetRewardResponse>(
        `${path.REWARDS}?amount=${amount}&userId=${userId}`,
      );

      if (result.status === 'ok') {
        return {
          cards: result.data
            .map((ingredient) => ingredient.toUpperCase())
            .filter((ingredient) =>
              Object.values(RewardIngredient).includes(ingredient as RewardIngredient),
            ) as RewardIngredient[],
        };
      }

      return { cards: [] };
    },
    ...options,
  });

/** reduceRewardCard */
interface ReduceRewardCardPayload {
  userId: string;
  items: Partial<Record<RewardIngredient, number>>;
}

interface OriginReduceRewardCardPayload {
  userId: string;
  items: Record<string, number>;
}

interface OriginReduceRewardCardResponse {
  status: string;
  data: string[];
}

interface ReduceRewardCardResponse {
  status: string;
}

export const useReduceRewardCard = (
  options?: Omit<
    UseMutationOptions<ReduceRewardCardResponse, Error, ReduceRewardCardPayload, unknown>,
    'payload' | 'variables'
  >,
) =>
  useMutation({
    mutationFn: async (payload: OriginReduceRewardCardPayload) => {
      const { data } = await axiosClient.patch<OriginReduceRewardCardResponse>(
        `${path.REDUCE_REWARDS}`,
        payload,
      );
      return { status: data.status };
    },
    ...options,
  });

/** addCuisineCard */
interface AddCuisineCardPayload {
  userId: string;
  items: Partial<Record<RewardCuisine, number>>;
}

interface OriginAddCuisineCardResponse {
  status: string;
  data: string[];
}

interface AddCuisineCardResponse {
  status: string;
}

export const useAddCuisineCard = (
  options?: Omit<
    UseMutationOptions<AddCuisineCardResponse, Error, AddCuisineCardPayload, unknown>,
    'payload' | 'variables'
  >,
) =>
  useMutation({
    mutationFn: async (payload: AddCuisineCardPayload) => {
      const { data } = await axiosClient.patch<OriginAddCuisineCardResponse>(
        `${path.ADD_CUISINE_REWARD}`,
        payload,
      );
      return { status: data.status };
    },
    ...options,
  });
