import type { FunctionComponent } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import type { CookHistory } from 'libs/schema';

import TimeAndDifficulty from 'components/TimeAndDifficulty';

interface CookHistoryCardProps extends CookHistory {
  onClick: () => void;
  sx?: SxProps<Theme>;
}

const CookHistoryCard: FunctionComponent<CookHistoryCardProps> = ({
  name,
  img,
  time,
  difficulty,
  isDone,
  onClick,
  sx,
}: CookHistoryCardProps) => (
  <Card sx={{ ...sx, position: 'relative', order: isDone ? 1 : 0 }}>
    <CardActionArea onClick={onClick}>
      {img ? (
        <CardMedia sx={{ height: 120 }} image={img} title="" />
      ) : (
        <Box
          sx={(theme) => ({
            height: 120,
            backgroundColor: theme.palette.grey[300],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.text.secondary,
          })}
        >
          <OutdoorGrillIcon fontSize="large" />
          <Typography variant="body2" align="center" sx={{ mt: 1, px: 2 }}>
            {isDone ? 'No image' : 'Your haven’t finish this cuisine, tap to continue.'}
          </Typography>
        </Box>
      )}
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {!isDone && (
            <Chip
              label="Cooking"
              size="small"
              color="secondary"
              sx={(theme) => ({
                position: 'absolute',
                top: theme.spacing(1.25),
                right: theme.spacing(1.25),
              })}
            />
          )}
          <Typography gutterBottom variant="subtitle2">
            {name}
          </Typography>
          <TimeAndDifficulty time={time} difficulty={difficulty} />
        </Box>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default CookHistoryCard;
