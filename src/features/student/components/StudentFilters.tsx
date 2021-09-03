import { Box, Grid, Select, MenuItem, Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import { useRef } from 'react';
import { ChangeEvent } from 'react';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onSearchChange,
  onChange,
}: StudentFiltersProps) {
  const typingDebounce: any = useRef();
  const searchRef: any = useRef();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    if (typingDebounce.current) {
      clearTimeout(typingDebounce.current);
    }

    typingDebounce.current = setTimeout(() => {
      const newFilter = { ...filter, name_like: e.target.value, _page: 1 };
      onSearchChange(newFilter);
    }, 500);
  };

  const handleFilterChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const newFilter = { ...filter, city: e.target.value || undefined, _page: 1 };
    onChange(newFilter);
  };

  const handleSortChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as String).split('.');
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      city: undefined,
      _sort: undefined,
      _order: undefined,
      name_like: '',
      _page: 1,
    };
    onChange(newFilter);
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">Search by name</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="Search by name"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="filterByCity"
              label="Filter by city"
              value={filter.city || ''}
              onChange={handleFilterChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
              labelId="sortBy"
              label="Sort"
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="name.asc">Name ASC</MenuItem>
              <MenuItem value="name.desc">Name DESC</MenuItem>
              <MenuItem value="mark.asc">Mark ASC</MenuItem>
              <MenuItem value="mark.desc">Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
