import { type ChangeEvent, type FunctionComponent, memo, useEffect, useRef, useState } from 'react';

import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch, { type SwitchProps } from '@mui/material/Switch';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const SwitchDemo: FunctionComponent = () => {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Switch]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.Switch}>
      <TypeGroupWrapper typeName="color">
        <FormGroup row>
          {['primary', 'secondary', 'error', 'success', 'warning', 'info'].map((color) => (
            <FormControlLabel
              key={color}
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  name="switch"
                  color={color as SwitchProps['color']}
                />
              }
              label={color}
            />
          ))}
        </FormGroup>
      </TypeGroupWrapper>
      <TypeGroupWrapper typeName="status">
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch checked={checked} onChange={handleChange} name="switch" color="info" />
            }
            label="Default"
          />
          <FormControlLabel control={<Switch />} label="Uncontrolled" />
          <FormControlLabel disabled control={<Switch />} label="Disabled" />
          <FormControlLabel disabled control={<Switch checked />} label="Disabled" />
        </FormGroup>
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(SwitchDemo);
