import { ChangeEvent, useCallback, useMemo, useRef, useState, type FunctionComponent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { Page } from 'libs/schema';
import { mockCookHistory } from 'libs/mockData';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';

// TODO: redesign Cooking page
const Cooking: FunctionComponent = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const cuisineId = searchParams.get('cuisine');

  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const recipe = useMemo(() => {
    if (cuisineId) return mockCookHistory?.[cuisineId] || null;
    return null;
  }, [cuisineId]);

  const handleBackHome = useCallback(() => {
    navigate(Page.HOME);
  }, [navigate]);

  const handleComplete = useCallback(() => {
    // TODO: handle complete
    // TODO: handle get reward
  }, []);

  const handleSave = useCallback(() => {
    // TODO: handle save
  }, []);

  const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, []);

  return (
    <MainLayout>
      {recipe ? (
        <RecipeCard
          {...recipe}
          type="expand-detail"
          childrenBefore={
            recipe?.img ? (
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
            )
          }
        >
          <Typography variant="h6">Your Review</Typography>
          {/* 上傳圖片區塊 */}
          <Box
            sx={{
              mt: 2,
              width: '100%',
              height: 150,
              border: '2px dashed gray',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'gray',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
              <>
                <IconButton color="primary">
                  <CameraAltIcon fontSize="large" />
                </IconButton>
                <Typography>Upload your photo</Typography>
              </>
            )}
          </Box>

          {/* 隱藏的 input 元素 */}
          <input
            type="file"
            ref={fileInputRef}
            id="imageUpload"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          {recipe.isDone ? (
            <Button variant="contained" onClick={handleBackHome}>
              Back to Home
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" onClick={handleComplete}>
                Complete
              </Button>
              <Button variant="contained" color="info" onClick={handleSave}>
                Save
              </Button>
            </Box>
          )}
        </RecipeCard>
      ) : (
        'loading' // TODO: handle fallback
      )}
    </MainLayout>
  );
};

export default Cooking;
