import { type DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import * as path from 'api/path';
import axiosClient, { axiosClientLocal } from 'api/axiosClient';
import { Recipe } from 'libs/schema';
import { isArray } from 'libs/validators';
import { capitalize } from 'libs/utils';

/** getFridgeRecipes */
const extractJsonFromResponse = (response: string) => {
  const jsonStart = response.indexOf('```json');
  const jsonEnd = response.lastIndexOf('```');
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('No JSON found in the response');
  }
  const jsonString = response.slice(jsonStart + 7, jsonEnd).trim();
  return jsonString;
};

const parseRecipes = (response: string) => {
  try {
    const jsonString = extractJsonFromResponse(response);
    const recipes: unknown = JSON.parse(jsonString);
    return recipes;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return [];
  }
};

interface OriginGetRecommendedRecipesResponse {
  status: string;
  data: string;
}

interface OriginRecipe {
  recipe: string;
  required_ingredients: string[];
  suggestion_time: string;
  difficulty: string;
  instructions: string[];
}

interface GetRecommendedRecipesResponse {
  recommendedRecipes: Recipe[] | null;
}

// TODO: check api, use local currently
// export const useRecommendedRecipes = (
//   { image, amount }: { image: File; amount: string },
//   options?: Omit<
//     DefinedInitialDataOptions<GetRecommendedRecipesResponse, Error, GetRecommendedRecipesResponse>,
//     'queryKey' | 'initialData'
//   >,
// ) =>
//   useQuery<GetRecommendedRecipesResponse>({
//     queryKey: ['getRecipes'],
//     queryFn: async () => {
//       console.log('call getRecipes', { image, amount });
//       const formData = new FormData();
//       formData.append('image', image);
//       formData.append('amount', amount);

//       const { data: result } = await axiosClientLocal.get<OriginGetRecommendedRecipesResponse>(
//         path.GET_RECIPES_FROM_PHOTO,
//         {
//           params: formData,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         },
//       );

//       const parsedResult = parseRecipes(result.data) as OriginRecipe[];
//       const mappingResult = parsedResult.reduce<Recipe[]>((acc, curr) => {
//         if (
//           curr.recipe &&
//           isArray(curr.required_ingredients) &&
//           curr.suggestion_time &&
//           curr.difficulty &&
//           isArray(curr.instructions)
//         ) {
//           acc.push({
//             name: curr.recipe,
//             ingredients: curr.required_ingredients,
//             time: curr.suggestion_time,
//             difficulty: capitalize(curr.difficulty),
//             instructions: curr.instructions,
//           });
//         }
//         return acc;
//       }, []);

//       if (result.status === 'ok') return { recommendedRecipes: mappingResult };
//       return { recommendedRecipes: null };
//     },
//     ...options,
//   });

/** getFridgeRecipesByUrl */
// TODO: check api, use local currently
export const useRecommendedRecipesByUrl = (
  { imgUrl, amount }: { imgUrl: string; amount: string },
  options?: Omit<
    DefinedInitialDataOptions<GetRecommendedRecipesResponse, Error, GetRecommendedRecipesResponse>,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetRecommendedRecipesResponse>({
    queryKey: ['getRecipesByUrl', imgUrl],
    queryFn: async () => {
      console.log('getRecipesByUrl', { imgUrl });
      const { data: result } = await axiosClientLocal.get<OriginGetRecommendedRecipesResponse>(
        `${path.GET_RECIPES_FROM_PHOTO}/url?url=${imgUrl}&amount=${amount}`,
      );
      console.log('after getRecipesByUrl', { imgUrl });

      const parsedResult = parseRecipes(result.data) as OriginRecipe[];
      const mappingResult = parsedResult.reduce<Recipe[]>((acc, curr) => {
        if (
          curr.recipe &&
          isArray(curr.required_ingredients) &&
          curr.suggestion_time &&
          curr.difficulty &&
          isArray(curr.instructions)
        ) {
          acc.push({
            name: curr.recipe,
            ingredients: curr.required_ingredients,
            time: curr.suggestion_time,
            difficulty: capitalize(curr.difficulty),
            instructions: curr.instructions,
          });
        }
        return acc;
      }, []);

      if (result.status === 'ok') return { recommendedRecipes: mappingResult };
      return { recommendedRecipes: null };
    },
    ...options,
  });

/** getRandomRecipesRecommand */
interface GetRandomRecommendedRecipesResponse {
  recommendedRecipes: Recipe[] | null;
}

export const useRandomRecommendedRecipes = (
  { amount }: { amount: number },
  options?: Omit<
    DefinedInitialDataOptions<
      GetRandomRecommendedRecipesResponse,
      Error,
      GetRandomRecommendedRecipesResponse
    >,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetRandomRecommendedRecipesResponse>({
    queryKey: ['getRandomRecipes', amount],
    queryFn: async () => {
      const { data: result } = await axiosClient.get<OriginGetRecommendedRecipesResponse>(
        `${path.GET_RANDOM_RECIPES_FROM_PHOTO}?amount=${amount}`,
      );

      const parsedResult = parseRecipes(result.data) as OriginRecipe[];
      const mappingResult = parsedResult.reduce<Recipe[]>((acc, curr) => {
        if (
          curr.recipe &&
          isArray(curr.required_ingredients) &&
          curr.suggestion_time &&
          curr.difficulty &&
          isArray(curr.instructions)
        ) {
          acc.push({
            name: curr.recipe,
            ingredients: curr.required_ingredients,
            time: curr.suggestion_time,
            difficulty: capitalize(curr.difficulty),
            instructions: curr.instructions,
          });
        }
        return acc;
      }, []);
      console.log({ result, parsedResult, mappingResult });

      if (result.status === 'ok') return { recommendedRecipes: mappingResult };
      return { recommendedRecipes: null };
      // return { recommendedRecipes: mockRecipes };
    },
    ...options,
  });
