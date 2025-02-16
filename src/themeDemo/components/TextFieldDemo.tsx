import { type FunctionComponent, memo, useEffect, useRef } from 'react';

import TextField, { type TextFieldProps } from '@mui/material/TextField';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentWithDesc from 'themeDemo/components/common/ComponentWithDesc';
import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const TextFieldDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.TextField]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.TextField}>
      <TypeGroupWrapper typeName="Basic">
        <TextField label="Outlined" variant="outlined" />
        <TextField label="Read Only" variant="outlined" disabled />
        <TextField label="Required" variant="outlined" required />
        <TextField label="Helper Text" variant="outlined" helperText="Some important text" />
        <TextField label="Placeholder" variant="outlined" placeholder="Some Hint" />
        <TextField label="Error" variant="outlined" helperText="Error Message" error />
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="Size">
        {['small', 'medium'].map((size) => (
          <ComponentWithDesc key={size} desc={`height: ${size === 'small' ? 36 : 48}px`}>
            <TextField
              label={size}
              variant="outlined"
              size={size as TextFieldProps['size']}
              sx={{ mt: 1.5 }}
            />
          </ComponentWithDesc>
        ))}
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(TextFieldDemo);
