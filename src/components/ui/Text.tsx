import { cn } from '@/utils/cn'
import { cva, VariantProps } from 'class-variance-authority'
import React, { FC, HTMLAttributes } from 'react'

const textVariants = cva(
    "px-5 py-3 shrink-0 rounded-lg flex items-center justify-center",
    {
        variants: {
            variant: {
                heading1: "text-[44px] font-semibold",
                heading2: "text-[40px] font-semibold",
                heading3: "text-[36px] font-semibold",
                heading4: "text-[28px] font-semibold",
                heading5: "text-[24px] font-semibold",
                bodyLargeRegular: "text-[24px] font-normal",
                bodyLargeSemiBold: "text-[24px] font-semibold",
                bodyMediumRegular: "text-[14px] font-normal",
                bodyMediumSemiBold: "text-[14px] font-semibold",
                bodySmallRegular: "text-[12px] font-normal",
                bodySmallSemiBold: "text-[12px] font-semibold",
                bodyExtraSmallRegular: "text-[10px] font-normal",
                bodyExtraSmallSemiBold: "text-[10px] font-semibold"
            },
            size: {
                default: "",
                sm: "",
                lg: "",
                icon: "",
            },
        },
        defaultVariants: {
            variant: "heading1",
            size: "default",
        },
    }
)

interface TextProps extends VariantProps<typeof textVariants>, HTMLAttributes<HTMLParagraphElement> { }

const Text: FC<TextProps> = ({ variant, size, className, ...props }) => {
    return (
        <p
            className={cn(textVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export default Text
