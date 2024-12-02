import React from 'react';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Field, Form } from 'src/components/hook-form';
import Lottie from 'react-lottie-player';
import whaleLottie from 'src/assets/lotties/whale.json';
import comingSoonLottie from 'src/assets/lotties/coming-soon.json';
import ExchangeCard from './exchange-card';

export const ExchangeForm = ({
  exchanges,
  connectedList,
  setSelectedExchange,
  formOpen,
  handleClose,
  selectedExchange,
  methods,
  onSubmit,
}) => (
  <Dialog fullWidth maxWidth="lg" onClose={handleClose} open={formOpen} title="Add new connection">
    <DialogTitle>Add new exchange</DialogTitle>
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={(theme) => ({
        position: 'absolute',
        right: 8,
        top: 8,
        color: theme.palette.grey[500],
      })}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent sx={{ pb: 2 }}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4} item>
          <Stack spacing={1}>
            {Object.keys(exchanges)
              .filter((exchKey) => !Object.prototype.hasOwnProperty.call(connectedList, exchKey))
              .map((exchKey) => (
                <ExchangeCard
                  key={exchanges[exchKey].value}
                  onCardClick={() => setSelectedExchange(exchanges[exchKey])}
                  selected={selectedExchange?.value === exchanges[exchKey].value}
                  name={exchanges[exchKey].name}
                  img={exchanges[exchKey].icon}
                />
              ))}
          </Stack>
        </Grid>
        <Grid xs={12} md={8} item>
          <Card
            sx={{
              p: 3,
            }}
          >
            {!selectedExchange ? (
              <>
                <Typography align="center" fontWeight={600} fontSize={20}>
                  Choose exchange
                </Typography>
                <Lottie loop animationData={whaleLottie} play style={{ height: 300 }} />
              </>
            ) : (
              <ExchangeFields exchange={selectedExchange} methods={methods} onSubmit={onSubmit} />
            )}
          </Card>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);

const ExchangeFields = ({ exchange, methods, onSubmit }) =>
  exchange?.value === 'binance' ? (
    <Box>
      <Stack alignItems="center">
        <img width={150} src={exchange.icon} alt={exchange.name} />
        <Typography variant="h2">{exchange.name}</Typography>
      </Stack>

      <Box sx={{ pt: 4 }}>
        <Form methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field.Text label="Api key" name="apiKey" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field.Text label="Secret key" name="apiSecret" />
            </Grid>
          </Grid>
          <Box sx={{ pt: 2 }}>
            <Stack direction="row" justifyContent="flex-end">
              <Button type="submit" color="primary" variant="contained">
                Save connection
              </Button>
            </Stack>
          </Box>
        </Form>
      </Box>
    </Box>
  ) : (
    <>
      <Typography align="center" fontWeight={600} fontSize={20}>
        Coming Soon
      </Typography>
      <Lottie loop animationData={comingSoonLottie} play style={{ height: 300 }} />
    </>
  );
