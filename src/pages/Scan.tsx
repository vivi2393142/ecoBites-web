import { useCallback, useRef, useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';

import { mockRecipes } from 'libs/mockData';
import { Page } from 'libs/schema';
import { pageSettings } from 'libs/settings';

import MainLayout from 'components/common/MainLayout';
import RecipeCard from 'components/RecipeCard';

// TODO: finish Scan page
const Scan: FunctionComponent = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null); // 用於綁定 input[type="file"]
  const videoRef = useRef<HTMLVideoElement>(null); // 用於綁定 <video> 元素

  const [imageSrc, setImageSrc] = useState<string | null>(null); // 用於儲存照片或圖片的 Base64 URL
  const [isCameraSupported, setIsCameraSupported] = useState(true); // 判斷是否支援相機

  // 檢查是否支援 MediaDevices API
  const checkCameraSupport = () => {
    return (
      navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia &&
      typeof navigator.mediaDevices.getUserMedia === 'function'
    );
  };

  // 開啟相機
  const openCamera = async () => {
    if (!checkCameraSupport()) {
      setIsCameraSupported(false); // 如果不支援相機，設置狀態為 false
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // 將相機串流綁定到 <video> 元素
      }
    } catch (error) {
      console.error('無法開啟相機：', error);
      setIsCameraSupported(false); // 如果無法開啟相機，設置狀態為 false
    }
  };

  // 拍照
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL('image/png'); // 將照片轉為 Base64
        setImageSrc(photo);
      }
    }
  };

  // 處理選擇圖片後的照片
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // 獲取選擇的圖片檔案
    if (file) {
      const reader = new FileReader(); // 建立 FileReader 物件
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string); // 將圖片轉為 Base64 並設置到 state
      };
      reader.readAsDataURL(file); // 讀取檔案並轉為 Base64
    }
  };

  // 觸發 input[type="file"] 的點擊事件
  const handleButtonClick = () => {
    if (isCameraSupported) {
      void openCamera(); // 如果支援相機，則開啟相機
    } else {
      fileInputRef.current?.click(); // 如果不支援相機，則開啟檔案選擇器
    }
  };

  const handleMakeCuisine = useCallback(() => {
    // TODO: call api to start cooking this cuisine
    console.log('1. call api to save recipe');
    console.log('2. get the id back');
    console.log('3. navigate to this id');
    // TODO: change id '1' to actual one
    navigate(`${pageSettings[Page.COOKING].route}?cuisine=${1}`);
  }, [navigate]);

  return (
    <MainLayout>
      Scan
      <div>
        <h1>拍照或上傳圖片</h1>
        <button type="button" onClick={handleButtonClick}>
          {isCameraSupported ? '開啟相機拍照' : '上傳圖片'}
        </button>
        {/* 顯示相機預覽 */}
        {isCameraSupported && (
          <div>
            <video ref={videoRef} autoPlay>
              <track kind="captions" src="" label="English" />
            </video>
            <button type="button" onClick={capturePhoto}>
              拍照
            </button>
          </div>
        )}
        {/* 隱藏的 input[type="file"] */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {/* 顯示拍攝或上傳的圖片 */}
        {imageSrc && (
          <div>
            <h2>結果：</h2>
            <img src={imageSrc} alt="Captured" />
          </div>
        )}
      </div>
      {mockRecipes.map((recipe, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <RecipeCard key={idx} {...recipe} type="collapse-detail">
          <Button variant="contained" onClick={handleMakeCuisine}>
            Make This Cuisine
          </Button>
        </RecipeCard>
      ))}
    </MainLayout>
  );
};

export default Scan;
