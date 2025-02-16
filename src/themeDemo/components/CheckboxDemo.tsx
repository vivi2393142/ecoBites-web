import { type ChangeEvent, type FunctionComponent, memo, useEffect, useRef, useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';
import TypeGroupWrapper from 'themeDemo/components/common/TypeGroupWrapper';

const CheckboxDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Checkbox]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  const [{ gilad, jason, antoine }, setGroupCheck] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGroupCheck((prev) => ({ ...prev, [event.target.name]: event.target.checked }));
  };

  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <ComponentsWrapper ref={ref} component={Component.Checkbox}>
      <TypeGroupWrapper typeName="Mui Default">
        <FormControl component="fieldset">
          <FormLabel component="legend">Assign responsibility</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
              label="Gilad Gray"
            />
            <FormControlLabel
              control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
              label="Jason Killian"
            />
            <FormControlLabel
              control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>Be careful</FormHelperText>
        </FormControl>
        <FormControl required error={error} component="fieldset">
          <FormLabel component="legend">Pick two</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={gilad} onChange={handleChange} name="gilad" />}
              label="Gilad Gray"
            />
            <FormControlLabel
              control={<Checkbox checked={jason} onChange={handleChange} name="jason" />}
              label="Jason Killian"
            />
            <FormControlLabel
              control={<Checkbox checked={antoine} onChange={handleChange} name="antoine" />}
              label="Antoine Llorca"
            />
          </FormGroup>
          <FormHelperText>You can display an error</FormHelperText>
        </FormControl>
      </TypeGroupWrapper>
    </ComponentsWrapper>
  );
};

export default memo(CheckboxDemo);
