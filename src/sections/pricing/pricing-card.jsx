import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { varAlpha, stylesMode } from 'src/theme/styles';
import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from 'src/assets/icons';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function PricingCard({ card, sx, ...other }) {
  const { subscription, price, caption, lists, labelAction } = card;

  const free = subscription === 'Free';
  const essential = subscription === 'Essential';
  const expert = subscription === 'Expert';
  const elite = subscription === 'Elite';
  const ultimate = subscription === 'Ultimate';

  const renderIcon = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {free && <PlanFreeIcon sx={{ width: 64 }} />}
      {essential && <PlanStarterIcon sx={{ width: 64 }} />}
      {expert && <PlanPremiumIcon sx={{ width: 64 }} />}

      {essential && <Label color="info">POPULAR</Label>}
    </Stack>
  );

  const renderSubscription = (
    <Stack spacing={1}>
      <Typography variant="h4" sx={{ textTransform: 'capitalize' }}>
        {subscription}
      </Typography>
      <Typography variant="subtitle2">{caption}</Typography>
    </Stack>
  );

  const renderPrice = free ? (
    <Typography variant="h2">Free</Typography>
  ) : (
    <Stack direction="row">
      <Typography variant="h2">{price}</Typography>
      <Typography
        component="span"
        sx={{
          alignSelf: 'center',
          color: 'text.disabled',
          ml: 1,
          typography: 'body2',
        }}
      >
        / mo
      </Typography>
    </Stack>
  );

  const renderList = (
    <Stack spacing={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box component="span" sx={{ typography: 'overline' }}>
          Features
        </Box>
        <Link variant="body2" color="inherit" underline="always">
          All
        </Link>
      </Stack>

      {lists.map((item) => (
        <Stack
          key={item}
          spacing={1}
          direction="row"
          alignItems="center"
          sx={{ typography: 'body2' }}
        >
          <Iconify icon="eva:checkmark-fill" width={16} sx={{ mr: 1 }} />
          {item}
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.default',
        boxShadow: (theme) => ({ xs: theme.customShadows.card, md: 'none' }),
        ...((free || essential) && {
          borderTopRightRadius: { md: 0 },
          borderBottomRightRadius: { md: 0 },
        }),
        ...((essential || expert) && {
          boxShadow: (theme) => ({
            xs: theme.customShadows.card,
            md: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
          }),
          [stylesMode.dark]: {
            boxShadow: (theme) => ({
              xs: theme.customShadows.card,
              md: `-40px 40px 80px 0px ${varAlpha(theme.vars.palette.common.blackChannel, 0.16)}`,
            }),
          },
        }),
        ...sx,
      }}
      {...other}
    >
      {renderIcon}

      {renderSubscription}

      {renderPrice}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderList}

      <Button
        fullWidth
        size="large"
        variant="contained"
        disabled={free}
        color={essential ? 'primary' : 'inherit'}
      >
        {labelAction}
      </Button>
    </Stack>
  );
}
