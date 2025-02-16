import { useMemo } from 'react';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Fab from '@mui/material/Fab';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { Page } from 'libs/schema';
import { pageSettings } from 'libs/settings';

import { ReactComponent as AvatarIcon } from 'assets/icon/avatar.svg';

const settings = [
  {
    page: Page.HOME,
    label: 'Home',
    icon: <HomeIcon />,
  },
  { page: Page.REWARDS, label: 'Rewards', icon: <EmojiEventsIcon /> },
];

const MainLayout: FunctionComponent<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const location = useLocation();

  const value = useMemo(() => location.pathname.substring(1).toUpperCase(), [location]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Paper
        sx={(theme) => ({
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: theme.palette.background.default,
          p: 0.5,
          gap: 0.5,
        })}
        elevation={4}
      >
        <Box sx={{ padding: 1 }}>
          <Avatar
            alt="avatar"
            sx={{ justifySelf: 'flex-start', width: 32, height: 32, background: 'background' }}
          >
            <AvatarIcon />
          </Avatar>
        </Box>
        <Box>
          <Typography variant="h6">Gordon</Typography>
          <Typography variant="body2">Welcome back, Chef!</Typography>
        </Box>
        <Box sx={{ marginLeft: 'auto', padding: 1 }}>
          <IconButton aria-label="notify">
            <NotificationsNoneIcon />
          </IconButton>
        </Box>
      </Paper>
      <Container
        sx={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.75,
          py: 2,
          height: '100vh - 56px - 72px',
        }}
      >
        {children}
      </Container>
      <Paper sx={{ height: 56 }} elevation={4}>
        <Fab
          color="primary"
          sx={(theme) => ({
            position: 'absolute',
            bottom: theme.spacing(3.5),
            left: '50%',
            transform: 'translateX(-50%)',
            background: theme.palette.text.secondary,
            color: theme.palette.primary.contrastText,
          })}
        >
          <CameraAltIcon />
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              position: 'absolute',
              top: '100%',
              mt: 0.25,
              textTransform: 'none',
            }}
          >
            Scan
          </Typography>
        </Fab>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue: Page) => {
            navigate(pageSettings[newValue].route);
          }}
        >
          {settings.map(({ page, label, icon }) => (
            <BottomNavigationAction
              key={page}
              value={page}
              label={label}
              icon={icon}
              sx={{ maxWidth: 'none' }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default MainLayout;
