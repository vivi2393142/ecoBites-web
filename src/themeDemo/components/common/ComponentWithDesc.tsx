import { type FunctionComponent, type PropsWithChildren, memo } from 'react';

import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface ComponentWithDescProps extends StackProps {
  desc?: string;
}

const ComponentWithDesc: FunctionComponent<ComponentWithDescProps> = ({
  desc,
  children,
  ...props
}: PropsWithChildren<ComponentWithDescProps>) => (
  <Stack gap={0.5} {...props}>
    {desc && (
      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
        {desc}
      </Typography>
    )}
    {children}
  </Stack>
);

export default memo(ComponentWithDesc);
