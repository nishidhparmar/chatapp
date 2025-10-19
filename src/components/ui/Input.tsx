import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'text-neutral-ct-primary file:text-foreground placeholder:text-neutral-ct-placeholder placeholder:text-sm placeholder:font-normal selection:bg-brand-ct-brand selection:text-primary-foreground dark:bg-input/30 h-11 w-full min-w-0 rounded-md border border-neutral-br-primary bg-transparent p-3 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-tertiary disabled:text-neutral-ct-secondary md:text-sm',
        'focus-visible:border-brand-br-active focus-visible:ring-[1px] focus-visible:ring-brand-br-active',
        'aria-invalid:ring-error-br-error dark:aria-invalid:ring-error-br-error aria-invalid:border-error-br-error',
        className
      )}
      {...props}
    />
  );
}

export default Input;
