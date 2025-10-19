import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 max-h-11 whitespace-nowrap px-5 py-3 rounded-md text-sm font-medium transition-all disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-brand-default cursor-pointer hover:bg-brand-active active:bg-brand-active font-semibold text-neutral-ct-inverse disabled:bg-neutral-disabled disabled:text-neutral-ct-disabled disabled:cursor-not-allowed',
        destructive:
          'bg-error-default cursor-pointer text-white hover:bg-error-active font-semibold focus-visible:ring-error-default dark:focus-visible:ring-destructive/40 dark:bg-error-default',
        outline:
          'border border-neutral-br-primary cursor-pointer font-semibold text-neutral-ct-primary hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-neutral-tertiary cursor-pointer text-neutral-ct-primary hover:bg-neutral-active cursor-pointer text-xs font-semibold',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        'destructive-secondary':
          'bg-error-subtle cursor-pointer text-error-ct-error hover:bg-error-subtle-active font-semibold',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        xs: 'px-3 py-2 text-xs',
        icon: 'p-2 rounded-[8px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
