import { type FunctionComponent, memo, useEffect, useRef } from 'react';

import Alert, { type AlertColor } from '@mui/material/Alert';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';

const SnackbarDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Snackbar]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.Snackbar}>
      {['success', 'warning', 'error', 'info'].map((severity) => (
        <Alert key={severity} severity={severity as AlertColor} sx={{ px: 6, width: 500 }}>
          {severity}
        </Alert>
      ))}
    </ComponentsWrapper>
  );
};

export default memo(SnackbarDemo);
