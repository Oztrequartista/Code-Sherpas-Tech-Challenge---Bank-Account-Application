import React, { useState } from "react";
import { useTransaction } from "@/hooks/useTransaction";
import Input from "../input";
import Button from "../button";

const WithdrawForm = ({ onClose, onWithdraw, amount, setAmount, loading }) => {
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
      <div className=" mt-6 flex items-start gap-4">
        <Button
          onClick={onClose}
          disabled={loading}
          className=" w-full !bg-neutral-400 text-white text-body_sm1_normal !focus:border-0"
        >
          Cancel
        </Button>
        <Button
          loading={loading}
          onClick={(e)=>{
            e.preventDefault()
            onWithdraw()
          }}
          className="w-full !bg-danger text-white text-body_sm1_normal"
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default WithdrawForm;
