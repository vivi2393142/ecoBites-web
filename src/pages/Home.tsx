import { useCallback, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { useScanResultAtom } from 'stores/atoms/scanResult';
import { pageSettings } from 'libs/settings';
import { Page, Recipe } from 'libs/schema';
import { uploadPhotoFile } from 'libs/utils';
import { useSnackbarAtom } from 'stores/atoms/snackbar';
import { useRandomRecommendedRecipes } from 'api/recipes';
import { usePosts } from 'api/posts';
import { userId } from 'api/axiosClient';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';
import CookHistoryCard from 'components/CookHistoryCard';

const Home: FunctionComponent = () => {
  const navigate = useNavigate();

  const { addScanPhoto } = useScanResultAtom();
  const { showSnackbar } = useSnackbarAtom();

  const { data: randomRecipesData } = useRandomRecommendedRecipes({
    amount: 3,
  });
  const { data: postsData } = usePosts({ userId });

  const handleClickScan = useCallback(() => {
    void (async () => {
      try {
        const newPhoto = await uploadPhotoFile();
        // TODO: call api to get results
        // addScanResult({ recommendedRecipes: mockRecipes });
        addScanPhoto({ uploadedPhoto: newPhoto });
        showSnackbar({
          message: `You got a new ingredient card! Check 'Rewards' to see the details.`,
        });
        navigate(pageSettings[Page.SCAN].route);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate, showSnackbar, addScanPhoto]);

  const handleToNewCook = (recipe: Recipe) => {
    console.log({ recipe });
    // TODO
    // 1. call api to save starting recipe
    // 2. navigate to return id
    navigate(`${pageSettings[Page.COOKING].route}?cuisine=${1}`);
  };

  const handleToHistoryCook = (cuisineId: string) => {
    navigate(`${pageSettings[Page.COOKING].route}?cuisine=${cuisineId}`);
  };

  return (
    <MainLayout>
      <Card
        sx={(theme) => ({
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <CardActionArea onClick={handleClickScan}>
          <CardContent
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: theme.palette.primary.contrastText,
              gap: 0.5,
            })}
          >
            <CameraAltIcon />
            <Typography
              variant="body2"
              sx={(theme) => ({
                color: theme.palette.primary.contrastText,
              })}
            >
              Tap to scan ingredient
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Typography variant="h5" sx={{ mt: 0.75 }}>{`Today's Suggestions`}</Typography>
      <Box
        sx={{ display: 'flex', gap: 1, flexShrink: 0, overflowX: 'auto', scrollbarWidth: 'none' }}
      >
        {randomRecipesData?.recommendedRecipes.map((recipe, idx) => (
          <RecipeCard
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            type="simple"
            {...recipe}
            sx={{ flexShrink: 0, width: 250 }}
            onClick={() => {
              handleToNewCook(recipe);
            }}
          />
        ))}
      </Box>
      <Typography variant="h5" sx={{ mt: 0.75 }}>
        Your Cuisines
      </Typography>
      <Box
        sx={{ display: 'flex', gap: 1, flexShrink: 0, overflowX: 'auto', scrollbarWidth: 'none' }}
      >
        {postsData?.posts.map((post) => (
          <CookHistoryCard
            key={post.id}
            {...post}
            sx={{ flexShrink: 0, width: 275 }}
            onClick={() => {
              handleToHistoryCook(post.id);
            }}
          />
        ))}
      </Box>
    </MainLayout>
  );
};

export default Home;
