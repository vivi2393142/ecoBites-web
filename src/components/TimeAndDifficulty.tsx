import type { FunctionComponent } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { Recipe } from 'libs/schema';
import { capitalize } from 'libs/utils';

type TimeAndDifficultyProps = Pick<Recipe, 'time' | 'difficulty'>;

const TimeAndDifficulty: FunctionComponent<TimeAndDifficultyProps> = ({
  time,
  difficulty,
}: TimeAndDifficultyProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <AccessTimeIcon fontSize="small" />
        <Typography variant="body2" noWrap>
          {time} mins
        </Typography>
      </Box>
      <Typography variant="body2">•</Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <AutoGraphIcon fontSize="small" />
        <Typography variant="body2" noWrap>
          {capitalize(difficulty)}
        </Typography>
      </Box>
    </Box>
  );
};

export default TimeAndDifficulty;
