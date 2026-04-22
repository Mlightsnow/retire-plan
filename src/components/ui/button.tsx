import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-white shadow-[var(--shadow-warm)] hover:shadow-lg hover:brightness-110",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-[var(--gold)]/30 bg-transparent hover:bg-[var(--gold)]/5 hover:border-[var(--gold)]/50 text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-[var(--gold)]/5 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gold:
          "bg-gradient-to-r from-[var(--gold)] to-[var(--gold-deep)] text-white shadow-[var(--shadow-warm)] hover:shadow-lg hover:brightness-110",
      },
      size: {
        default: "h-14 px-6 py-3",
        sm: "h-12 px-4 py-2",
        lg: "h-16 px-8 py-4 text-xl",
        icon: "h-14 w-14",
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
