import { type FunctionComponent, type PropsWithChildren, memo } from 'react';

import Box from '@mui/material/Box';
import Stack, { type StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface TypeGroupWrapperProps extends StackProps {
  typeName?: string;
}

const TypeGroupWrapper: FunctionComponent<TypeGroupWrapperProps> = ({
  typeName,
  children,
  sx,
  ...props
}: PropsWithChildren<TypeGroupWrapperProps>) => (
  <Box>
    {typeName && (
      <Typography variant="subtitle1" sx={{ mb: 2, textTransform: 'capitalize' }}>
        {typeName}
      </Typography>
    )}
    <Stack
      columnGap={3}
      rowGap={1.5}
      direction="row"
      sx={{ px: 1, flexWrap: 'wrap', ...sx }}
      {...props}
    >
      {children}
    </Stack>
  </Box>
);

export default memo(TypeGroupWrapper);
