// Format currency values (INR)
export const formatCurrency = (value: number): string => {
  // Convert to absolute value for formatting, then add sign
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  // Format with Indian currency style (₹)
  return `${sign}₹${absValue.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

// Format numbers with appropriate precision
export const formatNumber = (value: number): string => {
  if (value === 0) return '0';
  
  // If value is very small (scientific notation territory)
  if (Math.abs(value) < 0.0001) {
    return value.toExponential(4);
  }
  
  // For regular numbers
  return value.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4
  });
};