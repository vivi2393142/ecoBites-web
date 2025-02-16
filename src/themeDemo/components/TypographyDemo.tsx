import { type FunctionComponent, memo, useEffect, useRef } from 'react';

import Typography, { type TypographyProps } from '@mui/material/Typography';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const TypographyDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Typography]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.Typography}>
      <TypeGroupWrapper typeName="Color">
        {['textPrimary', 'textSecondary', 'error', 'primary', 'secondary'].map((color) => (
          <Typography
            key={color}
            variant="body1"
            color={color}
            sx={{ textTransform: 'capitalize' }}
          >
            {color}
          </Typography>
        ))}
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="Size Variant" sx={{ flexDirection: 'column' }}>
        {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((variant) => (
          <Typography key={variant} variant={variant as TypographyProps['variant']}>
            {variant}. Heading
          </Typography>
        ))}
        {['subtitle1', 'subtitle2'].map((variant) => (
          <Typography key={variant} variant={variant as TypographyProps['variant']}>
            {variant}. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
            tenetur
          </Typography>
        ))}
        {['body1', 'body2'].map((variant) => (
          <Typography key={variant} variant={variant as TypographyProps['variant']}>
            {variant}. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
            tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus,
            cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          </Typography>
        ))}
        {['button', 'caption', 'overline'].map((variant) => (
          <Typography key={variant} variant={variant as TypographyProps['variant']} display="block">
            {variant} text
          </Typography>
        ))}
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(TypographyDemo);
