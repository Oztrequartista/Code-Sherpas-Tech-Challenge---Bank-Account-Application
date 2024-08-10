/** get currency pairs array from currency pair name
 * @param {string} pair - currency pair name e.g. "USDEUR"
 * @returns {string[]} - array of currency pairs e.g. ["USD", "EUR"]
 */
export default function getCurrencyPairsArray(pair) {
  if (!pair || pair.length !== 6) return [pair];
  return [pair.slice(0, 3), pair.slice(3)];
}
