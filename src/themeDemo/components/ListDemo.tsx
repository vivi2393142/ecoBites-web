import { type FunctionComponent, memo, useEffect, useRef } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SaveIcon from '@mui/icons-material/Save';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentWithDesc from 'themeDemo/components/common/ComponentWithDesc';
import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';

const ListDemo: FunctionComponent = () => {
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.List]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.List} direction="row">
      {['Default', 'Icon', 'IconSmall', 'WithoutDense'].map((type) => (
        <ComponentWithDesc key={type} desc={`${type} List`}>
          <List sx={(theme) => ({ background: theme.palette.background.container })}>
            {Array.from({ length: 3 }, (_, idx) => (
              <ListItem key={idx} dense={type !== 'WithoutDense'}>
                {(type === 'Icon' || type === 'IconSmall') && (
                  <ListItemIcon>
                    <SaveIcon fontSize={type === 'IconSmall' ? 'small' : undefined} />
                  </ListItemIcon>
                )}
                <ListItemText primary={`List Item ${idx + 1}`} />
              </ListItem>
            ))}
          </List>
        </ComponentWithDesc>
      ))}
    </ComponentsWrapper>
  );
};

export default memo(ListDemo);
