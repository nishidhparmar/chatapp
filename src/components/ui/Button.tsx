import { cn } from '@/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
    "px-5 py-3 shrink-0 rounded-lg flex item-center justify-center",
    {
        variants: {
            variant: {
                primaryDefault: "bg-brand-default active:bg-brand-active text-neutral-ct-inverse disabled:bg-neutral-disabled disabled:text-neutral-ct-disabled disabled:cursor-not-allowed",
                secondaryDefault:
                    "bg-neutral-tertiary text-neutral-ct-primary active:bg-neutral-active disabled:bg-neutral-disabled disabled:text-neutral-ct-disabled disabled:cursor-not-allowed",
                tertiaryDefault: "text-neutral-ct-primary disabled:text-neutral-ct-disabled disabled:cursor-not-allowed",
                primaryDanger: "bg-error-default text-neutral-ct-inverse active:bg-error-active",
                secondaryDanger: "bg-error-subtle text-error-ct-error active:bg-error-subtle-active ",
                tertiaryDanger: "text-error-ct-error ",

            },
            size: {
                default: "",
                sm: "",
                lg: "",
                icon: "",
            },
        },
        defaultVariants: {
            variant: "primaryDefault",
            size: "default",
        },
    }
)

const Button: React.FC<React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }> = ({ variant, size, className, ...props }) => {
        return (
            <button {...props} className={cn(buttonVariants({ variant, size, className }))}
            />
        );
    }

export default Button;
