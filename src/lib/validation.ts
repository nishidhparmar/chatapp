import z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least 1 number.',
    })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
      message: 'Password must contain at least 1 special character.',
    }),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export const VerifyOTPSchema = z.object({
  otp: z
    .string()
    .length(6, {
      message: 'OTP must be 6 digits.',
    })
    .regex(/^\d+$/, {
      message: 'OTP must contain only numbers.',
    }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters.',
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least 1 number.',
      })
      .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
        message: 'Password must contain at least 1 special character.',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
