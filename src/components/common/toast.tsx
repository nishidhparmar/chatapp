'use client';

import { toast } from 'sonner';

interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
}

export const showToast = {
  success: ({ title, description, duration = 4000 }: ToastOptions) => {
    toast.success(title, {
      description,
      duration,
      className: 'bg-neutral-900 text-white border-neutral-700',
      style: {
        backgroundColor: '#171717',
        color: '#ffffff',
        border: '1px solid #404040',
      },
    });
  },

  error: ({ title, description, duration = 4000 }: ToastOptions) => {
    toast.error(title, {
      description,
      duration,
      className: 'bg-neutral-900 text-white border-neutral-700',
      style: {
        backgroundColor: '#171717',
        color: '#ffffff',
        border: '1px solid #404040',
      },
    });
  },

  info: ({ title, description, duration = 4000 }: ToastOptions) => {
    toast.info(title, {
      description,
      duration,
      className: 'bg-neutral-900 text-white border-neutral-700',
      style: {
        backgroundColor: '#171717',
        color: '#ffffff',
        border: '1px solid #404040',
      },
    });
  },

  warning: ({ title, description, duration = 4000 }: ToastOptions) => {
    toast.warning(title, {
      description,
      duration,
      className: 'bg-neutral-900 text-white border-neutral-700',
      style: {
        backgroundColor: '#171717',
        color: '#ffffff',
        border: '1px solid #404040',
      },
    });
  },

  loading: ({ title, description }: Omit<ToastOptions, 'duration'>) => {
    return toast.loading(title, {
      description,
      className: 'bg-neutral-900 text-white border-neutral-700',
      style: {
        backgroundColor: '#171717',
        color: '#ffffff',
        border: '1px solid #404040',
      },
    });
  },

  // Generic toast without icon
  default: ({ title, description, duration = 4000 }: ToastOptions) => {
    toast(title, {
      description,
      duration,
      className: 'bg-neutral-900 text-white border-neutral-700',
      style: {
        backgroundColor: '#171717',
        color: '#ffffff',
        border: '1px solid #404040',
      },
    });
  },
};
