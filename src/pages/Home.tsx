import { useCallback, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { pageSettings } from 'libs/settings';
import { Page } from 'libs/schema';
import { mockCookHistory, mockRecipes } from 'libs/mockData';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';
import CookHistoryCard from 'components/CookHistoryCard';

// TODO: finish home page
const Home: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleClickScan = useCallback(() => {
    navigate(pageSettings[Page.SCAN].route);
  }, [navigate]);

  return (
    <MainLayout>
      <Button onClick={handleClickScan}>to scan</Button>
      <Typography variant="h4">{`Today's Suggestions`}</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {mockRecipes.map((recipe, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <RecipeCard key={idx} type="simple" {...recipe} />
        ))}
      </Box>
      <Typography variant="h4">Your Cuisines</Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {Object.entries(mockCookHistory).map(([id, recipe]) => (
          <CookHistoryCard key={id} {...recipe} />
        ))}
      </Box>
    </MainLayout>
  );
};

export default Home;
