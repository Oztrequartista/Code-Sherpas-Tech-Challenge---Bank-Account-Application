export const getUserInitials = (user) =>
  user
    ? `${user.first_name} ${user.last_name}`
        .split(" ")
        .map((name) => name.substring(0, 1))
        .join("")
        .toUpperCase()
    : "";

export const getEntityInitials = (fullname, limit = 2) =>
  fullname
    ? fullname
        .split(" ")
        .slice(0, limit)
        .map((name) => name.substring(0, 1))
        .join("")
        .toUpperCase()
    : "";

export function getInitials(name, limit = 2) {
  return name
    .split(" ")
    .slice(0, limit) // Split the name into an array of words
    .map((word) => word[0]) // Map each word to its first letter
    .join("") // Join the initials into a single string
    .toUpperCase(); // Convert the initials to uppercase
}

export const formatDateObject = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function formatDateString(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const displayDate = `${month} ${day}, ${year}`;
  const displayTime = `${hours}:${minutes} ${ampm}`;

  return [displayDate, displayTime];
}

export function formatAmountWithCommas(amount) {
  const parts = amount.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export const validateIBAN = (iban) => {
  const regex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/;
  return regex.test(iban);
};

export function parseQueryString(queryString) {
  if (queryString?.startsWith("?")) {
    queryString = queryString?.substring(1);
  }
  const pairs = queryString?.split("&") ?? [];
  const params = {};
  pairs?.forEach((pair) => {
    if (pair === "") return;
    let [key, value] = pair.split("=");
    let decodedValue = decodeURIComponent(value);
    params[decodeURIComponent(key)] = decodedValue;
  });

  return params;
}

export const filterTransactions = (transactions, query) => {
  return transactions.filter((transaction) => {
    return Object.keys(query).every((key) => {
      if (key === "date") {
        // Handle date range filtering
        const [startDate, endDate] = query[key].split(",").map(date => new Date(date));
        const transactionDate = new Date(transaction[key]);
        return transactionDate >= startDate && transactionDate <= endDate;
      } else if (key === "txn_amount" || key === "balance") {
        // Handle numeric filtering
        return transaction[key] === Number(query[key]);
      }
      return true;
    });
  });
};

