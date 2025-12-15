/**
 * Converts a MATLAB datenum to a JavaScript Date
 */

export function matlabToDate(datenum: number): Date {
  return new Date((datenum - 719529) * 86400000);
}
// Example usage:
// matlabToDate(739489) → 2024-08-25T00:00:00.000Z
// matlabToDate(739489.49441266) → 2024-08-25T11:51:57.253Z
