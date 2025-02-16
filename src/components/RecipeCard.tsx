import {
  ReactNode,
  useCallback,
  useState,
  type FunctionComponent,
  type PropsWithChildren,
} from 'react';
import { styled, type SxProps, Theme } from '@mui/material/styles';

import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardActionArea from '@mui/material/CardActionArea';
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
  isExpanded: boolean;
}

const ExpandMore = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<ExpandMoreProps>(({ theme, isExpanded }) => ({
  transform: !isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type RecipeCardHeaderProps = Pick<
  RecipeCardProps,
  'name' | 'time' | 'difficulty' | 'type' | 'ingredients' | 'children'
>;

const RecipeCardHeader: FunctionComponent<RecipeCardHeaderProps> = ({
  name,
  time,
  difficulty,
  type,
  ingredients,
  children,
}) => (
  <CardContent sx={type === 'expand-detail' ? { p: 0 } : {}}>
    {children}
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant={type !== 'simple' ? 'h6' : 'subtitle2'}>{name}</Typography>
      <TimeAndDifficulty time={time} difficulty={difficulty} />
      {type === 'simple' && (
        <Box sx={{ display: 'flex', gap: 1, overflow: 'auto', scrollbarWidth: 'none' }}>
          {ingredients.map((ingredient) => (
            <Chip key={ingredient} label={ingredient} size="small" />
          ))}
        </Box>
      )}
    </Box>
  </CardContent>
);

type RecipeStepsProps = Pick<RecipeCardProps, 'type' | 'ingredients' | 'instructions' | 'children'>;

const RecipeSteps: FunctionComponent<RecipeStepsProps> = ({
  type,
  ingredients,
  instructions,
  children,
}: RecipeStepsProps) => (
  <CardContent
    sx={
      type === 'expand-detail' ? { p: 0, display: 'flex', flexDirection: 'column', gap: 0.75 } : {}
    }
  >
    <Typography variant="h6" sx={{ mt: 0.75 }}>
      Ingredients
    </Typography>
    <List sx={{ p: 0 }}>
      {ingredients.map((ingredient) => (
        <ListItem key={ingredient} sx={{ p: 0 }}>
          <ListItemIcon sx={{ minWidth: '16px' }}>
            <FiberManualRecordIcon sx={{ fontSize: '0.5rem' }} />
          </ListItemIcon>
          <ListItemText primary={ingredient} sx={{ m: 0 }} />
        </ListItem>
      ))}
    </List>
    <Typography variant="h6">Steps</Typography>
    <List sx={{ p: 0 }}>
      {instructions.map((step, idx) => (
        <ListItem
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          sx={{
            px: 0,
            pt: 0,
            pb: 0.75,
            display: 'flex',
            gap: 0.5,
            alignItems: 'flex-start',
          }}
        >
          <ListItemIcon sx={{ minWidth: '16px' }}>
            <Box
              sx={(theme) => ({
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: theme.palette.text.primary,
                color: theme.palette.primary.contrastText,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                mt: 0.5,
              })}
            >
              {idx + 1}
            </Box>
          </ListItemIcon>
          <ListItemText primary={step} sx={{ m: 0 }} />
        </ListItem>
      ))}
    </List>
    {children}
  </CardContent>
);

interface RecipeCardProps extends Recipe, PropsWithChildren {
  type: 'simple' | 'collapse-detail' | 'expand-detail';
  onClick?: () => void;
  childrenBefore?: ReactNode;
  sx?: SxProps<Theme>;
}

const RecipeCard: FunctionComponent<RecipeCardProps> = ({
  type,
  name,
  ingredients,
  time,
  difficulty,
  instructions,
  onClick,
  childrenBefore,
  children,
  sx,
}: RecipeCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const headerProps = { name, time, difficulty, type, ingredients, children: childrenBefore };

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <Card
      sx={{
        ...sx,
        ...(type === 'expand-detail'
          ? { background: 'none', boxShadow: 'none', overflow: 'visible' }
          : {}),
      }}
    >
      <Box sx={type !== 'simple' ? { display: 'flex', gap: 2 } : {}}>
        {onClick ? (
          <CardActionArea onClick={onClick}>
            <RecipeCardHeader {...headerProps} />
          </CardActionArea>
        ) : (
          <RecipeCardHeader {...headerProps} />
        )}
        {type === 'collapse-detail' && (
          <CardActions disableSpacing>
            <ExpandMore
              isExpanded={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              size="small"
            >
              <ExpandMoreIcon fontSize="small" />
            </ExpandMore>
          </CardActions>
        )}
      </Box>
      {type === 'collapse-detail' && (
        <>
          <Divider />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <RecipeSteps type={type} ingredients={ingredients} instructions={instructions}>
              {children}
            </RecipeSteps>
          </Collapse>
        </>
      )}
      {type === 'expand-detail' && (
        <>
          <Divider />
          <RecipeSteps type={type} ingredients={ingredients} instructions={instructions}>
            {children}
          </RecipeSteps>
        </>
      )}
    </Card>
  );
};

export default RecipeCard;
