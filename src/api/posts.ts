import {
  type DefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';

// import * as path from 'api/path';
// import axiosClient from 'api/axiosClient';
import { CookHistory, Recipe } from 'libs/schema';
import { mockCookHistory } from 'libs/mockData';

/** getPostsByUserId */
// interface OriginGetPostsResponse {
//   status: string;
//   data: {
//     posts: {
//       id: string;
//       recipe_img: string | null;
//       user_id: string;
//       review: string | null;
//       type: 'draft';
//       recipe: {
//         recipe: string;
//         required_ingredients: string[];
//         instructions: string[];
//         addtional_ingredients_to_purchase: string[];
//         suggestion_time: string;
//         difficulty: string;
//       };
//     }[];
//   };
// }

interface GetPostsResponse {
  posts: CookHistory[];
}

export const usePosts = (
  { userId }: { userId: string },
  options?: Omit<
    DefinedInitialDataOptions<GetPostsResponse, Error, GetPostsResponse>,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetPostsResponse>({
    queryKey: ['getPosts'],
    queryFn: async () => {
      console.log('call getPosts', { userId });

      // TODO: check api after cors
      // const { data: result } = await axiosClient.get<OriginGetPostsResponse>(
      //   `${path.POSTS}?userId=${userId}`,
      // );

      // if (result.status === 'ok')
      //   return {
      //     posts: result.data.posts.map((p) => ({
      //       id: p.id,
      //       comment: p.review || '',
      //       img: p.recipe_img || '', // TODO: check type
      //       isDone: p.type !== 'draft',
      //       name: p.recipe.recipe,
      //       ingredients: p.recipe.required_ingredients,
      //       time: p.recipe.suggestion_time, // TODO: check with (mins) or not
      //       difficulty: p.recipe.difficulty,
      //       instructions: p.recipe.instructions,
      //     })),
      //   };

      return { posts: mockCookHistory };
    },
    ...options,
  });

/** createPostByUserId */
interface CreatePostPayload {
  userId: string;
  recipe: Recipe;
}

// interface OriginCreatePostPayload {
//   userId: string;
//   recipe: {
//     recipe: string;
//     required_ingredients: string[];
//     instructions: string[];
//     addtional_ingredients_to_purchase: string[];
//     suggestion_time: string;
//     difficulty: string;
//   };
// }

// interface OriginCreatePostResponse {
//   status: string;
//   data: {
//     postId: string;
//   };
// }

interface CreatePostResponse {
  postId: string;
}

export const useCreatePost = (
  options?: Omit<
    UseMutationOptions<CreatePostResponse, Error, CreatePostPayload, unknown>,
    'payload' | 'variables'
  >,
) =>
  useMutation({
    mutationFn: async (payload: CreatePostPayload) => {
      console.log('call createPost', { payload });
      // TODO: finish api
      // const originPayload: OriginCreatePostPayload = {
      //   userId: payload.userId,
      //   recipe: {
      //     recipe: payload.recipe.name,
      //     required_ingredients: payload.recipe.ingredients,
      //     instructions: payload.recipe.instructions,
      //     addtional_ingredients_to_purchase: [],
      //     suggestion_time: payload.recipe.time,
      //     difficulty: payload.recipe.difficulty,
      //   },
      // };
      // // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
      // const { data } = await axiosClient.post<OriginCreatePostResponse>(path.POSTS, originPayload);
      // return { postId: data.data.postId };

      return { postId: '2' };
    },
    ...options,
  });

/** getPostById */
// interface OriginGetPostsResponse {
//   status: string;
//   data: {
//     posts: {
//       id: string;
//       recipe_img: string | null;
//       user_id: string;
//       review: string | null;
//       type: 'draft';
//       recipe: {
//         recipe: string;
//         required_ingredients: string[];
//         instructions: string[];
//         addtional_ingredients_to_purchase: string[];
//         suggestion_time: string;
//         difficulty: string;
//       };
//     }[];
//   };
// }

// interface OriginGetPostByIdResponse {
//   status: string;
//   data: {
//     user_id: string;
//     recipe: {
//       recipe: string;
//       required_ingredients: string[];
//       instructions: string[];
//       addtional_ingredients_to_purchase: string[];
//       suggestion_time: string;
//       difficulty: string;
//     };
//     // e.g. 'https://storage.googleapis.com/eco-bites/fridge-pictures/6.jpeg';
//     recipe_img: string;
//     review: string;
//     type: string;
//     created_at: {
//       _seconds: number;
//       _nanoseconds: number;
//     };
//   };
// }

interface GetPostByIdResponse {
  post: CookHistory;
}

export const usePost = (
  { postId }: { postId: string },
  options?: Omit<
    DefinedInitialDataOptions<GetPostByIdResponse, Error, GetPostByIdResponse>,
    'queryKey' | 'initialData'
  >,
) =>
  useQuery<GetPostByIdResponse>({
    queryKey: ['getPostById', postId],
    queryFn: async () => {
      console.log('call getPostById', { postId });

      // TODO: check api after cors
      // const { data: result } = await axiosClient.get<OriginGetPostByIdResponse>(
      //   `${path.POSTS}/${postId}`,
      // );

      // if (result.status === 'ok')
      //   return {
      //     post: {
      //       id: postId,
      //       comment: result.data.review,
      //       img: result.data.recipe_img,
      //       isDone: result.data.type !== 'draft',
      //       name: result.data.recipe.recipe,
      //       ingredients: result.data.recipe.required_ingredients,
      //       time: result.data.recipe.suggestion_time, // TODO: check with (mins) or not
      //       difficulty: result.data.recipe.difficulty,
      //       instructions: result.data.recipe.instructions,
      //     },
      //   };

      return {
        post: mockCookHistory.find((history) => history.id === postId) || mockCookHistory[1],
      };
    },
    ...options,
  });

// interface OriginGetPostsResponse {
//   status: string;
//   data: {
//     posts: {
//       id: string;
//       recipe_img: string | null;
//       user_id: string;
//       review: string | null;
//       type: 'draft';
//       recipe: {
//         recipe: string;
//         required_ingredients: string[];
//         instructions: string[];
//         addtional_ingredients_to_purchase: string[];
//         suggestion_time: string;
//         difficulty: string;
//       };
//     }[];
//   };
// }

/** updatePostById */
interface UpdatePostPayload {
  postId: string;
  recipeImgUrl: string;
  review: string;
}

interface OriginUpdatePostPayload extends UpdatePostPayload {
  postId: string;
}

// interface OriginUpdatePostResponse {
//   status: string;
//   data: {
//     recipe_img: string;
//     type: 'draft' | 'published';
//     review: string;
//     published_at: {
//       _seconds: number;
//       _nanoseconds: number;
//     };
//     updated_at: {
//       _seconds: number;
//       _nanoseconds: number;
//     };
//   };
// }

interface UpdatePostResponse {
  status: string;
}

export const useUpdatePost = (
  options?: Omit<
    UseMutationOptions<UpdatePostResponse, Error, UpdatePostPayload, unknown>,
    'payload' | 'variables'
  >,
) =>
  useMutation({
    mutationFn: async ({ postId, ...payload }: OriginUpdatePostPayload) => {
      console.log('call updatePost', { postId, payload });
      // TODO: finish api
      // const { data } = await axiosClient.patch<OriginUpdatePostResponse>(
      //   `${path.POSTS}/${postId}`,
      //   payload,
      // );
      // return { status: data.status };

      return { status: 'ok' };
    },
    ...options,
  });

/** uploadImage */
interface UploadImagePayload {
  image: File;
  userId: string;
}

// interface OriginUploadImageResponse {
//   status: string;
//   data: {
//     url: string;
//   };
// }

interface UploadImageResponse {
  url: string | null;
}

export const useUploadImage = (
  options?: Omit<
    UseMutationOptions<UploadImageResponse, Error, UploadImagePayload, unknown>,
    'payload' | 'variables'
  >,
) =>
  useMutation({
    mutationFn: async ({ image, userId }: UploadImagePayload) => {
      console.log('call uploadImage', { image, userId });

      // TODO: finish api
      // const formData = new FormData();
      // formData.append('image', image);
      // formData.append('userId', userId);

      // // eslint-disable-next-line  @typescript-eslint/no-unsafe-argument
      // const { data } = await axiosClient.post<OriginUploadImageResponse>(
      //   path.UPLOAD_IMAGE,
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data', // 設定正確的 Content-Type
      //     },
      //   },
      // );
      // return { url: data.data.url || null };

      return { url: mockCookHistory[1].img };
    },
    ...options,
  });

/** finishPost */
interface FinishPostPayload {
  userId: string;
  postId: string;
}

interface FinishPostResponse {
  status: string;
}

export const useFinishPost = (
  options?: Omit<
    UseMutationOptions<FinishPostResponse, Error, FinishPostPayload, unknown>,
    'payload' | 'variables'
  >,
) =>
  useMutation({
    mutationFn: async ({ postId, ...payload }: FinishPostPayload) => {
      console.log('call finishPost', { postId, payload });
      // TODO: finish api, not sure path
      // const { data } = await axiosClient.post<FinishPostResponse>(
      //   `${path.FINISH_POST}/${postId}`,
      //   payload,
      // );
      // return { status: data.status };

      return { status: 'ok' };
    },
    ...options,
  });
