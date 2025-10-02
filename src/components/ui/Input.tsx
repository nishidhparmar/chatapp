import * as React from "react";
import { PiWarningFill } from "react-icons/pi";

import { cn } from "@/utils/cn";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  slotsProps?: {
    containerProps?: React.ComponentProps<"div">;
    labelProps?: React.ComponentProps<"label">;
    errorProps?: React.ComponentProps<"span">;
  };
}

const Input = (props: InputProps) => {
  const {
    label,
    className,
    type,
    error,
    startIcon,
    endIcon,
    slotsProps,
    id: providedId,
    ...rest
  } = props;

  const generatedId = React.useId();
  const inputId = providedId ?? generatedId;
  const errorId = `${inputId}-error`;

  const { containerProps, labelProps, errorProps } = slotsProps || {};

  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);
  const hasError = Boolean(error);

  return (
    <div
      className={cn("relative pb-4 w-full", containerProps?.className)}
      {...containerProps}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-neutral-ct-primary mb-1.5 capitalize",
            labelProps?.className,
            {
              "text-neutral-ct-disabled": rest.disabled,
            }
          )}
          aria-disabled={rest.disabled}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {hasStartIcon && (
          <span
            className="absolute left-3 top-[50%] translate-y-[-50%]"
            aria-hidden="true"
          >
            {startIcon}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          data-slot="input"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            "text-neutral-ct-primary file:text-foreground placeholder:text-neutral-ct-placeholder selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border border-neutral-br-primary bg-transparent px-3 py-4 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-brand-br-active focus-visible:ring-[2px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
            {
              "border-error-br-error border-2": hasError,
              "pl-8": hasStartIcon,
              "pr-8": hasEndIcon,
            }
          )}
          {...rest}
        />
        {hasEndIcon && (
          <span
            className="absolute right-3 top-[50%] translate-y-[-50%]"
            aria-hidden="true"
          >
            {endIcon}
          </span>
        )}
      </div>
      {hasError && (
        <span
          id={errorId}
          className={cn(
            "flex items-center gap-1 absolute -bottom-1.5 left-0 text-error-ct-error text-sm",
            errorProps?.className
          )}
          {...errorProps}
        >
          <PiWarningFill size={16} />
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
