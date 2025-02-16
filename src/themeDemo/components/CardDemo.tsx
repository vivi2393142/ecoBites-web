import { type FunctionComponent, memo, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

import Card, { type CardProps } from '@mui/material/Card';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  width: 140,
  textAlign: 'center',
}));

const CardDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Card]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.Card}>
      <TypeGroupWrapper typeName="Elevation">
        {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
          <StyledCard key={elevation.toString()} elevation={elevation}>
            elevation={elevation}
          </StyledCard>
        ))}
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="Variant">
        {['elevation', 'outlined'].map((variant) => (
          <StyledCard key={variant} variant={variant as CardProps['variant']}>
            {variant}
          </StyledCard>
        ))}
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="Corners">
        <StyledCard variant="outlined">rounded</StyledCard>
        <StyledCard square variant="outlined">
          square
        </StyledCard>
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(CardDemo);
