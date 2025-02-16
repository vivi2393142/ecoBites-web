import {
  ReactNode,
  useCallback,
  useState,
  type FunctionComponent,
  type PropsWithChildren,
} from 'react';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import type { Recipe } from 'libs/schema';

import TimeAndDifficulty from 'components/TimeAndDifficulty';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled(IconButton)<ExpandMoreProps>(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface RecipeCardProps extends Recipe, PropsWithChildren {
  type: 'simple' | 'collapse-detail' | 'expand-detail';
  childrenBefore?: ReactNode;
}

const RecipeCard: FunctionComponent<RecipeCardProps> = ({
  type,
  name,
  ingredients,
  time,
  difficulty,
  instructions,
  childrenBefore,
  children,
}: RecipeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Card>
      <CardContent>
        {childrenBefore}
        <Typography variant="h6">{name}</Typography>
        <TimeAndDifficulty time={time} difficulty={difficulty} />
        {type === 'simple' && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {ingredients.map((ingredient) => (
              <Chip key={ingredient} label={ingredient} />
            ))}
          </Box>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {type !== 'simple' && (
        <>
          <Divider />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h4">Ingredients</Typography>
              {ingredients.map((ingredient) => (
                <Typography key={ingredient} variant="body1">
                  {ingredient}
                </Typography>
              ))}
              <List>
                {ingredients.map((ingredient) => (
                  <ListItem key={ingredient}>
                    <ListItemIcon>
                      <FiberManualRecordIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h4">Steps</Typography>
              <List>
                {instructions.map((step, idx) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: 'black',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                        }}
                      >
                        {idx + 1}
                      </div>
                    </ListItemIcon>
                    <ListItemText primary={step} />
                  </ListItem>
                ))}
              </List>
              {children}
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  );
};

export default RecipeCard;
