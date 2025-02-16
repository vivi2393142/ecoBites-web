import { type FunctionComponent, type MouseEvent, memo, useEffect, useRef, useState } from 'react';

import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SaveIcon from '@mui/icons-material/Save';

import { Component } from 'themeDemo/libs/schema';
import { useThemeDemoContext } from 'themeDemo/components/ThemeDemoProvider';
import useOnScreen from 'hooks/useOnScreen';

import ComponentWithDesc from 'themeDemo/components/common/ComponentWithDesc';
import ComponentsWrapper from 'themeDemo/components/common/ComponentsWrapper';

const MenuDemo: FunctionComponent = () => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchor(null);
  };

  const handleClick = () => {};

  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  const { setVisibleObj } = useThemeDemoContext();

  useEffect(() => {
    setVisibleObj((prev) => ({ ...prev, [Component.Menu]: isOnScreen }));
  }, [isOnScreen, setVisibleObj]);

  return (
    <ComponentsWrapper ref={ref} component={Component.Menu} direction="row">
      {['Default', 'Icon', 'IconSmall', 'WithoutDense'].map((type) => (
        <ComponentWithDesc key={type} desc={`${type} Menu List`}>
          <MenuList sx={{ boxShadow: 8 }}>
            {Array.from({ length: 3 }, (_, idx) => (
              <MenuItem key={idx} dense={type !== 'WithoutDense'}>
                {(type === 'Icon' || type === 'IconSmall') && (
                  <ListItemIcon>
                    <SaveIcon fontSize={type === 'IconSmall' ? 'small' : undefined} />
                  </ListItemIcon>
                )}
                <ListItemText primary={`Menu Item ${idx + 1}`} />
              </MenuItem>
            ))}
          </MenuList>
        </ComponentWithDesc>
      ))}
      <ComponentWithDesc desc="Menu List with Anchor">
        <Button onClick={handleOpenMenu} variant="outlined">
          Menu
        </Button>
      </ComponentWithDesc>
      <Menu
        id="themeMenu"
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        MenuListProps={{
          'aria-labelledby': 'theme-selector',
        }}
      >
        {['A', 'B', 'C'].map((value) => (
          <MenuItem key={value} onClick={handleClick}>
            <ListItemIcon>
              <AcUnitOutlinedIcon />
            </ListItemIcon>
            <ListItemText>{value}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </ComponentsWrapper>
  );
};

export default memo(MenuDemo);
