"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps extends React.ComponentProps<"input"> {
  label: string;
  rightIcon?: React.ReactNode;
  rightIconClassName?: string;
  error?: string;
  type?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      label,
      rightIcon,
      error,
      rightIconClassName,
      type,
      className,
      id,
      icon: Icon,
      ...props
    },
    ref
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="space-y-1.5">
        <Label htmlFor={inputId} className="font-normal text-sm">
          {label}
        </Label>
        <div className="relative">
          {Icon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          )}
          <Input
            type={inputType}
            ref={ref}
            aria-invalid={!!error}
            id={inputId}
            className={cn(rightIcon && "pr-10", className)}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="!w-5 !h-5" />
              ) : (
                <Eye className="!w-5 !h-5" />
              )}
            </button>
          )}
          {rightIcon && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                rightIconClassName
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export { AuthInput };
