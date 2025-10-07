import useSWR from 'swr';

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object
    (error as any).info = await response.json();
    (error as any).status = response.status;
    throw error;
  }
  
  return response.json();
};

// Hook for fetching provinces
export function useProvinces() {
  const { data, error, isLoading, mutate } = useSWR<string[]>(
    '/api/turkey-api/provinces',
    fetcher,
    {
      // Retry configuration
      errorRetryCount: 3,
      errorRetryInterval: 2000, // 2 seconds
      // Refresh configuration
      refreshInterval: 0, // No automatic refresh
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      // Deduplication
      dedupingInterval: 60000, // 1 minute
      // Only show error after all retries failed
      shouldRetryOnError: true,
    }
  );

  return {
    provinces: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading
  };
}

// Hook for fetching districts
export function useDistricts(province: string | null) {
  const { data, error, isLoading, mutate } = useSWR<string[]>(
    province ? `/api/turkey-api/districts?province=${encodeURIComponent(province)}` : null,
    fetcher,
    {
      // Retry configuration
      errorRetryCount: 3,
      errorRetryInterval: 2000, // 2 seconds
      // Refresh configuration
      refreshInterval: 0, // No automatic refresh
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      // Deduplication
      dedupingInterval: 60000, // 1 minute
      // Only show error after all retries failed
      shouldRetryOnError: true,
    }
  );

  return {
    districts: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading
  };
}

// Hook for fetching neighborhoods
export function useNeighborhoods(district: string | null) {
  const { data, error, isLoading, mutate } = useSWR<string[]>(
    district ? `/api/turkey-api/neighborhoods?district=${encodeURIComponent(district)}` : null,
    fetcher,
    {
      // Retry configuration
      errorRetryCount: 3,
      errorRetryInterval: 2000, // 2 seconds
      // Refresh configuration
      refreshInterval: 0, // No automatic refresh
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      // Deduplication
      dedupingInterval: 60000, // 1 minute
      // Only show error after all retries failed
      shouldRetryOnError: true,
    }
  );

  return {
    neighborhoods: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading
  };
}
