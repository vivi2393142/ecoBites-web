import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FunctionComponent,
} from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { mockCookHistory, mockRecipes } from 'libs/mockData';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';
import CookHistoryCard from 'components/CookHistoryCard';
import { pageSettings } from 'libs/settings';
import { Page, Recipe } from 'libs/schema';

const Home: FunctionComponent = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // check is mobile or not
  const checkIsMobileDevice = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /mobile|android|iphone|ipad|ipod|opera mini/i.test(userAgent);
    return isMobileDevice;
  }, []);

  // check camera support
  const checkCameraSupport = useCallback(() => {
    return (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      checkIsMobileDevice()
    );
  }, [checkIsMobileDevice]);

  // check device when init
  useEffect(() => {
    setIsMobile(checkIsMobileDevice());
  }, [checkIsMobileDevice]);

  // open camera
  const openCamera = useCallback(async () => {
    if (!checkCameraSupport()) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // use camera on the back
        },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('fail to open camera', error);
      // if fail to open camera, change to file upload mode
      fileInputRef.current?.click();
    }
  }, [checkCameraSupport]);

  // take photo
  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL('image/png');
        setImageSrc(photo);

        // close camera
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
      }
    }
  }, []);

  // handle file change
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleClickScan = useCallback(() => {
    if (isMobile && checkCameraSupport()) {
      void openCamera();
    } else {
      fileInputRef.current?.click();
    }
  }, [isMobile, checkCameraSupport, openCamera]);

  // TODO: remove this
  useEffect(() => {
    console.log({ imageSrc });
  }, [imageSrc]);

  const handleToNewCook = (recipe: Recipe) => {
    console.log({ recipe });
    // TODO
    // 1. call api to save starting recipe
    // 2. navigate to return id
    navigate(`${pageSettings[Page.COOKING].route}?cuisineId=${1}`);
  };

  const handleToHistoryCook = (cuisineId: string) => {
    navigate(`${pageSettings[Page.COOKING].route}?cuisineId=${cuisineId}`);
  };

  // TODO: remove this
  useEffect(() => {
    console.log({ imageSrc });
  }, [imageSrc]);

  return (
    <MainLayout>
      <Card
        sx={(theme) => ({
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          flexGrow: 1,
        })}
      >
        <CardActionArea onClick={handleClickScan} sx={{ height: '100%' }}>
          <CardContent
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: theme.palette.primary.contrastText,
              gap: 0.5,
            })}
          >
            <CameraAltIcon />
            <Typography
              variant="body2"
              sx={(theme) => ({
                color: theme.palette.primary.contrastText,
              })}
            >
              {isMobile ? 'Tap to scan ingredient' : 'Click to upload ingredient photo'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        capture={isMobile ? 'environment' : undefined}
      />
      {videoRef.current && (
        <Box>
          <video ref={videoRef} autoPlay playsInline>
            <track kind="captions" src="" label="English" />
          </video>
          <IconButton aria-label="capture" onClick={capturePhoto}>
            <CameraAltIcon />
          </IconButton>
        </Box>
      )}
      {/* {imageSrc && (
        <div>
          <h2>結果：</h2>
          <img src={imageSrc} alt="Captured" />
        </div>
      )} */}
      <Typography variant="h5" sx={{ mt: 0.75 }}>{`Today's Suggestions`}</Typography>
      {/* should overflow scroll horizontally here */}
      <Box
        sx={{ display: 'flex', gap: 1, flexShrink: 0, overflowX: 'auto', scrollbarWidth: 'none' }}
      >
        {mockRecipes.map((recipe, idx) => (
          <RecipeCard
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            type="simple"
            {...recipe}
            sx={{ flexShrink: 0, width: 250 }}
            onClick={() => {
              handleToNewCook(recipe);
            }}
          />
        ))}
      </Box>
      <Typography variant="h5" sx={{ mt: 0.75 }}>
        Your Cuisines
      </Typography>
      <Box
        sx={{ display: 'flex', gap: 1, flexShrink: 0, overflowX: 'auto', scrollbarWidth: 'none' }}
      >
        {Object.entries(mockCookHistory).map(([id, recipe]) => (
          <CookHistoryCard
            key={id}
            {...recipe}
            sx={{ flexShrink: 0, width: 275 }}
            onClick={() => {
              handleToHistoryCook(id);
            }}
          />
        ))}
      </Box>
    </MainLayout>
  );
};

export default Home;
