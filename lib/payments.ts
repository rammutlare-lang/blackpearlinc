export interface PaymentProvider {
  charge(params: { bookingId: string; amountCents: number; reference: string }): Promise<{
    success: boolean;
    providerReference: string;
  }>;
}

/**
 * Stands in for a real gateway (PayFast/Stripe/Paystack) until live merchant
 * credentials are configured. Marks the charge as successful immediately so
 * the booking → pay → confirm flow is fully testable end-to-end.
 */
class ManualPaymentProvider implements PaymentProvider {
  async charge({ reference }: { bookingId: string; amountCents: number; reference: string }) {
    return { success: true, providerReference: reference };
  }
}

export const paymentProvider: PaymentProvider = new ManualPaymentProvider();
