import { styled } from '@mui/material/styles';
import type { FunctionComponent } from 'react';

import Alert from '@mui/material/Alert';
import MuiSnackbar from '@mui/material/Snackbar';

import { useSnackbarAtom } from 'stores/atoms/snackbar';

const StyledAlert = styled(Alert)(({ theme }) => ({
  paddingRight: theme.spacing(6),
  paddingLeft: theme.spacing(6),
}));

const Snackbar: FunctionComponent = () => {
  const {
    snackbar: { open, message, severity },
    closeSnackbar,
  } = useSnackbarAtom();

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={closeSnackbar}
    >
      <StyledAlert severity={severity} sx={(theme) => ({ boxShadow: theme.shadows[2] })}>
        {message}
      </StyledAlert>
    </MuiSnackbar>
  );
};

export default Snackbar;
