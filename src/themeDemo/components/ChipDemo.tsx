import { type FunctionComponent, memo, useEffect, useRef } from 'react';

import Avatar from '@mui/material/Avatar';
import Chip, { type ChipProps } from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/ClearOutlined';
import FaceIcon from '@mui/icons-material/Face';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentWithDesc from 'themeDemo/components/common/ComponentWithDesc';
import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const chipHeights = {
  small: 20,
  medium: 32,
};

type ChipSize = keyof typeof chipHeights;

const ChipDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Chip]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  const handleClick = () => {};

  return (
    <ComponentsWrapper ref={ref} component={Component.Chip}>
      {(['filled', 'outlined'] as ChipProps['variant'][]).map((variant) => (
        <TypeGroupWrapper key={variant} typeName={variant}>
          <Chip label="Basic" variant={variant} />
          <Chip label="Disabled" disabled variant={variant} />
          <Chip
            avatar={<Avatar>M</Avatar>}
            label="Clickable"
            onClick={handleClick}
            variant={variant}
          />
          <Chip
            avatar={<Avatar>M</Avatar>}
            label="Deletable"
            onDelete={handleClick}
            variant={variant}
          />
          <Chip
            icon={<FaceIcon />}
            label="Clickable deletable"
            onClick={handleClick}
            onDelete={handleClick}
            variant={variant}
          />
          <Chip
            label="Custom delete icon"
            onClick={handleClick}
            onDelete={handleClick}
            deleteIcon={<ClearIcon fontSize="small" />}
            variant={variant}
          />
          <Chip label="Clickable Link" component="a" href="#chip" clickable variant={variant} />
        </TypeGroupWrapper>
      ))}
      <TypeGroupWrapper typeName="Color">
        {['default', 'primary', 'secondary', 'info', 'error', 'success', 'warning'].map((color) => (
          <Chip
            key={color}
            icon={<FaceIcon />}
            label={color}
            variant="filled"
            onClick={handleClick}
            onDelete={handleClick}
            color={color as ChipProps['color']}
          />
        ))}
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="Size">
        {(['small', 'medium'] as ChipSize[]).map((size) => (
          <ComponentWithDesc key={size} desc={`height: ${chipHeights[size]}px`}>
            <Chip label={size} variant="outlined" size={size} />
          </ComponentWithDesc>
        ))}
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(ChipDemo);
