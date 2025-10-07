# Site APIs Migration Summary

## Overview
This migration implements SWR for all API calls in the `(site)` folder components, providing better error handling, automatic retry logic, and improved user experience.

## API Endpoints Migrated

### 1. Order Tracking
- **Endpoint**: `/api/track-order?code=${trackCode}`
- **Component**: `InsuranceTrackingPage.tsx`
- **Hook**: `useOrderTracking(trackCode)`

### 2. Insurance Plans
- **Endpoint**: `/api/insurances/plans-with-prices?age=${age}`
- **Components**: `PersonalInfoStep.tsx`, `planSelector.tsx`
- **Hook**: `useInsurancePlans(age)`

### 3. Bank Information
- **Endpoints**: `/api/bank-info`, `/api/locations/bank-info`
- **Components**: `BankInfoStep.tsx`, `InsuranceOrderingManager.tsx`
- **Hooks**: `useBankInfo()`, `useLocationsBankInfo()`

### 4. Insurance Reports
- **Endpoint**: `/api/order/reports/insurance?orderId=${orderId}`
- **Component**: `insuranceFiles.tsx`
- **Hook**: `useInsuranceReports(orderId)`

### 5. Agent Orders
- **Endpoint**: `/api/orders?agentId=${parentid}`
- **Component**: `AgentManagementInsuranceOrderTable.tsx`
- **Hook**: `useAgentOrders(agentId)`

## Changes Made

### 1. Created SWR Hooks (`src/hooks/useSiteAPIs.ts`)
- **useInsurancePlans(age)**: Fetches insurance plans based on age
- **useBankInfo()**: Fetches bank information from `/api/bank-info`
- **useLocationsBankInfo()**: Fetches bank information from `/api/locations/bank-info`
- **useOrderTracking(trackCode)**: Fetches order details by tracking code
- **useInsuranceReports(orderId)**: Fetches insurance report files
- **useAgentOrders(agentId)**: Fetches orders for a specific agent

### 2. Component Updates

#### InsuranceTrackingPage.tsx
- **Before**: Manual fetch with useState for loading/error states
- **After**: Uses `useOrderTracking` hook with automatic retry
- **Features**: Loading spinners, retry indicators, proper error handling

#### PersonalInfoStep.tsx
- **Before**: Manual fetch in useEffect when DOB changes
- **After**: Uses `useInsurancePlans` hook
- **Features**: Automatic plan fetching based on age, error handling with toasts

#### planSelector.tsx
- **Before**: Manual fetch with loading states and error handling
- **After**: Uses `useInsurancePlans` hook
- **Features**: Skeleton loading, automatic retry, better error handling

#### BankInfoStep.tsx
- **Before**: Manual fetch with disabled state management
- **After**: Uses `useBankInfo` hook
- **Features**: Loading states, retry indicators, seamless data loading

#### insuranceFiles.tsx
- **Before**: Manual fetch with loading state
- **After**: Uses `useInsuranceReports` hook
- **Features**: Automatic retry, better loading states

#### AgentManagementInsuranceOrderTable.tsx
- **Before**: Manual fetch in useEffect
- **After**: Uses `useAgentOrders` hook
- **Features**: Automatic data fetching, retry logic

#### InsuranceOrderingManager.tsx
- **Before**: Manual fetch for bank info in multiple places
- **After**: Uses `useLocationsBankInfo` hook
- **Features**: Centralized bank info fetching, automatic retry

## Benefits

### 1. **Reliability**
- Automatic retry on failed requests (3 attempts with 2-second intervals)
- Request deduplication prevents duplicate API calls
- Better error handling with user-friendly messages

### 2. **User Experience**
- Loading states with spinners and skeleton screens
- Retry indicators when requests are being retried
- No page refreshes on API failures
- Smooth transitions between loading, retry, and error states

### 3. **Performance**
- Request caching with configurable cache duration
- Deduplication prevents unnecessary API calls
- Background revalidation when needed

### 4. **Developer Experience**
- Consistent error handling across all components
- Centralized API logic in reusable hooks
- Type-safe API responses
- Easy to maintain and extend

## SWR Configuration

### Global Configuration (in `providers.tsx`)
```typescript
{
  errorRetryCount: 3,
  errorRetryInterval: 2000,
  refreshInterval: 0,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000,
  shouldRetryOnError: true,
}
```

### Hook-Specific Configuration
- **Bank Info**: 5-minute cache (doesn't change often)
- **Orders/Plans**: 1-minute cache (more dynamic data)
- **Reports**: 1-minute cache (order-specific data)

## Error Handling Strategy

1. **During Retries**: Show loading/retry indicators, no error messages
2. **After All Retries Failed**: Show appropriate error messages/toasts
3. **404 Errors**: Show "not found" messages
4. **Other Errors**: Show generic error messages

## Usage Examples

### Basic Usage
```typescript
const { data, isLoading, error, isRetrying } = useInsurancePlans(age);
```

### With Error Handling
```typescript
useEffect(() => {
  if (error && !isRetrying) {
    // Show error toast only after all retries failed
    showErrorToast();
  }
}, [error, isRetrying]);
```

### Loading States
```typescript
if (isLoading) return <LoadingSpinner />;
if (isRetrying) return <RetryIndicator />;
if (error && !isRetrying) return <ErrorMessage />;
```

## Migration Complete ✅

All API calls in the `(site)` folder have been successfully migrated to use SWR hooks with:
- ✅ Automatic retry logic
- ✅ Proper error handling
- ✅ Loading states
- ✅ Request deduplication
- ✅ Type safety
- ✅ No page refreshes on failures
