import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';

export function OnboardingView() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const onNext = () => {
    if (step >= 2) {
      navigate(paths.dashboard.root);
    } else {
      setStep((prev) => prev + 1);
    }
  };
  return (
    <Container maxWidth="md" sx={{ height: 'calc(100vh - 72px)', position: 'relative' }}>
      <Stack sx={{ height: '100%' }} spacing={6} alignItems="center" justifyContent="center">
        {steps[step]}
      </Stack>
      <Box
        sx={{
          position: 'fixed',
          bottom: '80px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button color="primary" variant="contained" onClick={onNext}>
          {step === 2 ? 'Start' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
}

const steps = [
  <>
    <Typography variant="h3" align="center">
      Automated and Transparent Liquidity Management
    </Typography>
    <img src="/logo/logo-full-blue.svg" alt="" />
    <Box>
      <Typography sx={{ mb: 1 }} align="center" variant="h6">
        Whale Maker is a market-making software that provides automated liquidity management
        strategies with a growing set of features.
      </Typography>
      <Typography align="center" variant="h6">
        Liquid markets enable smooth trading, help to facilitate bigger transactions and encourage
        investor participation.
      </Typography>
    </Box>
  </>,
  <>
    <Typography variant="h3" align="center">
      Connect Your Favourite Exchange
    </Typography>
    <img src="/assets/illustrations/illustration-security.jpg" alt="" />
    <Box>
      <Typography sx={{ mb: 2 }} align="center" variant="h6">
        Whale Maker is constantly improving and adding new safety and security features to manage
        your API keys. The storage is isolated at both infrastructure and access levels to ensure
        the security of our systems.
      </Typography>
    </Box>
  </>,
  <>
    <Typography variant="h3" align="center">
      Security is our top priority
    </Typography>
    <img src="/assets/illustrations/illustration-receipt.webp" alt="" />
    <Box>
      <Typography sx={{ mb: 2 }} align="center" variant="h6">
        1. Connect to popular exchanges like Binance and add your API key to link the exchange
        account securely. Easily manage liquidity without ever compromising the safety of your
        funds.
      </Typography>
    </Box>
  </>,
];
