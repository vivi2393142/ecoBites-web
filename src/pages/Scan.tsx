import { useCallback, useEffect, useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { Page, Recipe } from 'libs/schema';
import { pageSettings } from 'libs/settings';
import { useScanResultAtom } from 'stores/atoms/scanResult';
import { useRecommendedRecipes } from 'api/recipes';
import { fileToBase64 } from 'libs/utils';
import { useCreatePost } from 'api/posts';
import { userId } from 'api/axiosClient';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';
import { useSnackbarAtom } from 'stores/atoms/snackbar';

// TODO: finish Scan page
const Scan: FunctionComponent = () => {
  const navigate = useNavigate();

  const { scanResult, addScanResult } = useScanResultAtom();
  const { showSnackbar } = useSnackbarAtom();

  const { data, isLoading } = useRecommendedRecipes(
    {
      image: scanResult.uploadedPhoto as File,
      amount: '3',
    },
    { enabled: !!(scanResult.uploadedPhoto && !scanResult.recommendedRecipes) },
  );
  const createPost = useCreatePost();

  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const handleMakeCuisine = useCallback(
    (recipe: Recipe) => {
      // TODO: call api to start cooking this cuisine
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

  useEffect(() => {
    void (async () => {
      if (scanResult.uploadedPhoto) {
        const base64Photo = await fileToBase64(scanResult.uploadedPhoto);
        setImgSrc(base64Photo);
      }
    })();
  }, [scanResult.uploadedPhoto]);

  // TODO: remove
  useEffect(() => {
    if (data) addScanResult({ recommendedRecipes: data.recommendedRecipes });
  }, [data, addScanResult]);

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {/* TODO: handle loading */}
        {isLoading ? <CircularProgress /> : null}
        <Typography variant="h5" sx={{ mt: 0.75 }}>
          Your Photo
        </Typography>
        {imgSrc && (
          <Box
            sx={(theme) => ({
              background: theme.palette.background.default,
              p: 1.5,
              borderRadius: 1,
            })}
          >
            <img src={imgSrc} alt="Captured" style={{ width: '100%' }} />
          </Box>
        )}
        <Typography variant="h5" sx={{ mt: 0.75 }}>
          Suggestions
        </Typography>
        {!isLoading && (
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
        )}
      </Box>
    </MainLayout>
  );
};

export default Scan;
