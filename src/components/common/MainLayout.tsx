import { useCallback, useMemo } from 'react';
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
import { uploadPhotoFile } from 'libs/utils';
import { ReactComponent as AvatarIcon } from 'assets/icon/avatar.svg';
import { useScanResultAtom } from 'stores/atoms/scanResult';
import { useSnackbarAtom } from 'stores/atoms/snackbar';

const settings = [
  {
    page: Page.HOME,
    label: 'Home',
    icon: <HomeIcon />,
  },
  { page: Page.REWARDS, label: 'Rewards', icon: <EmojiEventsIcon /> },
];

interface MainLayoutProps extends PropsWithChildren {
  noPadding?: boolean;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({
  noPadding,
  children,
}: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const value = useMemo(() => location.pathname.substring(1).toUpperCase(), [location]);

  const { addScanPhoto } = useScanResultAtom();
  const { showSnackbar } = useSnackbarAtom();

  const handleClickCamera = useCallback(() => {
    void (async () => {
      try {
        const newPhoto = await uploadPhotoFile();
        // TODO: call api to get results
        // addScanResult({ recommendedRecipes: mockRecipes });
        addScanPhoto({ uploadedPhoto: newPhoto });
        showSnackbar({
          message: `You got a new ingredient card! Check REWARDS to see the details.`,
        });
        navigate(pageSettings[Page.SCAN].route);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate, showSnackbar, addScanPhoto]);

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
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
          zIndex: theme.zIndex.appBar,
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
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.75,
          py: noPadding ? 0 : 2,
          maxHeight: 'calc(100dvh - 56px - 64px)',
          ...(noPadding && { p: 0 }),
        }}
      >
        {children}
      </Container>
      <Paper sx={(theme) => ({ height: 56, zIndex: theme.zIndex.appBar })} elevation={4}>
        <Fab
          color="primary"
          sx={(theme) => ({
            position: 'fixed',
            bottom: theme.spacing(3),
            left: '50%',
            transform: 'translateX(-50%)',
            background: theme.palette.text.secondary,
            color: theme.palette.primary.contrastText,
          })}
          onClick={handleClickCamera}
          size="small"
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
