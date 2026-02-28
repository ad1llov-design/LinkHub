"use client";

import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

export interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
  annualBillingText?: string;
  saveText?: string;
  popularBadgeText?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
  annualBillingText = "Annual billing",
  saveText = "(Save 20%)",
  popularBadgeText = "Popular",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "#3b82f6",
          "#f43f5e",
          "#10b981",
          "#f59e0b",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <div className="container py-20 mx-auto max-w-7xl">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="text-[var(--text-secondary)] text-lg whitespace-pre-line">
          {description}
        </p>
      </div>

      <div className="flex justify-center mb-10 items-center">
        <div className="relative inline-flex items-center cursor-pointer">
            <Switch
              ref={switchRef}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative"
            />
        </div>
        <span className="ml-3 font-semibold text-[var(--text-primary)]">
          {annualBillingText} <span className="text-emerald-500">{saveText}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: false, amount: 0.1 }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              `rounded-2xl border-[1px] p-8 text-center lg:flex lg:flex-col lg:justify-center relative bg-[var(--card-bg)] text-[var(--text-primary)] transition-all duration-300`,
              plan.isPopular ? "border-[var(--text-primary)] border-2" : "border-[var(--border-color)]",
              "flex flex-col",
              !plan.isPopular && "mt-5",
              index === 0 || index === 2
                ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left"
            )}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 bg-[var(--text-primary)] py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center">
                <Star className="text-[var(--bg-color)] h-4 w-4 fill-current" />
                <span className="text-[var(--bg-color)] ml-1 font-sans font-semibold text-xs uppercase tracking-wider">
                  {popularBadgeText}
                </span>
              </div>
            )}
            <div className="flex-1 flex flex-col">
              <p className="text-base font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                {plan.period !== "Next 3 months" && (
                  <span className="text-sm font-semibold leading-6 tracking-wide text-[var(--text-secondary)]">
                    / {plan.period}
                  </span>
                )}
              </div>

              <ul className="mt-8 gap-4 flex flex-col text-sm">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-left leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-8 border-[var(--border-color)]" />

              <a
                href={plan.href}
                className={cn(
                  "mt-auto group relative w-full gap-2 overflow-hidden text-sm font-semibold tracking-wide py-3 px-4 rounded-xl",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out",
                  plan.isPopular
                    ? "bg-[var(--text-primary)] text-[var(--bg-color)] hover:opacity-90"
                    : "bg-[var(--bg-color)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--border-color)]"
                )}
              >
                {plan.buttonText}
              </a>
              <p className="mt-4 text-xs leading-5 text-[var(--text-secondary)]">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
