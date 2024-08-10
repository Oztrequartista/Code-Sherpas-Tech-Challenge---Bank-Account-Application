import DepositForm from "@/components/forms/deposit";
import WithdrawForm from "@/components/forms/widthdraw";
import TransferForm from "@/components/forms/transfer";

const formComponents = {
  deposit: DepositForm,
  withdraw: WithdrawForm,
  transfer: TransferForm,
};

const RenderForm = ({
  transactionType,
  handleCloseTransactionModal,
  onDeposit,
  onWithdraw,
  onTransfer,
  amount,
  setAmount,
  loading,
  iban,
  setIban,
}) => {
  const FormComponent = formComponents[transactionType];

  if (!FormComponent) return null;

  return (
    <FormComponent
      onClose={handleCloseTransactionModal}
      onDeposit={onDeposit}
      onWithdraw={onWithdraw}
      onTransfer={onTransfer}
      amount={amount}
      setAmount={setAmount}
      loading={loading}
      iban={iban}
      setIban={setIban}
    />
  );
};

export default RenderForm;
