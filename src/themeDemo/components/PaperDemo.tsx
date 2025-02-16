import { type FunctionComponent, memo, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

import Paper, { type PaperProps } from '@mui/material/Paper';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3, 0),
  width: 140,
  textAlign: 'center',
}));

const PaperDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Paper]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.Paper}>
      <TypeGroupWrapper typeName="Elevation">
        {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
          <StyledPaper key={elevation.toString()} elevation={elevation}>
            elevation={elevation}
          </StyledPaper>
        ))}
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="Variant">
        {['elevation', 'outlined'].map((variant) => (
          <StyledPaper key={variant} variant={variant as PaperProps['variant']}>
            {variant}
          </StyledPaper>
        ))}
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="Corners">
        <StyledPaper variant="outlined">rounded</StyledPaper>
        <StyledPaper square variant="outlined">
          square
        </StyledPaper>
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(PaperDemo);
