import React, { useState } from "react";
import { useTransaction } from "@/hooks/useTransaction";
import Input from "../input";
import Button from "../button";

const TransferForm = ({
  onClose,
  onTransfer,
  loading,
  iban,
  setIban,
  amount,
  setAmount,
}) => {
  return (
    <div className=" flex flex-col gap-4">
      <Input
        type="number"
        label="Amount"
        labelStyles="text-body_sm1_normal text-neutral-600"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
        placeholder="Enter Amount"
      />
      <Input
        type="text"
        label="IBAN"
        labelStyles="text-body_sm1_normal text-neutral-600"
        value={iban}
        onChange={(e) => setIban(e.target.value)}
        placeholder="Enter IBAN"
      />
      <div className=" mt-6 flex items-start gap-4">
        <Button
           disabled={loading}
          onClick={onClose}
          className=" w-full !bg-neutral-400 text-white text-body_sm1_normal !focus:border-0"
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          onClick={(e) => {
            e.preventDefault();
            onTransfer(amount, iban);
          }}
          className="w-full text-white text-body_sm1_normal"
        >
          Transfer
        </Button>
      </div>
    </div>
  );
};

export default TransferForm;
