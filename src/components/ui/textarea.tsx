import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        // border and ring now match text color tokens
        'text-neutral-ct-primary placeholder:text-neutral-ct-placeholder placeholder:text-sm placeholder:font-normal selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border border-neutral-br-primary bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-brand-br-active focus-visible:ring-[1px] focus-visible:ring-brand-br-active aria-invalid:ring-error-br-error dark:aria-invalid:ring-error-br-error aria-invalid:border-error-br-error disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
