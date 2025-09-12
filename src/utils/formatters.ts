/**
 * Format currency with proper decimal places (removes unnecessary trailing zeros)
 * @param amount - Number to format
 * @param currency - Currency code (default: USD)
 * @param minimumFractionDigits - Minimum decimal places (default: 0)
 * @param maximumFractionDigits - Maximum decimal places (default: 2)
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2
): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '$0';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
};

/**
 * Format percentage with proper decimal places
 * @param value - Number to format as percentage (e.g., 0.1234 becomes 12.34%)
 * @param decimals - Number of decimal places (default: 2)
 */
export const formatPercentage = (value: number, decimals: number = 2): string => {
  if (isNaN(value) || value === null || value === undefined) {
    return '0%';
  }

  return `${Number(value).toFixed(decimals)}%`;
};

/**
 * Format large numbers with appropriate suffixes (K, M, B)
 * @param num - Number to format
 * @param decimals - Number of decimal places (default: 1)
 */
export const formatLargeNumber = (num: number, decimals: number = 1): string => {
  if (isNaN(num) || num === null || num === undefined) {
    return '0';
  }

  if (num === 0) return '0';
  
  const k = 1000;
  const sizes = ['', 'K', 'M', 'B', 'T'];
  const i = Math.floor(Math.log(Math.abs(num)) / Math.log(k));
  
  if (i === 0) {
    return num.toString();
  }
  
  const formatted = (num / Math.pow(k, i)).toFixed(decimals);
  // Remove trailing zeros
  return parseFloat(formatted) + sizes[i];
};

/**
 * Format number with commas and remove trailing zeros
 * @param num - Number to format
 * @param decimals - Maximum decimal places (default: 2)
 */
export const formatNumber = (num: number, decimals: number = 2): string => {
  if (isNaN(num) || num === null || num === undefined) {
    return '0';
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(num);
};

/**
 * Clean currency formatting - removes unnecessary decimals
 * @param amount - Amount to format
 */
export const formatCurrencyClean = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '$0';
  }

  // If it's a whole number, don't show decimals
  if (amount % 1 === 0) {
    return formatCurrency(amount, 'USD', 0, 0);
  }
  
  // If it has decimals, show up to 2 decimal places but remove trailing zeros
  return formatCurrency(amount, 'USD', 0, 2);
};

/**
 * Format ROI percentage properly (for display in investment sheets)
 * @param principal - Principal amount
 * @param interest - Interest amount
 * @param decimals - Number of decimal places (default: 2)
 */
export const formatROI = (principal: number, interest: number, decimals: number = 2): string => {
  if (!principal || principal === 0) return '0%';
  
  const roi = (interest / principal) * 100;
  return formatPercentage(roi, decimals);
};