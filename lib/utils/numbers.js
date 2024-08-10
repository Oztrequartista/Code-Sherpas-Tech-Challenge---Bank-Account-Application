/** converts a number to percentage
 * @param {number} value - the number to convert to percentage
 * @param {boolean} noFixed - if true, the number will not be fixed to 2 decimal places
 * @returns {number} the number as a percentage
 */
export function convertToPercentage(value, noFixed) {
  if (noFixed) return Number(value) / 100;
  return (Number(value) / 100).toFixed(2);
}

/** converts a number from percentage to a regular number
 * @param {number} percentage - the percentage to convert to a number
 * @returns {number} the percentage as a regular number
 */
export function convertFromPercentage(percentage) {
  return (Number(percentage) * 100).toFixed(2);
}
