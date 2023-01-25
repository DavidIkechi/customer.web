import React from "react";
import { useLocation } from "react-router-dom";
import PaymentFailed from "../../components/PaymentFailed";

function StripePaymentRedirectPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const success = queryParams.get("success");
  const cancel = queryParams.get("canceled");

  return success ? (
    <p>Payment SuccessFull</p>
  ) : cancel ? (
    <PaymentFailed msg="Payment Canceled" />
  ) : (
    <PaymentFailed msg="Something went wrong" />
  );
}

export default StripePaymentRedirectPage;
