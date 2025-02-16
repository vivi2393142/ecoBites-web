import { useCallback, useEffect, useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { mockCookHistory, mockRecipes } from 'libs/mockData';
import { useScanResultAtom } from 'stores/atoms/scanResult';
import { pageSettings } from 'libs/settings';
import { Page, Recipe } from 'libs/schema';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';
import CookHistoryCard from 'components/CookHistoryCard';
import { uploadPhotoFile } from 'libs/utils';

const Home: FunctionComponent = () => {
  const navigate = useNavigate();

  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const { addScanResult } = useScanResultAtom();

  const handleClickScan = useCallback(() => {
    void (async () => {
      try {
        const newPhoto = await uploadPhotoFile();
        setUploadedPhoto(newPhoto);
        // TODO: call api to get results
        addScanResult({ recommendedRecipes: mockRecipes });
        navigate(pageSettings[Page.SCAN].route);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate, addScanResult]);

  // TODO: remove this
  useEffect(() => {
    console.log({ uploadedPhoto });
  }, [uploadedPhoto]);

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
        })}
      >
        <CardActionArea onClick={handleClickScan} sx={{ height: '100%' }}>
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
      {/* {imageSrc && (
        <div>
          <h2>結果：</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )} */}
      <Typography variant="h5" sx={{ mt: 0.75 }}>{`Today's Suggestions`}</Typography>
      <Box
        sx={{ display: 'flex', gap: 1, flexShrink: 0, overflowX: 'auto', scrollbarWidth: 'none' }}
      >
        {mockRecipes.map((recipe, idx) => (
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
        {Object.entries(mockCookHistory).map(([id, recipe]) => (
          <CookHistoryCard
            key={id}
            {...recipe}
            sx={{ flexShrink: 0, width: 275 }}
            onClick={() => {
              handleToHistoryCook(id);
            }}
          />
        ))}
      </Box>
    </MainLayout>
  );
};

export default Home;
