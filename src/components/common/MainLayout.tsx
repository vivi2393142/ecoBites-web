import { useCallback, useMemo, useState } from 'react';
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
import { mockRecipes } from 'libs/mockData';
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

  const [, setUploadedPhoto] = useState<string | null>(null);

  const { addScanResult } = useScanResultAtom();
  const { showSnackbar } = useSnackbarAtom();

  const handleClickCamera = useCallback(() => {
    void (async () => {
      try {
        const uploadedPhoto = await uploadPhotoFile();
        setUploadedPhoto(uploadedPhoto);
        // TODO: call api to get results
        addScanResult({ recommendedRecipes: mockRecipes });
        showSnackbar({
          message: `You got a new ingredient card! Check 'Rewards' to see the details.`,
        });
        navigate(pageSettings[Page.SCAN].route);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [navigate, addScanResult, showSnackbar]);

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
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.75,
          py: noPadding ? 0 : 2,
          height: '100vh - 56px - 72px',
          ...(noPadding && { p: 0 }),
        }}
      >
        {children}
      </Container>
      <Paper sx={(theme) => ({ height: 56, zIndex: theme.zIndex.appBar })} elevation={4}>
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
          onClick={handleClickCamera}
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
      {/* <div>
        <h2>結果：</h2>
        {uploadedPhoto && <img src={uploadedPhoto} alt="Captured" />}
      </div> */}
    </Box>
  );
};

export default MainLayout;
