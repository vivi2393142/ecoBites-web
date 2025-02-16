import type { FunctionComponent } from 'react';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import type { Recipe } from 'libs/schema';

type TimeAndDifficultyProps = Pick<Recipe, 'time' | 'difficulty'>;

const TimeAndDifficulty: FunctionComponent<TimeAndDifficultyProps> = ({
  time,
  difficulty,
}: TimeAndDifficultyProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Box>
        <AccessTimeIcon />
        <Typography variant="body2">{time} mins</Typography>
      </Box>
      <Typography variant="body2">•</Typography>
      <Box>
        <AutoGraphIcon />
        {/* TODO: change level to cute image */}
        <Typography variant="body2">{difficulty.toLocaleLowerCase()}</Typography>
      </Box>
    </Box>
  );
};

export default TimeAndDifficulty;
