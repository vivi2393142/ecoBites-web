import { type FunctionComponent, memo, useEffect, useRef } from 'react';

import Button, { type ButtonProps } from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import SaveIcon from '@mui/icons-material/Save';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentWithDesc from 'themeDemo/components/common/ComponentWithDesc';
import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const buttonHeights = {
  small: 36,
  medium: 48,
  large: 58,
};

type ButtonSize = 'small' | 'medium' | 'large';

const ButtonDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Button]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.Button}>
      {(['contained', 'outlined', 'text'] as ButtonProps['variant'][]).map((variant) => (
        <TypeGroupWrapper
          key={variant}
          typeName={`${variant} Buttons`}
          sx={{ alignItems: 'flex-start' }}
        >
          {(['small', 'medium', 'large'] as ButtonSize[]).map((size) => (
            <ComponentWithDesc key={size} desc={`height: ${buttonHeights[size]}px`}>
              <Button
                key={`${variant}${size}`}
                size={size}
                variant={variant as ButtonProps['variant']}
                color="primary"
              >
                {size}
              </Button>
            </ComponentWithDesc>
          ))}
          <Button variant={variant} color="primary">
            Default
          </Button>
          <Button variant={variant} color="secondary">
            Secondary
          </Button>
          <Button variant={variant} disabled>
            Disabled
          </Button>
        </TypeGroupWrapper>
      ))}
      <TypeGroupWrapper typeName="With Icon">
        <Button variant="contained" color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="contained" startIcon={<CloudUploadIcon />}>
          Upload
        </Button>
        <Button variant="contained" disabled color="secondary" startIcon={<KeyboardVoiceIcon />}>
          Talk
        </Button>
        <Button variant="contained" color="primary" size="small" startIcon={<SaveIcon />}>
          Save
        </Button>
        <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />}>
          Save
        </Button>
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(ButtonDemo);
