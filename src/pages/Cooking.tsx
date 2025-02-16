import { useCallback, useMemo, useState, type FunctionComponent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { Page, RewardIngredient } from 'libs/schema';
import { mockCookHistory } from 'libs/mockData';
import { ingredientToImage, pageSettings } from 'libs/settings';
import { capitalize, uploadPhotoFile } from 'libs/utils';
import congratulationImg from 'assets/img/congratulation.png';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';

interface EarnedCardProps {
  ingredient: RewardIngredient;
}

const EarnedCard: FunctionComponent<EarnedCardProps> = ({ ingredient }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 1.5,
        gap: 1.5,
        alignItems: 'center',
        width: '75%',
      }}
    >
      <img alt={ingredient} src={ingredientToImage[ingredient]} />
      <Typography variant="h6">{capitalize(ingredient)}</Typography>
    </Paper>
  );
};

interface EarnedRewardProps {
  cookingId: string;
  ingredients: RewardIngredient[];
}

const EarnedReward: FunctionComponent<EarnedRewardProps> = ({ cookingId, ingredients }) => {
  const navigate = useNavigate();

  const handleToRewards = useCallback(() => {
    navigate(pageSettings[Page.REWARDS].route);
  }, [navigate]);

  const handleToCooking = useCallback(() => {
    navigate(`${pageSettings[Page.COOKING].route}?cuisine=${cookingId}`);
  }, [navigate, cookingId]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', mt: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
        <img
          alt="congratulation"
          src={congratulationImg}
          style={{
            width: '64px',
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25, alignItems: 'center' }}>
          <Typography variant="h5">Congratulations</Typography>
          <Typography variant="body2" color="textSecondary">
            You got 3 new ingredient cards!
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexShrink: 0,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          width: '100%',
        }}
      >
        {ingredients.map((ingredient) => (
          <EarnedCard key={ingredient} ingredient={ingredient} />
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column', width: '100%' }}>
        <Button variant="contained" onClick={handleToRewards}>
          Go to My Rewards
        </Button>
        <Button variant="outlined" onClick={handleToCooking}>
          Check My Cuisine
        </Button>
      </Box>
    </Box>
  );
};

// TODO: redesign Cooking page
const Cooking: FunctionComponent = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const cuisineId = searchParams.get('cuisine');

  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [earnedCards, setEarnedCards] = useState<RewardIngredient[] | null>(null);

  const recipe = useMemo(() => {
    if (cuisineId) return mockCookHistory?.[cuisineId] || null;
    return null;
  }, [cuisineId]);

  const handleBackHome = useCallback(() => {
    navigate(Page.HOME);
  }, [navigate]);

  const handleComplete = useCallback(() => {
    // TODO: handle complete
    // TODO: handle get reward and call api
    setEarnedCards([RewardIngredient.VEGETABLE, RewardIngredient.EGG]);
  }, []);

  const handleSave = useCallback(() => {
    // TODO: handle save
  }, []);

  const handleUploadPhoto = useCallback(() => {
    void (async () => {
      try {
        const newPhoto = await uploadPhotoFile();
        setUploadedPhoto(newPhoto);
        // TODO: call api to upload photo
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <MainLayout>
      {earnedCards && cuisineId ? (
        <EarnedReward cookingId={cuisineId} ingredients={earnedCards} />
      ) : null}
      {!earnedCards && recipe ? (
        <RecipeCard
          {...recipe}
          type="expand-detail"
          childrenBefore={
            recipe.isDone &&
            (recipe?.img ? (
              <CardMedia sx={{ height: 140 }} image={recipe.img} title="" />
            ) : (
              <Box
                sx={(theme) => ({
                  height: 140,
                  backgroundColor: theme.palette.grey[300],
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.palette.text.secondary,
                })}
              >
                <OutdoorGrillIcon fontSize="large" />
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                  No image
                </Typography>
              </Box>
            ))
          }
        >
          <Typography variant="h6" sx={{ mt: 0.75 }}>
            Your Review
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              multiline
              rows={3}
              placeholder="Share your experience..."
              sx={(theme) => ({ width: '100%', background: theme.palette.background.default })}
            />
            <Box
              sx={(theme) => ({
                width: '100%',
                height: 80,
                border: `2px dashed ${theme.palette.grey[400]}`,
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: theme.palette.text.secondary,
              })}
              onClick={handleUploadPhoto}
            >
              {uploadedPhoto ? (
                <img
                  src={uploadedPhoto}
                  alt="Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              ) : (
                <>
                  <IconButton>
                    <CameraAltIcon fontSize="medium" />
                  </IconButton>
                  <Typography>Upload your photo</Typography>
                </>
              )}
            </Box>
            {recipe.isDone ? (
              <Button variant="contained" onClick={handleBackHome}>
                Back to Home
              </Button>
            ) : (
              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column' }}>
                <Button variant="contained" onClick={handleComplete}>
                  Complete
                </Button>
                <Button variant="outlined" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            )}
          </Box>
        </RecipeCard>
      ) : null}
      {!earnedCards && !recipe ? (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6">No recipe found</Typography>
          <Typography variant="h6">No recipe found</Typography>
          <Button variant="contained" onClick={handleBackHome}>
            Back to Home
          </Button>
        </Box>
      ) : null}
    </MainLayout>
  );
};

export default Cooking;
