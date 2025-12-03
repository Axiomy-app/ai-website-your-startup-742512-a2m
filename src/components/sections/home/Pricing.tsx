'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Simple Pricing That Scales With You',
  subtitle: "Start free, upgrade when you're ready. No hidden fees, cancel anytime.",
  billingToggle: true,
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      monthlyPrice: 0,
      yearlyPrice: 0,
      isPopular: false,
      features: [
        'Up to 3 automation workflows',
        'Basic integrations',
        'Email support',
        '1GB storage',
        'Community access',
      ],
      ctaText: 'Get Started Free',
      ctaHref: '/signup',
    },
    {
      name: 'Professional',
      description: 'Ideal for growing teams that need advanced features',
      monthlyPrice: 29,
      yearlyPrice: 290,
      isPopular: true,
      features: [
        'Unlimited automation workflows',
        'Advanced integrations',
        'Priority support',
        '50GB storage',
        'Team collaboration',
        'Custom templates',
        'Analytics dashboard',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=pro',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom requirements',
      monthlyPrice: 99,
      yearlyPrice: 990,
      isPopular: false,
      features: [
        'Everything in Professional',
        'Custom integrations',
        'Dedicated support',
        'Unlimited storage',
        'Advanced security',
        'SSO integration',
        'Custom onboarding',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          {config.billingToggle && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className={`text-sm ${!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              >
                Monthly
              </span>
              <button
                onClick={toggleBilling}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                role="switch"
                aria-checked={isYearly}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span
                className={`text-sm ${isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              >
                Yearly
              </span>
              {isYearly && (
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${
                plan.isPopular
                  ? 'border-primary bg-card shadow-lg scale-105'
                  : 'border-border bg-card'
              } transition-all duration-300 hover:shadow-lg`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-xl font-semibold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {plan.monthlyPrice === 0 ? '' : '/month'}
                    </span>
                  </div>
                  {isYearly && plan.yearlyPrice > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.yearlyPrice}/year)
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  className={`w-full mb-6 ${
                    plan.isPopular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Need a custom solution?
            <Button
              variant="link"
              className="p-0 ml-1 h-auto text-primary hover:text-primary/80"
              onClick={() => navigate('/contact')}
            >
              Contact our sales team
            </Button>
          </p>
        </div>
      </div>
    </section>
  );
}
