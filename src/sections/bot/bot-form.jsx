import React, { memo, useEffect, useMemo, useState } from 'react';
import { z as zod } from 'zod';
import { Form, Field } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, CardHeader, Grid, MenuItem, Stack, Typography } from '@mui/material';
import axios from 'axios';

export const BotSchema = zod
  .object({
    symbol: zod.string({ required_error: 'Symbol is required!' }),
    buyDepth: zod.number(),
    sellDepth: zod.number(),
    buyNumber: zod.number({ required_error: 'Number of orders is required' }),
    sellNumber: zod.number({ required_error: 'Number of orders is required' }),
    budgetQuote: zod.number(),
    budgetToken: zod.number(),
    maxSpread: zod.number(),
    minSpread: zod.number(),
  })
  .partial()
  .required({
    buyNumber: true,
    sellNumber: true,
    symbol: true,
  });

const AutoCompleteItem = memo(({ children, ...props }) => (
  <li {...props}>
    <Stack direction="row" justifyContent="space-between">
      <Typography>{children}</Typography>
      <Typography>%</Typography>
    </Stack>
  </li>
));

const getFromBinance = async () => {
  const { data } = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
  return data.map((pair) => {
    const symbol = pair.symbol;
    const priceChangePercent = parseFloat(pair.priceChangePercent);
    const obj = {
      label: symbol,
      id: symbol,
      percent: priceChangePercent.toFixed(2),
    };
    return obj;
  });
};

const BotForm = () => {
  const defaultValues = useMemo(
    () => ({
      symbol: '',
      buyDepth: undefined,
      sellDepth: undefined,
      buyNumber: undefined,
      sellNumber: undefined,
      budgetQuote: undefined,
      budgetToken: undefined,
      maxSpread: undefined,
      minSpread: undefined,
    }),
    []
  );
  const [symbols, setSymbols] = useState([]);
  useEffect(() => {
    getFromBinance().then((res) => setSymbols(res));
  }, []);
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(BotSchema),
    defaultValues,
  });
  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 1 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        <Card>
          <CardHeader title="Keys" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <Field.Autocomplete
              name="symbol"
              label="Symbol (e.g., BTCUSDT):"
              options={symbols}
              onChange={(event, value) => {
                setValue('symbol', value ? value.label : '');
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <Stack direction="row" spacing={1} justifyContent="space-between">
                    <Typography>{option.label}</Typography>
                    <Typography color={option.percent >= 0 ? 'primary.main' : 'error'}>
                      {option.percent} %
                    </Typography>
                  </Stack>
                </li>
              )}
            />
          </Stack>
        </Card>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Buy Orders Configuration" />
              <Stack spacing={3} sx={{ p: 3 }}>
                <Field.Text name="buyDepth" type="number" label="Depth Percentage (Buy):" />
                <Field.Text name="buyNumber" type="number" label="Number of Orders (Buy):" />
                <Field.Text name="budgetQuote" type="number" label="Budget Quote:" />
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardHeader title="Sell Orders Configuration" />
              <Stack spacing={3} sx={{ p: 3 }}>
                <Field.Text name="sellDepth" type="number" label="Depth Percentage (Sell):" />
                <Field.Text name="sellNumber" type="number" label="Number of Orders (Sell):" />
                <Field.Text name="budgetToken" type="number" label="Budget Token:" />
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Card>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field.Text name="maxSpread" type="number" label="Max Spread BPS:" />
              </Grid>
              <Grid item xs={6}>
                <Field.Text name="minSpread" type="number" label="Min Spread BPS:" />
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" color="primary">
                  Start bot
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" color="error">
                  Stop bot
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Stack>
    </Form>
  );
};

export default BotForm;
