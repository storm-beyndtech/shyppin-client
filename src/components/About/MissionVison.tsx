import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function MissionVision() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Grow the blue line height from 0% to 100%
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Parallax vertical movement for subtle floating effect
  const translateY = useTransform(scrollYProgress, [0, 1], ["-20px", "20px"])

  return (
    <section ref={containerRef} className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-stretch gap-8 md:gap-12">
          {/* Mission - Raised */}
          <motion.div
            className="w-full md:w-[48%] text-left md:mt-[-40px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-300 mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              To revolutionize global freight logistics through technology, transparency, and trust. We believe every business 
              deserves reliable, transparent, and affordable freight services that help them compete on a global scale.
            </p>
          </motion.div>

          {/* Animated Vertical Line with Parallax - Hidden on mobile */}
          <div className="hidden md:block w-[6%] relative">
            {/* Static Background Line */}
            <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 bg-gray-200 rounded-full" />
            {/* Animated Blue Line */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 bg-blue-600 origin-top rounded-full"
              style={{ height: lineHeight, y: translateY }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>

          {/* Mobile separator - Visible only on mobile */}
          <div className="md:hidden w-full h-px bg-gray-200 my-8"></div>

          {/* Vision - Lowered */}
          <motion.div
            className="w-full md:w-[48%] text-left md:text-right md:mt-24"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-gray-300 mb-4 sm:mb-6">Our Vision</h2>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              To become the most trusted and innovative freight logistics platform in the world. We envision a future where 
              international shipping is as simple as sending an email, with full transparency and real-time visibility 
              throughout the entire supply chain.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
