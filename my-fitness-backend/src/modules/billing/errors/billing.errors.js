export class BillingError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class BillingInitializationError extends BillingError {
  constructor(message = 'Unable to initialize Razorpay checkout') {
    super(message, 400);
  }
}

export class PaymentVerificationError extends BillingError {
  constructor(message = 'Payment verification failed') {
    super(message, 400);
  }
}

export class PremiumRequiredError extends BillingError {
  constructor(message = 'Premium subscription required') {
    super(message, 402);
  }
}

export class WebhookVerificationError extends BillingError {
  constructor(message = 'Webhook signature verification failed') {
    super(message, 400);
  }
}
