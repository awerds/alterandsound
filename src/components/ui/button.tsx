import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-ink text-bg shadow-md hover:opacity-90 hover:-translate-y-0.5',
        accent:
          'bg-gradient-to-r from-amber-500 via-rose-600 to-pink-600 text-white shadow-[0_10px_30px_-8px_rgba(225,29,72,0.58)] hover:brightness-110 hover:-translate-y-0.5 border border-white/25',
        outline:
          'border border-border bg-surface-elevated/80 text-ink backdrop-blur-md hover:border-accent/60 hover:bg-surface-elevated',
        subtle:
          'bg-surface text-ink hover:bg-surface-elevated',
        ghost:
          'text-muted hover:text-ink hover:bg-surface/80',
      },
      size: {
        default: 'min-h-10 px-5 py-2',
        sm: 'min-h-9 px-3.5 text-xs tracking-wide',
        lg: 'min-h-12 px-7 text-sm tracking-wide',
        icon: 'min-h-9 min-w-9 p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
