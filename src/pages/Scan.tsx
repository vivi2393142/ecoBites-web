import { useCallback, useEffect, useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import { Page, Recipe } from 'libs/schema';
import { pageSettings } from 'libs/settings';
import { useScanResultAtom } from 'stores/atoms/scanResult';
import { useRecommendedRecipesByUrl } from 'api/recipes';
import { useCreatePost, useUploadImage } from 'api/posts';
import { useSnackbarAtom } from 'stores/atoms/snackbar';
import { userId } from 'api/axiosClient';
import { useReward } from 'api/rewards';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';

const Scan: FunctionComponent = () => {
  const navigate = useNavigate();

  const { scanResult, addScanResult } = useScanResultAtom();
  const { showSnackbar } = useSnackbarAtom();

  const [isGetRecommend, setIsGetRecommend] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  const uploadImage = useUploadImage();
  const { data } = useRecommendedRecipesByUrl(
    {
      imgUrl: uploadedPhotoUrl || '',
      amount: '3',
    },
    { enabled: !!uploadedPhotoUrl },
  );

  useEffect(() => {
    if (!scanResult.uploadedPhoto || uploadedPhotoUrl || uploadImage.isPending) {
      return;
    }

    uploadImage.mutate(
      {
        image: scanResult.uploadedPhoto,
        userId,
      },
      {
        onSuccess: (response) => {
          setUploadedPhotoUrl((prev) => prev || response.url);
        },
        onError: () => {},
        onSettled: () => {},
      },
    );
  }, [scanResult.uploadedPhoto, uploadedPhotoUrl, uploadImage]);

  useEffect(() => {
    if (data) addScanResult({ recommendedRecipes: data.recommendedRecipes });
  }, [data, addScanResult]);

  const { data: rewardData } = useReward({ userId, amount: 1 }, { enabled: isGetRecommend });
  const createPost = useCreatePost();

  useEffect(() => {
    if (data) setIsGetRecommend(true);
  }, [data]);

  useEffect(() => {
    if (rewardData?.cards) {
      showSnackbar({
        severity: 'success',
        message: 'You got 1 ingredient, check it at REWARDS.',
      });
    }
  }, [rewardData?.cards, showSnackbar]);

  const handleMakeCuisine = useCallback(
    (recipe: Recipe) => {
      createPost.mutate(
        {
          userId,
          recipe,
        },
        {
          onSuccess: (response) => {
            navigate(`${pageSettings[Page.COOKING].route}?cuisine=${response.postId}`);
          },
          onError: () => {
            showSnackbar({
              severity: 'error',
              message: 'Fail to start cooking.',
            });
          },
        },
      );
    },
    [navigate, createPost, showSnackbar],
  );

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <Typography variant="h5" sx={{ mt: 0.75 }}>
          Your Photo
        </Typography>
        {uploadedPhotoUrl && (
          <Box
            sx={(theme) => ({
              background: theme.palette.background.default,
              p: 1.5,
              borderRadius: 1,
            })}
          >
            <img src={uploadedPhotoUrl} alt="Captured" style={{ width: '100%' }} />
          </Box>
        )}
        <Typography variant="h5" sx={{ mt: 0.75 }}>
          Suggestions
        </Typography>
        {scanResult.recommendedRecipes?.length ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {scanResult.recommendedRecipes?.map((recipe, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <RecipeCard key={idx} {...recipe} type="collapse-detail">
                <Button
                  variant="contained"
                  onClick={() => {
                    handleMakeCuisine(recipe);
                  }}
                  sx={{ width: '100%' }}
                >
                  Make This Cuisine
                </Button>
              </RecipeCard>
            ))}
          </Box>
        ) : (
          Array.from({ length: 3 }, (_, idx) => (
            <Skeleton
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              variant="rounded"
              width="100%"
              height={122.75}
            />
          ))
        )}
      </Box>
    </MainLayout>
  );
};

export default Scan;
