"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import type { FC } from "react";

interface CounterProps {
	end: number;
	duration?: number;
	suffix?: string;
	prefix?: string;
	decimal?: number;
}

const Counter: FC<CounterProps> = ({ end, duration = 2, suffix = "", prefix = "", decimal = 0 }) => {
	const [count, setCount] = useState(0);
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });

	useEffect(() => {
		if (isInView) {
			let start = 0;
			const increment = end / (duration * 60); // 60fps
			const timer = setInterval(() => {
				start += increment;
				if (start >= end) {
					setCount(end);
					clearInterval(timer);
				} else {
					setCount(Math.floor(start * Math.pow(10, decimal)) / Math.pow(10, decimal));
				}
			}, 1000 / 60);

			return () => clearInterval(timer);
		}
	}, [isInView, end, duration, decimal]);

	return (
		<span ref={ref}>
			{prefix}{decimal > 0 ? count.toFixed(decimal) : Math.floor(count)}{suffix}
		</span>
	);
};

const StatsSection: FC = () => {
	const stats = [
		{ value: 150, suffix: "+", label: "Countries Served" },
		{ value: 50, suffix: "K+", label: "Shipments Annually" },
		{ value: 99.2, suffix: "%", label: "On-Time Delivery", decimal: 1 },
		{ value: 24, suffix: "/7", label: "Customer Support" },
	];

	return (
		<section className="py-16 bg-gray-50 dark:bg-slate-900/30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="text-center"
						>
							<div className="text-3xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
								<Counter
									end={stat.value}
									suffix={stat.suffix}
									decimal={stat.decimal || 0}
									duration={2}
								/>
							</div>
							<div className="text-gray-600 dark:text-gray-400 font-medium">
								{stat.label}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default StatsSection;