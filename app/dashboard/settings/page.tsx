"use client";

import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

interface BillingPlan {
  name: string;
  billingName: string;
  price: number;
  interval: string;
  features: string[];
  isPopular: boolean;
}

const plans: BillingPlan[] = [
  {
    name: "Basic",
    billingName: "basic",
    price: 5,
    interval: "month",
    features: [
      "1,000 API calls/month",
      "1GB storage",
      "Community support",
      "Basic analytics",
    ],
    isPopular: false,
  },
  {
    name: "Pro",
    billingName: "pro",
    price: 29,
    interval: "month",
    features: [
      "100,000 API calls/month",
      "10GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    billingName: "enterprise",
    price: 99,
    interval: "month",
    features: [
      "Unlimited API calls",
      "100GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    isPopular: false,
  },
];

interface SubscriptionData {
  planName: string;
  status: string;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd: boolean;
}

function getSubscriptionStatusText(data: SubscriptionData): string {
  const date =
    (data.currentPeriodEnd &&
      DateTime.fromJSDate(data.currentPeriodEnd).toFormat("MMMM dd, yyyy")) ??
    "";

  if (data.cancelAtPeriodEnd) {
    return `Your subscription has been canceled and will end on ${date}`;
  }
  if (data.status === "trialing") {
    return `Your trial is active until ${date}`;
  }
  return `Your subscription is active until ${date}`;
}

function PlanCard({
  plan,
  subscriptionData,
}: {
  plan: BillingPlan;
  subscriptionData: SubscriptionData | null;
}) {
  const isCurrentPlan = plan.billingName === subscriptionData?.planName;
  const isCanceled = subscriptionData?.cancelAtPeriodEnd;

  const handleSubscribe = async () => {
    const { error } = await authClient.subscription.upgrade({
      plan: plan.name,
      successUrl: "/dashboard/settings",
      cancelUrl: "/dashboard/settings",
    });
    if (error) {
      toast.error("Failed to subscribe. Please try again later.");
      console.error(error);
    }
  };

  const handleCancel = async () => {
    const { error } = await authClient.subscription.cancel({
      returnUrl: "/dashboard/settings",
    });
    if (error) {
      toast.error("Failed to cancel subscription. Please try again later.");
      console.error(error);
    }
  };

  const ActionButton = () => {
    if (!isCurrentPlan)
      return (
        <Button
          variant="default"
          className="w-full cursor-pointer"
          onClick={handleSubscribe}
        >
          Upgrade
        </Button>
      );
    if (isCanceled)
      return (
        <Button
          variant="secondary"
          className="w-full cursor-pointer"
          disabled={true}
        >
          Canceled
        </Button>
      );
    return (
      <Button
        variant="outline"
        className="w-full cursor-pointer"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    );
  };

  return (
    <Card className={`flex flex-col ${plan.isPopular ? "border-primary" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{plan.name}</CardTitle>
          {plan.isPopular && <Badge variant="secondary">Popular</Badge>}
        </div>
        <CardDescription>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">${plan.price}</span>
            <span className="text-muted-foreground">/{plan.interval}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle2 className="text-primary h-4 w-4" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <ActionButton />
      </CardFooter>
    </Card>
  );
}

export default function BillingPage() {
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscriptionData() {
      try {
        const { data: subscriptions } = await authClient.subscription.list();

        if (!subscriptions?.length) {
          setSubscriptionData(null);
          return;
        }

        const activeSubscription = subscriptions.find(
          (sub) => sub.status === "active" || sub.status === "trialing",
        );
        if (!activeSubscription) {
          setSubscriptionData(null);
          return;
        }

        setSubscriptionData({
          planName: activeSubscription.plan,
          status: activeSubscription.status,
          currentPeriodEnd: activeSubscription.periodEnd,
          cancelAtPeriodEnd: activeSubscription.cancelAtPeriodEnd || false,
        });
      } catch (error) {
        console.error("Failed to fetch subscription data:", error);
        toast.error("Failed to load subscription data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubscriptionData();
  }, []);

  return (
    <div className="container space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your subscription, payment methods, and billing history
        </p>
      </div>

      {isLoading ? (
        <div className="flex h-full flex-1 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>
          {subscriptionData && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="flex items-center gap-2">
                Subscription Status
              </AlertTitle>
              <AlertDescription className="flex items-center gap-2">
                {getSubscriptionStatusText(subscriptionData)}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                subscriptionData={subscriptionData}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
