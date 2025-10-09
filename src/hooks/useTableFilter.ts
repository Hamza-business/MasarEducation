import { useState, useEffect, useMemo, useCallback } from 'react';

interface UseTableFilterProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  statusField?: keyof T;
  statusOptions?: { [key: string]: (item: T) => boolean };
}

interface UseTableFilterReturn<T> {
  search: string;
  setSearch: (search: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filtered: T[];
  page: number;
  setPage: (page: number) => void;
  paginated: T[];
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

export function useTableFilter<T>({
  data,
  searchFields,
  statusField,
  statusOptions = {},
}: UseTableFilterProps<T>): UseTableFilterReturn<T> {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Memoize filtered data to prevent unnecessary recalculations
  const filtered = useMemo(() => {
    return data.filter(item => {
      // Search filter
      const matchesSearch = search === '' || searchFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(search.toLowerCase());
      });

      // Status filter
      const matchesStatus = statusFilter === '' || 
        (statusOptions[statusFilter] ? statusOptions[statusFilter](item) : true);

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter, searchFields, statusOptions]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Calculate paginated data
  const paginated = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, page, itemsPerPage]);

  const resetFilters = useCallback(() => {
    setSearch('');
    setStatusFilter('');
    setPage(1);
  }, []);

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filtered,
    page,
    setPage,
    paginated,
    itemsPerPage,
    setItemsPerPage,
  };
}
