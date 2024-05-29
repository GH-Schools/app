export type SubmitPaymentPayload = {
  firstName: string;
  lastName: string;
  mobile: string;
  email?: string;
  reference: string;
  amount: number | string;
  currency?: string;
};

export type VerifyPaymentPayload = {
  mobile: string;
  reference: string;
};