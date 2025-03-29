import { env } from "@/env";
import Stripe from "stripe";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY ?? "dummy_key");

type StripePlan = {
  /**
   * Monthly price id
   */
  priceId?: string;
  /**
   * To use lookup key instead of price id
   *
   * https://docs.stripe.com/products-prices/
   * manage-prices#lookup-keys
   */
  lookupKey?: string;
  /**
   * A yearly discount price id
   *
   * useful when you want to offer a discount for
   * yearly subscription
   */
  annualDiscountPriceId?: string;
  /**
   * To use lookup key instead of price id
   *
   * https://docs.stripe.com/products-prices/
   * manage-prices#lookup-keys
   */
  annualDiscountLookupKey?: string;
  /**
   * Plan name
   */
  name: string;
  /**
   * Limits for the plan
   */
  limits?: Record<string, number>;
  /**
   * Plan group name
   *
   * useful when you want to group plans or
   * when a user can subscribe to multiple plans.
   */
  group?: string;
  /**
   * Free trial days
   */
  freeTrial?: {
    /**
     * Number of days
     */
    days: number;
  };
};

export const stripePlans: StripePlan[] = [
  // Example plan
  // {
  //   name: "Pro",
  //   priceId: "price_qwerty",
  // },
];
