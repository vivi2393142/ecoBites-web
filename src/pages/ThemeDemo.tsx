import {
  type ForwardRefExoticComponent,
  type FunctionComponent,
  type RefAttributes,
  useMemo,
  useState,
} from 'react';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { Component } from 'themeDemo/libs/schema';
import { mapEnumValues } from 'libs/utils';

import AccordionDemo from 'themeDemo/components/AccordionDemo';
import ButtonDemo from 'themeDemo/components/ButtonDemo';
import CardDemo from 'themeDemo/components/CardDemo';
import CheckboxDemo from 'themeDemo/components/CheckboxDemo';
import ChipDemo from 'themeDemo/components/ChipDemo';
import IconDemo from 'themeDemo/components/IconDemo';
import ListDemo from 'themeDemo/components/ListDemo';
import MenuDemo from 'themeDemo/components/MenuDemo';
import PaperDemo from 'themeDemo/components/PaperDemo';
import RadioDemo from 'themeDemo/components/RadioDemo';
import SnackbarDemo from 'themeDemo/components/SnackbarDemo';
import SwitchDemo from 'themeDemo/components/SwitchDemo';
import TextFieldDemo from 'themeDemo/components/TextFieldDemo';
import ThemeDemoProvider from 'themeDemo/components/ThemeDemoProvider';
import TypographyDemo from 'themeDemo/components/TypographyDemo';

const drawerWidth = 160;

const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,

  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
  },
}));

const demoComponents: Record<
  Component,
  ForwardRefExoticComponent<RefAttributes<HTMLDivElement>>
> = {
  [Component.TextField]: TextFieldDemo,
  [Component.List]: ListDemo,
  [Component.Menu]: MenuDemo,
  [Component.Button]: ButtonDemo,
  [Component.Typography]: TypographyDemo,
  [Component.Icon]: IconDemo,
  [Component.Snackbar]: SnackbarDemo,
  [Component.Chip]: ChipDemo,
  [Component.Radio]: RadioDemo,
  [Component.Switch]: SwitchDemo,
  [Component.Checkbox]: CheckboxDemo,
  [Component.Paper]: PaperDemo,
  [Component.Card]: CardDemo,
  [Component.Accordion]: AccordionDemo,
};

// TODO: the whole 'themeDemo' folder is for demo and theme adjustment use, remove all theme get steady
const ThemeDemo: FunctionComponent = () => {
  const [visibleObj, setVisibleObj] = useState<Record<Component, boolean>>(
    mapEnumValues(Component, () => false),
  );

  const contextValue = useMemo(() => ({ setVisibleObj }), []);

  const activeComponentValue = useMemo(
    () => Object.values(Component).find((componentValue) => visibleObj[componentValue]),
    [visibleObj],
  );

  return (
    <ThemeDemoProvider value={contextValue}>
      <Box sx={{ display: 'flex' }}>
        <StyledDrawer variant="permanent" anchor="left">
          <List>
            {Object.values(Component).map((componentName) => (
              <ListItem key={componentName} disablePadding>
                <ListItemButton
                  href={`#${componentName}`}
                  selected={activeComponentValue === componentName}
                >
                  <ListItemText primary={componentName} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </StyledDrawer>
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          <Box>
            {Object.values(Component).map((componentKey) => {
              const SectionComponent = demoComponents[componentKey];
              return <SectionComponent key={componentKey} />;
            })}
          </Box>
        </Box>
      </Box>
    </ThemeDemoProvider>
  );
};

export default ThemeDemo;
