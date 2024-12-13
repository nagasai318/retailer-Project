import log from "loglevel";

export const fetchTransactions = async () => {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    log.error("Failed to fetch transaction data:", err);
  }
};
