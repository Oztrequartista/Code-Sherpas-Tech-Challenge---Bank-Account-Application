/** constructs the URL query for the table filters to be sent to the backend for filtering
 * @param {Array} filters - the filters to be applied to the table
 * @returns {String} the query string to be appended to the URL
 */
export default function buildFilterQuery(filters) {
  let finalQuery = "?";
  filters?.map((filter, index) => {
    finalQuery = `${finalQuery}${filter?.query}&`;
  });
  return finalQuery;
}
