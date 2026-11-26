import { m, useScroll, useSpring } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return <m.div aria-hidden style={{ scaleX }} className="progress fixed inset-x-0 top-0 z-[55] h-[3px] bg-gradient-to-r from-accent-strong to-saffron" />
}
