import { useCallback, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Page } from 'libs/schema';
import { pageSettings } from 'libs/settings';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';
import { useScanResultAtom } from 'stores/atoms/scanResult';

// TODO: finish Scan page
const Scan: FunctionComponent = () => {
  const navigate = useNavigate();

  const { scanResult } = useScanResultAtom();

  const handleMakeCuisine = useCallback(() => {
    // TODO: call api to start cooking this cuisine
    console.log('1. call api to save recipe');
    console.log('2. get the id back');
    console.log('3. navigate to this id');
    // TODO: change id '1' to actual one
    navigate(`${pageSettings[Page.COOKING].route}?cuisine=${1}`);
  }, [navigate]);

  return (
    <MainLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {scanResult.recommendedRecipes?.map((recipe, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <RecipeCard key={idx} {...recipe} type="collapse-detail">
            <Button variant="contained" onClick={handleMakeCuisine} sx={{ width: '100%' }}>
              Make This Cuisine
            </Button>
          </RecipeCard>
        ))}
      </Box>
    </MainLayout>
  );
};

export default Scan;
