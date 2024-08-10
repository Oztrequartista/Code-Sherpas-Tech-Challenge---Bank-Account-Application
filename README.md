
Code Sherpas Tech Challenge - Bank Account Application
======================================================

Overview
--------

This project is a frontend application developed for the Code Sherpas Tech Challenge. The application simulates a simple bank account management system where users can:

*   Deposit money into their account.
*   Withdraw money from their account.
*   Transfer money to another account (IBAN only).
*   View and interact with their account statement, which includes transaction history.
*   Sort and filter transaction history.
*   Paginate through transaction records.

Table of Contents
-----------------

*   [Getting Started](#getting-started)
*   [Project Structure](#project-structure)
*   [Key Features](#key-features)
*   [Components and Context](#components-and-context)
*   [Filtering, Sorting, and Pagination](#filtering-sorting-and-pagination)
*   [Handling Transactions](#handling-transactions)
*   [Customizing the Application](#customizing-the-application)
*   [Known Issues](#known-issues)
*   [Future Enhancements](#future-enhancements)
*   [License](#license)

Getting Started
---------------

### Prerequisites

Ensure you have the following installed on your development machine:

*   Node.js (version 14.x or above)
*   npm (Node package manager) or Yarn

### Installation

1.  **Clone the repository:**
    
    bash
    
    Copy code
    
    `git clone https://github.com/your-username/code-sherpas-bank-app.git cd code-sherpas-bank-app`
    
2.  **Install the dependencies:**
    
    bash
    
    Copy code
    
    `npm install`
    
    or
    
    bash
    
    Copy code
    
    `yarn install`
    
3.  **Run the application:**
    
    bash
    
    Copy code
    
    `npm run dev`
    
    or
    
    bash
    
    Copy code
    
    `yarn dev`
    
    This will start the application locally. By default, it will be available at `http://localhost:3000`.
    

Project Structure
-----------------

The project is organized into the following key files and directories:

*   **`/components`**: Contains reusable components like `Table`, `Button`, `Pagination`, and form components for handling transactions.
*   **`/context`**: Includes the `TransactionContext` which manages global state related to transactions and pagination.
*   **`/pages`**: Contains the main application pages, including `index.js` (Home) and `reports.js` (Account Statement).
*   **`/utils`**: Utility functions like `parseQueryString`, `filterTransactions`, `validateIBAN`, and `formatDateString`.
*   **`/data`**: Holds sample transaction data used for the initial state.

Key Features
------------

### 1\. **Transaction Management**

*   **Deposit**: Allows users to deposit money into their account.
*   **Withdraw**: Allows users to withdraw money from their account.
*   **Transfer**: Allows users to transfer money to another IBAN account, with validation to ensure the IBAN is valid.

### 2\. **Account Statement**

*   **View Transactions**: Users can view a list of their transactions, including date, amount, and balance.
*   **Sorting**: Users can sort transactions by date, amount, or balance.
*   **Filtering**: Users can filter transactions based on date ranges, specific amounts, and balances.
*   **Pagination**: The application supports paginating transaction records, showing a subset of transactions per page.

### 3\. **Responsive UI**

*   The application is built with a responsive design to ensure it works well across different devices and screen sizes.

Components and Context
----------------------

### `TransactionContext.js`

*   **Purpose**: Manages the global state for the application, including the list of transactions, the user's balance, pagination, and transaction management functions.
*   **Key Functions**:
    *   `addTransaction`: Adds a new transaction to the account (e.g., deposit, withdraw, transfer).
    *   `paginate`, `onNextClick`, `onPreviousClick`: Manage pagination state for navigating through transaction pages.
    *   `setFilteredTransactions`: Used to apply filters to the transactions, updating the state accordingly.

### `Table.js`

*   **Purpose**: Displays transaction data in a tabular format with support for sorting, filtering, and pagination.
*   **Key Features**:
    *   **Sorting**: Columns can be sorted in ascending or descending order.
    *   **Filtering**: Allows filtering by date, amount, and balance.
    *   **Pagination**: Supports navigating between pages of transactions.

### `Reports.js`

*   **Purpose**: The main page of the application responsible for rendering the transaction table and passing in necessary data from the context.
*   **Key Components**:
    *   `PageTitle`: Displays the title of the page.
    *   `Table`: Renders the transaction history with sorting, filtering, and pagination.

### `parseQueryString.js`

*   **Purpose**: Utility function that converts a query string into an object of key-value pairs, used for filtering data.

### `filterTransactions.js`

*   **Purpose**: Filters the list of transactions based on the query object. Handles filtering by date ranges, amounts, and balances.

### `validateIBAN.js`

*   **Purpose**: Utility function to validate whether a provided string is a valid IBAN. Used in the `transferMoney` function within `TransactionContext`.

Filtering, Sorting, and Pagination
----------------------------------

### Filtering

The table supports filtering based on different columns:

*   **Date**: Filters transactions based on a date range (e.g., `date: '2024-08-08,2024-08-10'`).
*   **Amount**: Filters transactions based on the transaction amount.
*   **Balance**: Filters transactions based on the balance after the transaction.

Filters are passed as key-value pairs and applied through the `setFilteredTransactions` function in `TransactionContext.js`.

### Sorting

*   Columns can be sorted in ascending or descending order by clicking on the column header.
*   Sorting is implemented in the `Table` component using the `onSort` function passed in through the `columns` array.

### Pagination

*   The table supports pagination, allowing the user to navigate through pages of transactions.
*   Pagination controls are managed within the `Table` component and are integrated with the state provided by `TransactionContext`.

Handling Transactions
---------------------

### Adding a Transaction

*   **How It Works**: When a user adds a transaction (deposit, withdraw, or transfer), the `addTransaction` function in `TransactionContext` is called. This function updates both the `originalTransactions` and `filteredTransactions` states.
*   **Updating the UI**: After adding a transaction, the state is updated, and the UI reflects the new transaction. The pagination logic ensures that the latest transactions are displayed correctly.

### Navigating Between Routes

*   **State Persistence**: The application uses `useEffect` to reset or reapply filters and pagination when navigating between routes, ensuring that the table data is always up-to-date.

Customizing the Application
---------------------------

### Modify Initial Transactions

To change the initial transactions loaded into the application, update the `sampleTransactions` array in `/data/data.js`.

### Adjust Pagination

Change the `transactionsPerPage` value in `TransactionContext` to control how many transactions are displayed per page.

### Customize Filtering Options

You can extend the filtering logic by modifying the `filterTransactions` function in `/utils/filterTransactions.js`. This allows for more complex filtering criteria.

Known Issues
------------

*   **Persistent State Across Routes**: If the application does not reflect the latest data after adding a transaction and navigating between routes, ensure the `useEffect` hook in `Reports.js` resets the state correctly.
*   **Date Range Filtering**: The date range filter currently requires a specific format (`YYYY-MM-DD,YYYY-MM-DD`). Consider adding error handling or more flexible input formats.

Future Enhancements
-------------------

*   **Advanced Date Filtering**: Implement more sophisticated date filtering options, such as relative date filters (e.g., "Last 7 Days").
*   **Partial Matching for Amounts**: Improve the filtering logic to support partial matches or ranges for transaction amounts and balances.
*   **Mobile Responsiveness**: Enhance the design for smaller screen sizes, ensuring all components are fully responsive.

