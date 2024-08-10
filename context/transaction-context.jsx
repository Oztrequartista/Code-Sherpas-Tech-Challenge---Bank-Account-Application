import React, { createContext, useState } from "react";
import { sampleTransactions } from "@/data/data";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const [originalTransactions, setOriginalTransactions] = useState(
    sampleTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
  );
  const [filteredTransactions, setFilteredTransactions] = useState(originalTransactions);
  const transactions = filteredTransactions || originalTransactions;
  const totalRecords = transactions.length;
  const maxPage = Math.ceil(totalRecords / transactionsPerPage);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber + 1); // Adjust for 0-indexing
  };

  const onNextClick = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onPreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const addTransaction = (txn_amount, description) => {
    const newBalance = originalTransactions[0].balance + txn_amount;
    const transaction = {
      date: new Date().toISOString().split("T")[0],
      txn_amount,
      balance: newBalance,
      txn_currency_alpha_3: "USD",
      description: description || "",
    };
  
    const updatedOriginalTransactions = [transaction, ...originalTransactions];
    setFilteredTransactions(updatedOriginalTransactions);
    setOriginalTransactions(updatedOriginalTransactions);
  };
  

  return (
    <TransactionContext.Provider
      value={{
        transactions: currentTransactions,
        totalRecords,
        currentPage,
        transactionsPerPage,
        balance: transactions[0]?.balance || 0,
        addTransaction,
        maxPage,
        paginate,
        onNextClick,
        onPreviousClick,
        setFilteredTransactions,
        originalTransactions,
        filteredTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
