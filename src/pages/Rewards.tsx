import { type SyntheticEvent, useCallback, useState, type FunctionComponent } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { ingredientToImage, cuisineToImage } from 'libs/settings';

import { capitalize } from 'libs/utils';
import { RewardIngredient, RewardCuisine } from 'libs/schema';
import { mockRewardCuisines, mockRewardIngredients } from 'libs/mockData';

import MainLayout from 'components/common/MainLayout';
import RewardCard from 'components/RewardCard';

enum RewardTab {
  REWARDS = 'REWARDS',
  MIX = 'MIX',
}

// TODO: finish rewards page
const Rewards: FunctionComponent = () => {
  const [tab, setTab] = useState<RewardTab>(RewardTab.REWARDS);

  const handleChange = useCallback((_: SyntheticEvent, newTab: RewardTab) => {
    setTab(newTab);
  }, []);

  return (
    <MainLayout>
      Rewards
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {Object.values(RewardTab).map((value) => (
              <Tab key={value} label={capitalize(value)} value={value} />
            ))}
          </TabList>
        </Box>
        <TabPanel value={RewardTab.REWARDS}>
          <Typography variant="h4">Cuisines</Typography>
          <Grid container spacing={2} mb={1}>
            {Object.values(RewardCuisine).map((type) => (
              <Grid key={type} md={3} xs={6}>
                <RewardCard
                  label={capitalize(type)}
                  src={cuisineToImage[type]}
                  ctn={mockRewardCuisines?.[type] || 0}
                />
              </Grid>
            ))}
          </Grid>
          <Typography variant="h4">Ingredients</Typography>
          <Grid container spacing={2} mb={1}>
            {Object.values(RewardIngredient).map((type) => (
              <Grid key={type} md={3} xs={6}>
                <RewardCard
                  label={capitalize(type)}
                  src={ingredientToImage[type]}
                  ctn={mockRewardIngredients?.[type] || 0}
                />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={RewardTab.MIX}>mix</TabPanel>
      </TabContext>
    </MainLayout>
  );
};

export default Rewards;
