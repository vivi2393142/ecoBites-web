import { type FunctionComponent } from 'react';

import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import type { CookHistory } from 'libs/schema';

import TimeAndDifficulty from 'components/TimeAndDifficulty';

type CookHistoryCardProps = CookHistory;

const CookHistoryCard: FunctionComponent<CookHistoryCardProps> = ({
  name,
  img,
  time,
  difficulty,
  isDone,
}: CookHistoryCardProps) => {
  return (
    <Card sx={{ maxWidth: 345, position: 'relative' }}>
      {img ? (
        <CardMedia sx={{ height: 140 }} image={img} title="" />
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
            {isDone ? 'No image' : 'Your haven’t finish this cuisine, tap to continue.'}{' '}
          </Typography>
        </Box>
      )}
      <CardContent>
        {!isDone && <Chip label="Cooking" sx={{ position: 'absolute', top: 2, left: 2 }} />}
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <TimeAndDifficulty time={time} difficulty={difficulty} />
      </CardContent>
    </Card>
  );
};

export default CookHistoryCard;
