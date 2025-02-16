import { useCallback, useMemo, useState, type FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { capitalize } from 'libs/utils';
import { RewardCuisine, RewardIngredient } from 'libs/schema';
import { rewardCuisineLabel, rewardRecipe } from 'libs/settings';

interface ExpandMoreProps {
  isExpanded: boolean;
}

const ExpandMore = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<ExpandMoreProps>(({ theme, isExpanded }) => ({
  transform: !isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface MixCuisineCardProps {
  cuisine: RewardCuisine;
  style: string;
  ingredients: RewardIngredient[];
  img: string;
  ownIngredients: Record<RewardIngredient, number>;
  onMix: (cuisine: RewardCuisine) => void;
}

const MixCuisineCard: FunctionComponent<MixCuisineCardProps> = ({
  cuisine,
  style,
  ingredients,
  img,
  ownIngredients,
  onMix,
}: MixCuisineCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const isMakeable = useMemo(() => {
    const neededIngredients = rewardRecipe[cuisine].ingredients;
    return neededIngredients.every((ingredient) => ownIngredients?.[ingredient] > 0);
  }, [cuisine, ownIngredients]);

  const handleMix = useCallback(() => {
    onMix(cuisine);
  }, [onMix, cuisine]);

  return (
    <Card sx={{ order: isMakeable ? 0 : 1 }}>
      <CardActionArea onClick={handleExpandClick}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CardContent sx={{ mr: 'auto' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ width: 40, height: 40 }}>
                <img
                  alt={cuisine}
                  src={img}
                  style={{
                    width: '100%',
                    filter: isMakeable ? 'none' : 'grayscale(100%)',
                    opacity: isMakeable ? 1 : 0.6,
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">{rewardCuisineLabel[cuisine]}</Typography>
                <Typography variant="body2">{style}</Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions disableSpacing sx={{ p: 1.5 }}>
            <ExpandMore isExpanded={expanded} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon fontSize="small" />
            </ExpandMore>
          </CardActions>
        </Box>
      </CardActionArea>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
          <Typography variant="body2">Required Ingredients</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {ingredients.map((ingredient) => (
              <Chip
                key={ingredient}
                label={capitalize(ingredient)}
                color={ownIngredients?.[ingredient] ? 'primary' : undefined}
                size="small"
              />
            ))}
          </Box>
          {isMakeable && (
            <Button variant="contained" onClick={handleMix} sx={{ width: '100%' }}>
              Mix This Card
            </Button>
          )}
        </Box>
      </Collapse>
    </Card>
  );
};

export default MixCuisineCard;
