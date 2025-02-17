import { type SyntheticEvent, useCallback, useState, type FunctionComponent, useMemo } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import {
  ingredientToImage,
  cuisineToImage,
  rewardCuisineLabel,
  rewardIngredientLabel,
  rewardRecipe,
} from 'libs/settings';

import { capitalize } from 'libs/utils';
import { RewardIngredient, RewardCuisine } from 'libs/schema';
import { mockRewardCuisines, mockRewardIngredients } from 'libs/mockData';
import { useSnackbarAtom } from 'stores/atoms/snackbar';
import { userId } from 'api/axiosClient';
import { useAddCuisineCard, useReduceRewardCard } from 'api/rewards';

import MainLayout from 'components/common/MainLayout';
import RewardCard from 'components/RewardCard';
import MixCuisineCard from 'components/MixCuisineCard';

enum RewardTab {
  REWARDS = 'REWARDS',
  MIX = 'MIX',
}

// TODO: finish rewards page
const Rewards: FunctionComponent = () => {
  const [tab, setTab] = useState<RewardTab>(RewardTab.REWARDS);

  const { showSnackbar } = useSnackbarAtom();

  const reduceReward = useReduceRewardCard();
  const addCuisineCard = useAddCuisineCard();

  const handleChange = useCallback((_: SyntheticEvent, newTab: RewardTab) => {
    setTab(newTab);
  }, []);

  const lackCuisines = useMemo(
    () => Object.values(RewardCuisine).filter((cuisine) => !mockRewardCuisines[cuisine]),
    [],
  );

  const handleMix = useCallback(
    (cuisine: RewardCuisine) => {
      addCuisineCard.mutate(
        { userId, items: { [cuisine]: 1 } },
        {
          onSuccess: () => {
            const neededItems: Partial<Record<RewardIngredient, number>> = {};
            rewardRecipe[cuisine].ingredients.forEach((ingredient) => {
              neededItems[ingredient] = 1;
            });
            reduceReward.mutate(
              { userId, items: neededItems },
              {
                onSuccess: () => {
                  showSnackbar({
                    message: `You got a new cuisine card ${rewardCuisineLabel[cuisine]}!`,
                    severity: 'success',
                  });
                },
                onError: () => {
                  showSnackbar({
                    message: 'Fail to mix card, please try again.',
                    severity: 'error',
                  });
                },
              },
            );
          },
          onError: () => {
            showSnackbar({
              message: 'Fail to mix card, please try again.',
              severity: 'error',
            });
          },
        },
      );
      setTab(RewardTab.REWARDS);
    },
    [showSnackbar, addCuisineCard, reduceReward],
  );

  return (
    <MainLayout noPadding>
      <TabContext value={tab}>
        <TabList
          onChange={handleChange}
          sx={(theme) => ({ display: 'flex', background: theme.palette.background.default })}
        >
          {Object.values(RewardTab).map((value) => (
            <Tab key={value} label={capitalize(value)} value={value} sx={{ flex: 1 }} />
          ))}
        </TabList>
        <TabPanel value={RewardTab.REWARDS} sx={{ py: 0, px: 2, overflow: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
            <Typography variant="h5" sx={{ mt: 0.75 }}>
              Cuisines
            </Typography>
            <Grid container spacing={1.5}>
              {Object.values(RewardCuisine).map((type) => (
                <Grid
                  key={type}
                  md={3}
                  xs={4}
                  order={Object.values(RewardCuisine).length - (mockRewardCuisines?.[type] || 0)}
                >
                  <RewardCard
                    label={rewardCuisineLabel[type]}
                    src={cuisineToImage[type]}
                    ctn={mockRewardCuisines?.[type] || 0}
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h5" sx={{ mt: 0.75 }}>
              Ingredients
            </Typography>
            <Grid container spacing={2} mb={1}>
              {Object.values(RewardIngredient).map((type) => (
                <Grid
                  key={type}
                  md={3}
                  xs={4}
                  order={
                    Object.values(RewardIngredient).length - (mockRewardIngredients?.[type] || 0)
                  }
                >
                  <RewardCard
                    label={rewardIngredientLabel[type]}
                    src={ingredientToImage[type]}
                    ctn={mockRewardIngredients?.[type] || 0}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={RewardTab.MIX} sx={{ py: 1, px: 2, overflow: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {lackCuisines.map((cuisine) => (
              <MixCuisineCard
                key={cuisine}
                cuisine={cuisine}
                style={rewardRecipe[cuisine].style}
                ingredients={rewardRecipe[cuisine].ingredients}
                img={cuisineToImage[cuisine]}
                // TODO: get from api
                ownIngredients={mockRewardIngredients}
                onMix={handleMix}
              />
            ))}
          </Box>
        </TabPanel>
      </TabContext>
    </MainLayout>
  );
};

export default Rewards;
