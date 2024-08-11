import React from "react";
import { useRouter } from "next/router";
import Seo from "@/shared/seo/seo";
import PageTitle from "@/features/page-title";
import PageTabs from "@/features/page-tabs";
import Table from "@/components/table";
import {
  formatDateString,
  parseQueryString,
  filterTransactions,
} from "@/utils";
import { useTransaction } from "@/hooks/useTransaction";
import Button from "@/components/button";
import Card from "@/components/card";
import { formatAmountWithCommas } from "@/utils";

const Reports = () => {
  const router = useRouter();
  const {
    totalRecords,
    currentPage,
    transactionsPerPage,
    paginate,
    onNextClick,
    onPreviousClick,
    maxPage,
    transactions,
    setFilteredTransactions,
    originalTransactions,
    balance,
  } = useTransaction();

  const columns = [
    {
      label: "Date",
      onSort: (a, b) => new Date(a.date) - new Date(b.date),
      render: (record) => {
        const [date, time] = formatDateString(record.date);
        return record.date ? (
          <div>
            <p className="text-body_sm2_normal text-neutral-900">{date}</p>
            <p className="text-body_sm1_normal text-neutral-400">{time}</p>
          </div>
        ) : (
          "-"
        );
      },
    },
    {
      label: "Amount",
      onSort: (a, b) => a.txn_amount - b.txn_amount,
      render: (record) => (
        <div className="text-body_sm2_normal flex gap-1">
          <p>{`${record.txn_currency_alpha_3} `}</p>
          <p
            className={`${
              record.txn_amount < 0 ? "text-danger" : "text-success"
            }`}
          >
            {`${record.txn_amount > 0 ? "+" : ""}${record.txn_amount}`}
          </p>
        </div>
      ),
    },
    {
      label: "Balance",
      onSort: (a, b) => a.balance - b.balance,
      render: (record) => (
        <p className="text-body_sm2_normal text-primary-400">
          {`${record.txn_currency_alpha_3} ${record.balance}`}
        </p>
      ),
    },
  ];

  const handleFilterSave = (queryString) => {
    const query = parseQueryString(queryString);
    const filteredData = filterTransactions(originalTransactions, query);
    setFilteredTransactions(filteredData);
    paginate(0); // Reset to the first page after filtering
  };

  return (
    <div>
      <PageTitle
        title="Account Statement"
        className="mb-6"
        slotRight={
          <Button
            className="w-full !bg-primary-50 !text-primary-600 text-body_sm1_normal border border-primary-600"
            onClick={() => router.push("/")}
          >
            View Account Details
          </Button>
        }
      />
      <Seo title={"Account Statement"} />
      <PageTabs
        tabs={[{ name: "Transactions", href: "#", icon: "" }]}
        isBreadcrumb={false}
        defaultActiveTab={"Transactions"}
        className="mb-6 md:mb-12"
      />
       <div className="md:flex justify-end">
       <Card
              title={"Account Balance"}
              value={`USD ${formatAmountWithCommas(balance)}`}
              icon="ri-stack-line"
              containerClass="md:w-[300px]"
            />
       </div>

      <div className="px-1 mt-6 md:mt-7">
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{
            usesPageIndex: true,
            recordsPerPage: transactionsPerPage,
            records: transactions.length,
            currentPage: currentPage,
            totalRecords: totalRecords,
            paginate: paginate,
            onNextClick: onNextClick,
            onPreviousClick: onPreviousClick,
            maxPageNumberLimit: maxPage,
            minPageNumberLimit: 1,
          }}
          showFilter={true}
          onFilterSave={handleFilterSave}
          filterColumns={[
            {
              label: "Date",
              name: "date",
              type: "date",
              key: "date",
              type: "date-range",
            },
            {
              label: "Amount",
              name: "txn_amount",
              type: "number",
              type: "text-input",
              placeholder: "Enter amount",
              inputType: "number",
              key: "txn_amount",
            },
            {
              label: "Balance",
              name: "balance",
              type: "number",
              type: "text-input",
              placeholder: "Enter amount",
              inputType: "number",
              key: "balance",
            },
          ]}
        />
      </div>
    </div>
  );
};

Reports.layout = "AuthenticatedLayout";

export default Reports;
