import React from "react";
import { Input } from "../ui/input";

const Payment = () => {
  return (
    <form className="grid grid-cols-1 gap-3" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
      <Input type="text" placeholder="amount" id="amount" name="amount" value="100" required />
      <Input type="text" placeholder="tax_amount" id="tax_amount" name="tax_amount" value="10" required />
      <Input type="text" placeholder="total_amount" id="total_amount" name="total_amount" value="110" required />
      <Input type="text" placeholder="transaction_uuid" id="transaction_uuid" name="transaction_uuid" required />
      <Input type="text" placeholder="product_code" id="product_code" name="product_code" value="EPAYTEST" required />
      <Input type="text" placeholder="product_service_charge" id="product_service_charge" name="product_service_charge" value="0" required />
      <Input type="text" placeholder="product_delivery_charge" id="product_delivery_charge" name="product_delivery_charge" value="0" required />
      <Input type="text" placeholder="success_url" id="success_url" name="success_url" value="https://esewa.com.np" required />
      <Input type="text" placeholder="failure_url" id="failure_url" name="failure_url" value="https://google.com" required />
      <Input
        type="text"
        placeholder="signed_field_names"
        id="signed_field_names"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
        required
      />
      <Input type="text" placeholder="signature" id="signature" name="signature" required />
      <Input value="Submit" type="submit" />
    </form>
  );
};

export default Payment;
