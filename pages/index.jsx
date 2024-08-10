import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Seo from "@/shared/seo/seo";
import PageTitle from "@/features/page-title";
import Button from "@/components/button";
import SideHeader from "@/components/side-header";
import Portal from "@/components/portal";
import CenteredModal from "@/components/centered-modal";
import { useTransaction } from "@/hooks/useTransaction";
import Card from "@/components/card";
import RenderForm from "@/components/forms/render-forms";
import Alert from "@/components/alerts/alert";
import { validateIBAN } from "@/utils";
import { cardInfo } from "@/data/card";
import { formatAmountWithCommas } from "@/utils";

const Home = () => {
  const router = useRouter();
  const { balance, addTransaction } = useTransaction();
  const [loading, setLoading] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [iban, setIban] = useState("");

  const handleSuccessfulTransaction = () => {
    setTimeout(() => {
      setSuccessMessage("");
      resetForm();
      setLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    setAmount("");
    setTransactionType("");
    setErrorMessage("");
    setIban("");
  };

  const validateAmount = () => {
    const amountStartsWithZero = amount.startsWith("0");
    if (!amount || isNaN(amount) || amountStartsWithZero) {
      setErrorMessage("Please enter a valid amount.");
      return false;
    }
    return true;
  };

  const handleTransaction = (type) => {
    if (!validateAmount()) return;

    if (type === "withdraw" || type === "transfer") {
      if (amount > balance) {
        setErrorMessage("Insufficient funds!");
        return;
      }
    }

    if (type === "transfer" && !validateIBAN(iban)) {
      setErrorMessage(
        "Invalid IBAN. Please enter a valid IBAN account number."
      );
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("Transaction successful!");

    const txnAmount =
      type === "withdraw" || type === "transfer" ? -amount : parseFloat(amount);
    const description =
      type === "transfer"
        ? `Transfer to ${iban}`
        : type.charAt(0).toUpperCase() + type.slice(1);
    addTransaction(txnAmount, description);
    handleSuccessfulTransaction();
  };

  return (
    <div>
      <Portal portalId={"dialog-portal"}>
        <CenteredModal
          onClose={resetForm}
          show={transactionType}
          title={`Confirm ${
            transactionType.charAt(0).toUpperCase() + transactionType.slice(1)
          }`}
        >
          <div className="flex flex-col gap-10">
            {errorMessage && (
              <Alert
                message={errorMessage}
                className="bg-red-50  border-red-500"
              />
            )}
            {successMessage && (
              <Alert
                message={successMessage}
                className="bg-green-50  border-green-500"
              />
            )}
            <RenderForm
              transactionType={transactionType}
              handleCloseTransactionModal={resetForm}
              onDeposit={(e) => handleTransaction("deposit")}
              onWithdraw={(e) => handleTransaction("withdraw")}
              onTransfer={() => handleTransaction("transfer")}
              amount={amount}
              setAmount={setAmount}
              loading={loading}
              setIban={setIban}
              iban={iban}
            />
          </div>
        </CenteredModal>
      </Portal>
      <Seo title="Home" />
      <PageTitle
        title="Account Summary"
        titleClass="!text-neutral-800"
        className="mb-15"
        slotRight={
          <Button
            className="w-full !bg-primary-50 !text-primary-600 text-body_sm1_normal border border-primary-600"
            onClick={() => router.push("/reports")}
          >
            View Statement
          </Button>
        }
      />
      <section className="flex flex-col lg:flex-row">
        <div className="basis-full lg:basis-[35%]">
          <SideHeader
            title="Account Settings"
            paragraph={
              "This is a sample description of the the default limits on transactions"
            }
          />
        </div>
        <div className="basis-full lg:flex-1">
          <div className="w-full flex flex-col lg:flex-row items-center flex-wrap gap-4 mb-14 text-neutral-900">
            {cardInfo.map((card) => (
              <Card key={card.title} {...card} />
            ))}
            <Card
              title={"Account Balance"}
              value={`USD ${formatAmountWithCommas(balance)}`}
              icon="ri-stack-line"
            />
          </div>
          <div className="w-full flex flex-col lg:flex-row items-center gap-4">
            <Button
              className="w-full bg-success text-white text-body_sm1_normal"
              onClick={() => setTransactionType("deposit")}
            >
              Deposit
            </Button>
            <Button
              className="w-full !bg-danger text-white text-body_sm1_normal"
              onClick={() => setTransactionType("withdraw")}
            >
              Withdraw
            </Button>
            <Button
              className="w-full !bg-info text-white text-body_sm1_normal"
              onClick={() => setTransactionType("transfer")}
            >
              Transfer
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

Home.layout = "AuthenticatedLayout";

export default Home;
