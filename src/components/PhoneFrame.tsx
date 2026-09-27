import type { ReactNode } from 'react'

/**
 * Fluid phone frame, adapted from the 21st.dev "iPhone Mockup" (dynamic-island model):
 * sized by width + aspect-ratio instead of fixed pixels, flat brand-colored bezel.
 */
export function PhoneFrame({ children, className = '', label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <div
      role={label ? 'img' : undefined}
      aria-label={label}
      className={`relative aspect-[393/852] rounded-[14%/6.5%] bg-ink p-[3.2%] shadow-[0_30px_60px_-20px_rgb(15_42_43/0.45),0_0_0_1px_rgb(15_42_43/0.9)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11.5%/5.3%] bg-white">
        {children}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[1.6%] z-10 h-[4.2%] w-[32%] -translate-x-1/2 rounded-full bg-ink" />
        <div aria-hidden className="pointer-events-none absolute bottom-[1.2%] left-1/2 z-10 h-[0.6%] w-[34%] -translate-x-1/2 rounded-full bg-ink/40" />
      </div>
    </div>
  )
}
