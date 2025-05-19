"use client";

import { useState, type ReactNode } from "react";
import { CheckoutContext } from "./CheckoutContext";
import { CheckoutForm } from "../types/checkout";

type Props = {
  children: ReactNode;
};

export const CheckoutProvider = ({ children }: Props) => {
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    address: "",
    paymentMethod: "credit_card",
  });

  return (
    <CheckoutContext.Provider value={{ form, setForm }}>
      {children}
    </CheckoutContext.Provider>
  );
};
