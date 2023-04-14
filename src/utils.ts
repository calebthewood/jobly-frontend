
/** Formats a given number into a US dollar currency format string.
 * @param {number} number - The number to format.
 * @returns {string} The formatted currency string.
 */
export function formatCurrency(number: number): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(number);
}
