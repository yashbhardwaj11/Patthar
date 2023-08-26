import {
  MockStablecoinAddress,
  MockStablecoinABI,
  PattharAddress,
} from "@/constants/info";
import { useEffect, useState } from "react";

import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { toast } from "react-toastify";
import Bid from "./Bid";

export default function Approval({ amount, tokenId }) {
  const [resetApprovalVars, setResetApprovalVars] = useState(false);
  const [approved, setApproved] = useState(false);
  /// For the payment token
  const [usdcFunctionPrepared, setUsdcFunctionPrepared] = useState(false);

  /// APPROVAL CONFIG ===============

  const { config: usdcConfig } = usePrepareContractWrite({
    address: MockStablecoinAddress,
    abi: MockStablecoinABI,
    functionName: "approve",
    args: [PattharAddress, amount],
    onSuccess() {
      setUsdcFunctionPrepared(true);
    },
  });
  const { data: usdcData, write: usdcApprovalWrite } =
    useContractWrite(usdcConfig);

  const usdcWaitObj = useWaitForTransaction({
    hash: usdcData?.hash,
    onSuccess() {
      setApproved(true);
    },
  });

  /// ====================================

  useEffect(() => {
    if (approved) {
      toast.success("Approval Success.");
      // mintRequestWrite();
    }
  }, [approved]);

  useEffect(() => {
    if (usdcFunctionPrepared && !approved) {
      toast.info("Please select 'Use Default' when setting the spending cap.");
      usdcApprovalWrite();
    }
  }, [usdcFunctionPrepared]);

  useEffect(() => {
    if (resetApprovalVars) {
      setApproved(false);
      setUsdcFunctionPrepared(false);
    }
  }, [resetApprovalVars]);

  return <>{approved ? <Bid amount={amount} id={tokenId} /> : null}</>;
}
