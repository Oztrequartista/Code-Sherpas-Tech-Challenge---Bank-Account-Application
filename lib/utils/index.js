import { clsx } from "clsx";
import { twMerge } from "tw-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isObjectEmpty(obj, returnFalseOnNullData = false) {
  if (returnFalseOnNullData && !obj) return true;
  return (
    obj &&
    typeof obj === "object" &&
    obj.constructor === Object &&
    Object.keys(obj).length === 0
  );
}

export function isObjectKeyValueEmpty(obj, key) {
  return obj[key] === null || obj[key] === undefined || isObjectEmpty(obj[key]);
}
