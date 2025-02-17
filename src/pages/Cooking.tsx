import { ChangeEvent, useCallback, useEffect, useState, type FunctionComponent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Grid from '@mui/material/Unstable_Grid2';

import { Page, RewardIngredient } from 'libs/schema';
import { ingredientToImage, pageSettings } from 'libs/settings';
import { capitalize, uploadPhotoFile } from 'libs/utils';
import congratulationImg from 'assets/img/congratulation.png';
import { useFinishPost, usePost, useUpdatePost, useUploadImage } from 'api/posts';
import { userId } from 'api/axiosClient';
import { useSnackbarAtom } from 'stores/atoms/snackbar';
import { useReward } from 'api/rewards';

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
      }}
    >
      <img alt={ingredient} src={ingredientToImage[ingredient]} style={{ maxWidth: '100%' }} />
      <Typography variant="h6">{capitalize(ingredient)}</Typography>
    </Paper>
  );
};

interface EarnedRewardProps {
  ingredients: RewardIngredient[];
  onBackToCooking: () => void;
}

const EarnedReward: FunctionComponent<EarnedRewardProps> = ({ ingredients, onBackToCooking }) => {
  const navigate = useNavigate();

  const handleToRewards = useCallback(() => {
    navigate(pageSettings[Page.REWARDS].route);
  }, [navigate]);

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
      <Grid container spacing={2} mb={1}>
        {ingredients.map((ingredient) => (
          <Grid key={ingredient} xs={4}>
            <EarnedCard key={ingredient} ingredient={ingredient} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column', width: '100%' }}>
        <Button variant="contained" onClick={handleToRewards}>
          Go to My Rewards
        </Button>
        <Button variant="outlined" onClick={onBackToCooking}>
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

  const { showSnackbar } = useSnackbarAtom();

  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);
  const [reviewValue, setReviewValue] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: postData, refetch: refetchPost } = usePost(
    { postId: cuisineId || '' },
    {
      enabled: !!cuisineId,
    },
  );
  const updatePost = useUpdatePost();
  const finishPost = useFinishPost();
  const uploadImage = useUploadImage();
  const { data: rewardData } = useReward(
    {
      amount: 3,
    },
    { enabled: isSubmitted },
  );

  const handleBackHome = useCallback(() => {
    navigate(Page.HOME);
  }, [navigate]);

  const handleComplete = useCallback(() => {
    // TODO: handle complete
    // TODO: handle get reward and call api
    if (!cuisineId) return;
    finishPost.mutate(
      { postId: cuisineId, userId },
      {
        onSuccess: () => {
          setIsSubmitted(true);
        },
        onError: () => {
          showSnackbar({ message: 'Fail to save, please try again.', severity: 'error' });
        },
      },
    );
    // setEarnedCards([RewardIngredient.VEGETABLE, RewardIngredient.EGG]);
  }, [cuisineId, finishPost, showSnackbar]);

  const handleSave = useCallback(() => {
    if (!cuisineId) return;
    updatePost.mutate(
      {
        postId: cuisineId,
        recipeImgUrl: uploadedPhotoUrl || '',
        review: reviewValue,
      },
      {
        onSuccess: () => {
          showSnackbar({ message: 'Save successfully!', severity: 'success' });
        },
        onError: () => {
          showSnackbar({ message: 'Fail to save, please try again.', severity: 'error' });
        },
      },
    );
  }, [showSnackbar, cuisineId, uploadedPhotoUrl, reviewValue, updatePost]);

  const handleUploadPhoto = useCallback(() => {
    void (async () => {
      try {
        const newPhoto = await uploadPhotoFile();
        uploadImage.mutate(
          {
            image: newPhoto,
            userId,
          },
          {
            onSuccess: (response) => {
              setUploadedPhotoUrl(response.url);
            },
          },
        );
        // TODO: call api to upload photo
      } catch (error) {
        console.error(error);
      }
    })();
  }, [uploadImage]);

  const handleChangeReviewValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setReviewValue(e.target.value);
  }, []);

  const handleBackToCooking = useCallback(() => {
    void refetchPost();
    setIsSubmitted(false);
  }, [refetchPost]);

  useEffect(() => {
    setReviewValue(postData?.post.comment || '');
    setUploadedPhotoUrl(postData?.post.img || null);
  }, [postData?.post]);

  return (
    <MainLayout>
      {isSubmitted ? (
        <EarnedReward ingredients={rewardData?.cards || []} onBackToCooking={handleBackToCooking} />
      ) : null}
      {!isSubmitted && postData?.post ? (
        <RecipeCard
          {...postData.post}
          type="expand-detail"
          childrenBefore={
            postData.post.isDone &&
            (postData.post?.img ? (
              <img src={postData.post.img} alt="Captured" style={{ width: '100%' }} />
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
                  mb: 1,
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
              value={postData.post.isDone && !reviewValue ? '---' : reviewValue}
              onChange={handleChangeReviewValue}
              multiline
              rows={3}
              placeholder={!postData.post.isDone ? 'Share your experience...' : undefined}
              sx={(theme) => ({ width: '100%', background: theme.palette.background.default })}
              disabled={postData.post.isDone}
            />
            {!postData.post.isDone &&
              (uploadedPhotoUrl ? (
                <img
                  src={uploadedPhotoUrl}
                  alt="Uploaded"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              ) : (
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
                  <IconButton>
                    <CameraAltIcon fontSize="medium" />
                  </IconButton>
                  <Typography>Upload your photo</Typography>
                </Box>
              ))}
            {postData.post.isDone ? (
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
      {!isSubmitted && !postData?.post ? (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center' }}>
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
