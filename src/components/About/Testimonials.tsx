import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
	{
		id: 1,
		text: "Shyppin has transformed our global supply chain. Their real-time tracking and competitive ocean freight rates have reduced our shipping costs by 30% while improving delivery times across Asia-Pacific routes.",
		author: "Michael J.",
		position: "Logistics Director",
		image:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww",
	},
	{
		id: 2,
		text: "Working with Shyppin has been a game-changer for our international expansion. Their air freight solutions and customs expertise made entering new markets seamless and stress-free.",
		author: "Sarah L.",
		position: "Supply Chain Manager",
		image:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
	},
	{
		id: 3,
		text: "From e-commerce fulfillment to bulk cargo shipments, Shyppin's technology platform provides complete visibility. Their 24/7 support team always delivers when we need them most.",
		author: "David N.",
		position: "Operations Manager",
		image:
			"https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyfGVufDB8fDB8fHww",
	},
	{
		id: 4,
		text: "Shyppin's ground transportation network has revolutionized our last-mile delivery. Their commitment to sustainability and efficiency aligns perfectly with our company values.",
		author: "Emma R.",
		position: "Freight Coordinator",
		image:
			"https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
	},
	{
		id: 5,
		text: "As a growing business, we needed a freight partner who could scale with us. Shyppin's global network and competitive pricing have supported our expansion into 15 new countries.",
		author: "Andrew F.",
		position: "International Trade Director",
		image:
			"https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
	},
	{
		id: 6,
		text: "Shyppin's expertise in customs regulations and documentation has eliminated delays in our import operations. Their proactive communication keeps us informed every step of the way.",
		author: "Julie T.",
		position: "Import/Export Specialist",
		image:
			"https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
	},
	{
		id: 7,
		text: "The digital transformation Shyppin brought to our shipping processes is remarkable. Real-time tracking, automated documentation, and intelligent routing have streamlined our entire operation.",
		author: "Luke S.",
		position: "Supply Chain Analyst",
		image:
			"https://plus.unsplash.com/premium_photo-1691784781482-9af9bce05096?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
	},
	{
		id: 8,
		text: "What sets Shyppin apart is their innovative approach to traditional logistics challenges. They combine cutting-edge technology with deep industry expertise to deliver exceptional results.",
		author: "Naomi K.",
		position: "Procurement Manager",
		image:
			"https://plus.unsplash.com/premium_photo-1688350839154-1a131bccd78a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHxhdmF0YXJ8ZW58MHx8MHx8fDA%3D",
	},
];

export default function Testimonials() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [autoPlay] = useState(true);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const totalTestimonials = testimonials.length;
	const [visibleCount, setVisibleCount] = useState(4);

	// Update visible count based on screen size
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) {
				setVisibleCount(1);
			} else if (window.innerWidth < 1024) {
				setVisibleCount(2);
			} else {
				setVisibleCount(4);
			}
		};

		// Set initial value
		handleResize();

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Clean up
		return () => {
			window.removeEventListener("resize", handleResize);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	// Auto-scroll functionality
	useEffect(() => {
		if (!autoPlay) return;

		timeoutRef.current = setTimeout(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalTestimonials - visibleCount + 1));
		}, 5000);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [currentIndex, autoPlay, totalTestimonials, visibleCount]);

	const nextTestimonial = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalTestimonials - visibleCount + 1));
	};

	const prevTestimonial = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setCurrentIndex(
			(prevIndex) => (prevIndex === 0 ? totalTestimonials - visibleCount : prevIndex - 1) % totalTestimonials,
		);
	};

	// Get visible testimonials
	const getVisibleTestimonials = () => {
		const result = [];
		for (let i = 0; i < visibleCount; i++) {
			const index = (currentIndex + i) % totalTestimonials;
			result.push(testimonials[index]);
		}
		return result;
	};

	return (
		<section className="py-12 sm:py-16 md:py-20 bg-gray-50">
			<div className="container mx-auto px-4">
				<div className="mb-8 sm:mb-12 md:mb-16">
					<h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-900 mb-2 sm:mb-4">
						TESTIMONIALS
					</h3>
					<h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 sm:mb-2">
						Don't take our <span className="text-blue-500">word for it!</span>
					</h2>
					<p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-gray-800">
						Hear it from our clients.
					</p>
				</div>

				<div className="relative">
					{/* Testimonials Carousel */}
					<div className="overflow-hidden">
						<AnimatePresence initial={false}>
							<div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6">
								{getVisibleTestimonials().map((testimonial, index) => (
									<motion.div
										key={`${testimonial.id}-${index}`}
										className={`bg-white rounded-lg shadow-sm shrink-0 w-full sm:w-[440px]`}
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -50 }}
										transition={{ duration: 0.5 }}
									>
										<div className="p-4 sm:p-6 md:p-8 flex flex-col h-full min-h-[200px] sm:min-h-[250px]">
											<div className="mb-4 sm:mb-6">
												<img
													src={testimonial.image || "/placeholder.svg"}
													alt={testimonial.author}
													className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
												/>
											</div>
											<p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 flex-grow">
												"{testimonial.text}"
											</p>
											<div className="mt-auto">
												<h4
													className="font-bold text-lg sm:text-xl text-gray-900"
													style={{ fontFamily: "system-ui, sans-serif" }}
												>
													{testimonial.author}
												</h4>
												<p className="text-xs sm:text-sm text-gray-600">{testimonial.position}</p>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</AnimatePresence>
					</div>

					{/* Navigation Controls */}
					<div className="flex justify-start mt-6 sm:mt-10 space-x-2">
						<button
							onClick={prevTestimonial}
							className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
							aria-label="Previous testimonial"
						>
							<ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
						</button>
						<button
							onClick={nextTestimonial}
							className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
							aria-label="Next testimonial"
						>
							<ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
						</button>
					</div>

					{/* Pagination indicators */}
					<div className="flex justify-start mt-4 space-x-1 sm:space-x-2">
						{Array.from({ length: totalTestimonials - visibleCount + 1 }).map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-2 h-2 rounded-full ${
									index === currentIndex ? "bg-blue-500" : "bg-gray-300"
								} transition-colors`}
								aria-label={`Go to testimonial set ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
