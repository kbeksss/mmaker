import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';

const OnboardingModal = ({ modalOpen, handleClose }) => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const onNext = () => {
    if (step >= 2) {
      handleClose();
      navigate(paths.dashboard.exchanges);
    } else {
      setStep((prev) => prev + 1);
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      onClose={handleClose}
      open={modalOpen}
      title="Add new connection"
    >
      {steps[step]}
      <DialogActions>
        <Button color="primary" variant="contained" onClick={onNext}>
          {step === 2 ? 'Start' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const steps = [
  <>
    <DialogTitle align="center">Automated and Transparent Liquidity Management</DialogTitle>
    <DialogContent>
      <Box sx={{ my: 4 }}>
        <Stack direction="row" justifyContent="center">
          <img src="/logo/logo-full-blue.svg" alt="" />
        </Stack>
      </Box>
      <Typography sx={{ mb: 1 }} align="center" variant="h6">
        Whale Maker is a market-making software that provides automated liquidity management
        strategies with a growing set of features.
      </Typography>
      <Typography align="center" variant="h6">
        Liquid markets enable smooth trading, help to facilitate bigger transactions and encourage
        investor participation.
      </Typography>
    </DialogContent>
  </>,
  <>
    <DialogTitle align="center">Connect Your Favourite Exchange</DialogTitle>
    <DialogContent>
      <Box sx={{ my: 4 }}>
        <Stack direction="row" justifyContent="center">
          <img src="/assets/illustrations/illustration-security.jpg" alt="" />
        </Stack>
      </Box>
      <Typography sx={{ mb: 2 }} align="center" variant="h6">
        Whale Maker is constantly improving and adding new safety and security features to manage
        your API keys. The storage is isolated at both infrastructure and access levels to ensure
        the security of our systems.
      </Typography>
    </DialogContent>
  </>,
  <>
    <DialogTitle align="center">Security is our top priority</DialogTitle>
    <DialogContent>
      <Box sx={{ my: 4 }}>
        <Stack direction="row" justifyContent="center">
          <img src="/assets/illustrations/illustration-receipt.webp" alt="" />
        </Stack>
      </Box>
      <Typography sx={{ mb: 2 }} align="center" variant="h6">
        Connect to popular exchanges like Binance and add your API key to link the exchange account
        securely. Easily manage liquidity without ever compromising the safety of your funds.
      </Typography>
    </DialogContent>
  </>,
];

export default OnboardingModal;
