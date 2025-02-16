import { type ForwardRefRenderFunction, forwardRef } from 'react';

import Box from '@mui/material/Box';
import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Component } from 'themeDemo/libs/schema';

interface ComponentsWrapperProps extends Omit<StackProps, 'component'> {
  component: Component;
}

const ComponentsWrapper: ForwardRefRenderFunction<HTMLDivElement, ComponentsWrapperProps> = (
  { component, children, sx, ...props },
  ref,
) => (
  <Box sx={{ p: 2 }}>
    <Typography ref={ref} variant="h4" sx={{ mb: 1 }} id={component}>
      {component}
    </Typography>
    <Stack rowGap={2} columnGap={3} sx={{ p: 2, alignItems: 'flex-start', ...sx }} {...props}>
      {children}
    </Stack>
  </Box>
);

export default forwardRef<HTMLDivElement, ComponentsWrapperProps>(ComponentsWrapper);
