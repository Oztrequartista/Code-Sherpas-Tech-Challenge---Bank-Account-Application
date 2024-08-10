import { TransactionContext } from '@/context/transaction-context';
import { useContext } from 'react';

// Custom hook to use the TransactionContext
export const useTransaction = () => useContext(TransactionContext);
