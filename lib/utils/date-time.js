/** converts ISO timestamp to readable format (eg 2024-10-05T00:00:00.000Z to 05/10/2024, 00:00:00)
 * @param {string} isoString
 * @param {boolean} returnCurrentDateIfNull
 * @returns {string} readable date time
 */
export function isoToReadableDateTime(isoString, returnCurrentDateIfNull) {
  if (!isoString && returnCurrentDateIfNull) {
    return new Date().toLocaleString("en-GB", {
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      month: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  return new Date(isoString).toLocaleString("en-GB", {
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    month: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
