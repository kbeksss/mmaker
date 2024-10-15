import React, { useMemo } from 'react';
import { z as zod } from 'zod';
import { Form, Field } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Card, CardHeader, Grid, Stack } from '@mui/material';

export const BotSchema = zod.object({
  apiKey: zod.string().min(1, { message: 'api key is required!' }),
  secretKey: zod.string().min(1, { message: 'secret key is required!' }),
  symbol: zod.string().min(1, { message: 'symbol is required!' }),
  buyDepth: zod.number(),
  sellDepth: zod.number(),
  buyNumber: zod.number(),
  sellNumber: zod.number(),
  budgetQuote: zod.number(),
  budgetToken: zod.number(),
  maxSpread: zod.number(),
  minSpread: zod.number(),
});

const BotForm = () => {
  const defaultValues = useMemo(
    () => ({
      apiKey: '',
      secretKey: '',
      symbol: '',
      buyDepth: '',
      sellDepth: '',
      buyNumber: '',
      sellNumber: '',
      budgetQuote: '',
      budgetToken: '',
      maxSpread: '',
      minSpread: '',
    }),
    []
  );
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
            <Field.Text name="apiKey" label="Api key" />
            <Field.Text name="secretKey" label="Secret key" />
            <Field.Text name="symbol" label="Symbol (e.g., BTCUSDT):" />
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
                <Field.Text name="budgetToken" type="number" label="Budget Token:" />
              </Grid>
              <Grid item xs={6}>
                <Field.Text name="budgetToken" type="number" label="Budget Token:" />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Stack>
    </Form>
  );
};

export default BotForm;
