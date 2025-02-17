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
import { useSnackbarAtom } from 'stores/atoms/snackbar';
import { useAddCuisineCard, useReduceRewardCard, useUserRewards } from 'api/rewards';
import { userId } from 'api/axiosClient';

import MainLayout from 'components/common/MainLayout';
import RewardCard from 'components/RewardCard';
import MixCuisineCard from 'components/MixCuisineCard';

enum RewardTab {
  REWARDS = 'REWARDS',
  MIX = 'MIX',
}

const Rewards: FunctionComponent = () => {
  const [tab, setTab] = useState<RewardTab>(RewardTab.REWARDS);

  const { showSnackbar } = useSnackbarAtom();

  const reduceReward = useReduceRewardCard();
  const addCuisineCard = useAddCuisineCard();
  const { data: rewardsData, refetch: refetchRewards } = useUserRewards({ userId });

  const handleChange = useCallback((_: SyntheticEvent, newTab: RewardTab) => {
    setTab(newTab);
  }, []);

  const lackCuisines = useMemo(
    () => Object.values(RewardCuisine).filter((cuisine) => !rewardsData?.cuisineCards?.[cuisine]),
    [rewardsData?.cuisineCards],
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
                  void refetchRewards();
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
    [showSnackbar, refetchRewards, addCuisineCard, reduceReward],
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
                  order={
                    Object.values(RewardCuisine).length - (rewardsData?.cuisineCards?.[type] || 0)
                  }
                >
                  <RewardCard
                    label={rewardCuisineLabel[type]}
                    src={cuisineToImage[type]}
                    ctn={rewardsData?.cuisineCards?.[type] || 0}
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
                    Object.values(RewardIngredient).length -
                    (rewardsData?.ingredientCards?.[type] || 0)
                  }
                >
                  <RewardCard
                    label={rewardIngredientLabel[type]}
                    src={ingredientToImage[type]}
                    ctn={rewardsData?.ingredientCards?.[type] || 0}
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
                ownIngredients={rewardsData?.ingredientCards || {}}
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
