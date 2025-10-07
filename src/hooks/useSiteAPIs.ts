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

// Hook for fetching insurance plans by age
export function useInsurancePlans(age: number | null) {
  const { data, error, isLoading, mutate } = useSWR(
    age !== null ? `/api/insurances/plans-with-prices?age=${age}` : null,
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
    plans: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading && !data && !data
  };
}

// Hook for fetching bank information
export function useBankInfo() {
  const { data, error, isLoading, mutate } = useSWR<{
    name: string;
    bank: string;
    tiban: string;
    diban: string;
    eiban: string;
  }>(
    '/api/bank-info',
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
      dedupingInterval: 300000, // 5 minutes - bank info doesn't change often
      // Only show error after all retries failed
      shouldRetryOnError: true,
    }
  );

  return {
    bankInfo: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading && !data
  };
}

// Hook for fetching bank information from locations endpoint
export function useLocationsBankInfo() {
  const { data, error, isLoading, mutate } = useSWR<{
    name: string;
    bank: string;
    tiban: string;
    diban: string;
    eiban: string;
  }>(
    '/api/locations/bank-info',
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
      dedupingInterval: 300000, // 5 minutes - bank info doesn't change often
      // Only show error after all retries failed
      shouldRetryOnError: true,
    }
  );

  return {
    bankInfo: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading && !data
  };
}

// Hook for fetching order tracking information
export function useOrderTracking(trackCode: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    trackCode ? `/api/track-order?code=${encodeURIComponent(trackCode)}` : null,
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
    order: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading && !data
  };
}

// Hook for fetching insurance report files
export function useInsuranceReports(orderId: number | null) {
  const { data, error, isLoading, mutate } = useSWR<Array<{
    id: number;
    name: string;
  }>>(
    orderId ? `/api/order/reports/insurance?orderId=${orderId}` : null,
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
    reports: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading && !data
  };
}

// Hook for fetching agent orders
export function useAgentOrders(agentId: number | null) {
  const { data, error, isLoading, mutate } = useSWR(
    agentId ? `/api/orders?agentId=${agentId}` : null,
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
    orders: data,
    isLoading,
    error,
    mutate,
    isRetrying: error && isLoading && !data
  };
}
