import { type FunctionComponent, memo, useEffect, useRef } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';

import DeleteIcon from '@mui/icons-material/Delete';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentWithDesc from 'themeDemo/components/common/ComponentWithDesc';
import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const IconDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Icon]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.Icon}>
      <TypeGroupWrapper typeName="Size">
        {['inherit', 'small', 'medium', 'large'].map((size) => (
          <ComponentWithDesc key={size} desc={size} sx={{ minWidth: 64 }} color="primary">
            <DeleteIcon fontSize={size as SvgIconProps['fontSize']} />
          </ComponentWithDesc>
        ))}
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="Color">
        {['primary', 'secondary', 'success', 'warning', 'error', 'info', 'action', 'disabled'].map(
          (color) => (
            <ComponentWithDesc key={color} desc={color} sx={{ minWidth: 64 }}>
              <DeleteIcon color={color as SvgIconProps['color']} />
            </ComponentWithDesc>
          ),
        )}
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(IconDemo);
