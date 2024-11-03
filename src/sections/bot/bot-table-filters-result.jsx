import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function BotTableFiltersResult({ filters, onResetPage, totalResults, sx }) {
  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    filters.setState({ status: 'all' });
  }, [filters, onResetPage]);

  const handleRemoveRole = useCallback(
    (inputValue) => {
      const newValue = filters.state.botType.filter((item) => item !== inputValue);

      onResetPage();
      filters.setState({ botType: newValue });
    },
    [filters, onResetPage]
  );

  const handleReset = useCallback(() => {
    onResetPage();
    filters.onResetState();
  }, [filters, onResetPage]);
  console.log('t', totalResults);
  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Status:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...chipProps}
          label={filters.state.status}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock label="Role:" isShow={!!filters.state.botType.length}>
        {filters.state.botType.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveRole(item)} />
        ))}
      </FiltersBlock>
    </FiltersResult>
  );
}
