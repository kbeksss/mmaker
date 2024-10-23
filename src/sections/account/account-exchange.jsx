import { Grid, Card } from '@mui/material';

export function AccountExchange() {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4} item>
        <Card
          sx={{
            p: 3,
          }}
        >
          exchange
        </Card>
      </Grid>
      <Grid xs={12} md={8} item>
        <Card
          sx={{
            p: 3,
          }}
        >
          exchange
        </Card>
      </Grid>
    </Grid>
  );
}
