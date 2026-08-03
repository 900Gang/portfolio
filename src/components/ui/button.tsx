import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white hover:shadow-glow-lg hover:scale-105 active:scale-95",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-white/20 bg-transparent hover:bg-white/5 hover:border-white/40",
        secondary:
          "bg-white/10 text-white hover:bg-white/20",
        ghost:
          "hover:bg-white/10 hover:text-white",
        link:
          "text-purple-400 underline-offset-4 hover:underline",
        gradient:
          "relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white before:absolute before:inset-0 before:bg-white/20 before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-500",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
