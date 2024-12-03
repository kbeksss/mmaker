import React, { useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Dialog,
  List,
  DialogTitle,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  Tooltip,
} from '@mui/material';
import { useMetamask } from '../hooks/use-metamask';

const FormWeb3 = ({ setErrorMsg }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { connectWallet: connectMetamask } = useMetamask({ setErrorMsg });
  return (
    <>
      <Tooltip title="In development" arrow>
        <span>
          <Button
            size="large"
            fullWidth
            variant="outlined"
            disabled
            onClick={() => setDialogOpen(true)}
          >
            Login with web3
          </Button>
        </span>
      </Tooltip>
      <Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
        <DialogTitle>Connect wallet</DialogTitle>
        <Box sx={{ p: 3 }}>
          <Typography>You can log in to the exchange using the wallets below</Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={connectMetamask}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: 'transparent' }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png"
                      alt=""
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Sign in with metamask" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Dialog>
    </>
  );
};

export default FormWeb3;
