import { type DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

// import * as path from 'api/path';
// import axiosClient from 'api/axiosClient';
import { Recipe } from 'libs/schema';
import { mockRecipes } from 'libs/mockData';
// import { isArray } from 'libs/validators';
// import { capitalize } from 'libs/utils';

/** getFridgeRecipes */
// const extractJsonFromResponse = (response: string) => {
//   const jsonStart = response.indexOf('```json');
//   const jsonEnd = response.lastIndexOf('```');
//   if (jsonStart === -1 || jsonEnd === -1) {
//     throw new Error('No JSON found in the response');
//   }
//   const jsonString = response.slice(jsonStart + 7, jsonEnd).trim();
//   return jsonString;
// };

// const parseRecipes = (response: string) => {
//   try {
//     const jsonString = extractJsonFromResponse(response);
//     const recipes: unknown = JSON.parse(jsonString);
//     return recipes;
//   } catch (error) {
//     console.error('Failed to parse JSON:', error);
//     return [];
//   }
// };

// interface OriginGetRecommendedRecipesResponse {
//   status: string;
//   data: string;
// }

// interface OriginRecipe {
//   recipe: string;
//   required_ingredients: string[];
//   suggestion_time: string;
//   difficulty: string;
//   instructions: string[];
// }

interface GetRecommendedRecipesResponse {
  recommendedRecipes: Recipe[];
}

export const useRecommendedRecipes = (
  { image, amount }: { image: File; amount: string },
  options?: Omit<
    DefinedInitialDataOptions<GetRecommendedRecipesResponse, Error, GetRecommendedRecipesResponse>,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetRecommendedRecipesResponse>({
    queryKey: ['getRecipes'],
    queryFn: async () => {
      console.log('call getRecipes', { image, amount });
      const formData = new FormData();
      formData.append('image', image);
      formData.append('amount', amount);

      // const { data: result } = await axiosClient.get<OriginGetRecommendedRecipesResponse>(
      //   path.GET_RECIPES_FROM_PHOTO,
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data', // 設定正確的 Content-Type
      //     },
      //   },
      // );

      // TODO: check api after cors
      // const parsedResult = parseRecipes(result.data) as OriginRecipe[];
      // const mappingResult = parsedResult.reduce<Recipe[]>((acc, curr) => {
      //   if (
      //     curr.recipe &&
      //     isArray(curr.required_ingredients) &&
      //     curr.suggestion_time &&
      //     curr.difficulty &&
      //     isArray(curr.instructions)
      //   ) {
      //     acc.push({
      //       name: curr.recipe,
      //       ingredients: curr.required_ingredients,
      //       time: curr.suggestion_time,
      //       difficulty: capitalize(curr.difficulty),
      //       instructions: curr.instructions,
      //     });
      //   }
      //   return acc;
      // }, []);

      // if (result.status === 'ok') return { recommendedRecipes: mappingResult };

      return { recommendedRecipes: mockRecipes };
    },
    ...options,
  });

/** getRandomRecipesRecommand */
// interface GetRandomRecommendedRecipesResponse {
//   recommendedRecipes: Recipe[];
// }

export const useRandomRecommendedRecipes = (
  { amount }: { amount: number },
  options?: Omit<
    DefinedInitialDataOptions<GetRecommendedRecipesResponse, Error, GetRecommendedRecipesResponse>,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetRecommendedRecipesResponse>({
    queryKey: ['getRandomRecipes'],
    queryFn: async () => {
      console.log('call getRandomRecipes', { amount });
      // const { data: result } = await axiosClient.get<OriginGetRecommendedRecipesResponse>(
      //   `${path.GET_RANDOM_RECIPES_FROM_PHOTO}?amount=${amount}`,
      // );

      // // TODO: check api after cors
      // const parsedResult = parseRecipes(result.data) as OriginRecipe[];
      // const mappingResult = parsedResult.reduce<Recipe[]>((acc, curr) => {
      //   if (
      //     curr.recipe &&
      //     isArray(curr.required_ingredients) &&
      //     curr.suggestion_time &&
      //     curr.difficulty &&
      //     isArray(curr.instructions)
      //   ) {
      //     acc.push({
      //       name: curr.recipe,
      //       ingredients: curr.required_ingredients,
      //       time: curr.suggestion_time,
      //       difficulty: capitalize(curr.difficulty),
      //       instructions: curr.instructions,
      //     });
      //   }
      //   return acc;
      // }, []);

      // if (result.status === 'ok') return { recommendedRecipes: mappingResult };

      return { recommendedRecipes: mockRecipes };
    },
    ...options,
  });
