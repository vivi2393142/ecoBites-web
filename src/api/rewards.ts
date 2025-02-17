import {
  useMutation,
  UseMutationOptions,
  useQuery,
  type DefinedInitialDataOptions,
} from '@tanstack/react-query';

import { RewardCuisine, RewardIngredient } from 'libs/schema';
// import * as path from 'api/path';
// import axiosClient from 'api/axiosClient';

/** getRewardCard */
// interface OriginGetRewardResponse {
//   status: string;
//   data: string[];
// }

interface GetRewardResponse {
  cards: RewardIngredient[];
}

export const useReward = (
  { amount }: { amount: number },
  options?: Omit<
    DefinedInitialDataOptions<GetRewardResponse, Error, GetRewardResponse>,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetRewardResponse>({
    queryKey: ['getReward'],
    queryFn: async () => {
      console.log('call getReward', { amount });

      // TODO: check api after cors
      // const { data: result } = await axiosClient.get<OriginGetRewardResponse>(
      //   `${path.REWARDS}?amount=${amount}`,
      // );

      // if (result.status === 'ok')
      //   return {
      //     cards: result.data
      //       .map((ingredient) => ingredient.toUpperCase())
      //       .filter((ingredient) =>
      //         Object.values(RewardIngredient).includes(ingredient as RewardIngredient),
      //       ) as RewardIngredient[],
      //   };

      return { cards: [RewardIngredient.APPLE, RewardIngredient.VEGETABLE, RewardIngredient.MEAT] };
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

// interface OriginReduceRewardCardResponse {
//   status: string;
//   data: string[];
// }

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
      console.log('call reduceReward', { payload });
      // TODO: finish api
      // const { data } = await axiosClient.patch<OriginReduceRewardCardResponse>(
      //   `${path.REDUCE_REWARDS}`,
      //   payload,
      // );
      // return { status: data.status };

      return { status: 'ok' };
    },
    ...options,
  });

/** addCuisineCard */
interface AddCuisineCardPayload {
  userId: string;
  items: Partial<Record<RewardCuisine, number>>;
}

// interface OriginAddCuisineCardPayload {
//   userId: string;
//   items: Record<string, number>;
// }

// interface OriginAddCuisineCardResponse {
//   status: string;
//   data: string[];
// }

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
      console.log('call addCuisineCard', { payload });
      // TODO: finish api
      // const { data } = await axiosClient.patch<OriginAddCuisineCardResponse>(
      //   `${path.REDUCE_REWARDS}`,
      //   payload,
      // );
      // return { status: data.status };

      return { status: 'ok' };
    },
    ...options,
  });
