import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

// ----------------------------------------------------------------------

export function BotTableToolbar({ filters, options, onResetPage }) {
  const handleFilterType = useCallback(
    (event) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      filters.setState({ botType: newValue });
    },
    [filters, onResetPage]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
          <InputLabel htmlFor="user-filter-botType-select-label">Bot Type</InputLabel>
          <Select
            multiple
            value={filters.state.botType}
            onChange={handleFilterType}
            input={<OutlinedInput label="Bot Type" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            inputProps={{ id: 'user-filter-botType-select-label' }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
          >
            {options.botTypes.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={filters.state.botType.includes(option)}
                />
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
