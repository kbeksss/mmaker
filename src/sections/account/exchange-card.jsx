import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';

const ExchangeCard = ({ name, value, img, selected, onCardClick }) => (
  <Card
    onClick={onCardClick}
    sx={{ p: 2, cursor: 'pointer', border: selected ? `1px solid blue` : '1px solid transparent' }}
  >
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Box
          sx={{
            height: 40,
            width: 40,
            backgroundImage: `url(${img})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Grid>
      <Grid item>
        <Typography>{name}</Typography>
      </Grid>
    </Grid>
  </Card>
);

export default ExchangeCard;
