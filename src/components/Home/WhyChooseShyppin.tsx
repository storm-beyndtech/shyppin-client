import { useEffect, useRef, useState } from "react";
import { Clock, Shield, Globe, TrendingUp, Headphones, DollarSign, ArrowRight } from "lucide-react";
import Btn from "../Btn";
import { Link } from "react-router-dom";

export default function WhyChooseShyppin() {
	const slideSectionWrapperRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const updateScrollButtons = () => {
		if (slideSectionWrapperRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = slideSectionWrapperRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // 10px threshold
		}
	};

	useEffect(() => {
		const current = slideSectionWrapperRef.current;
		if (current) {
			current.addEventListener("scroll", updateScrollButtons);
			// Initial check
			updateScrollButtons();
			return () => current.removeEventListener("scroll", updateScrollButtons);
		}
	}, []);

	const getScrollAmount = () => {
		const isMobile = window.innerWidth < 640;
		const cardWidth = isMobile ? 400 : 465;
		const gap = 24;
		return cardWidth + gap;
	};

	const handleSlideBack = () => {
		if (slideSectionWrapperRef.current) {
			const scrollAmount = getScrollAmount();
			const currentScroll = slideSectionWrapperRef.current.scrollLeft;

			// If at the start, scroll to the beginning smoothly
			if (currentScroll < scrollAmount) {
				slideSectionWrapperRef.current.scrollTo({
					left: 0,
				});
			} else {
				slideSectionWrapperRef.current.scrollBy({
					left: -scrollAmount,
				});
			}
		}
	};

	const handleSlideFront = () => {
		if (slideSectionWrapperRef.current) {
			const scrollAmount = getScrollAmount();
			const currentScroll = slideSectionWrapperRef.current.scrollLeft;
			const maxScroll =
				slideSectionWrapperRef.current.scrollWidth - slideSectionWrapperRef.current.clientWidth;

			// If near the end, scroll to the end smoothly
			if (currentScroll + scrollAmount > maxScroll) {
				slideSectionWrapperRef.current.scrollTo({
					left: maxScroll,
				});
			} else {
				slideSectionWrapperRef.current.scrollBy({
					left: scrollAmount,
				});
			}
		}
	};

	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex items-end justify-between pb-8">
					<h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug">
						Why Choose <br />
						Shyppin?
					</h2>
					{/* Slide controls */}
					<div className="flex gap-3">
						<Btn type="small" direction="left" onClick={handleSlideBack} enabled={canScrollLeft} />
						<Btn type="small" direction="right" onClick={handleSlideFront} enabled={canScrollRight} />
					</div>
					<h2 className="text-3xl font-semibold text-gray-900 leading-snug text-right max-sm:hidden">
						Trusted <br />
						Logistics
					</h2>
				</div>

				{/* Wrapper with scroll */}
				<div
					className="flex gap-6 overflow-x-scroll no-scrollbar my-5 sm:px-0 px-1"
					ref={slideSectionWrapperRef}
				>
					{whyChooseShyppin.map((feature, index) => (
						<div
							key={index}
							className="grid gap-4 sm:w-96 w-full min-h-80 bg-white p-6 shadow-md rounded-lg shrink-0 hover:shadow-lg transition-shadow duration-300"
						>
							<div className="flex justify-between items-center">
								<h3 className="text-xl font-semibold text-gray-900">
									{feature.title} <br />
									{feature.title2}
								</h3>

								<div className="w-15 h-15 grid place-content-center p-2.5 rounded-[30%] bg-blue-50">
									<feature.icon className="w-8 h-8 text-blue-600" />
								</div>
							</div>
							<p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
							<p className="font-semibold text-blue-600 flex items-center gap-3">
								<TrendingUp className="w-5 h-5" />
								{feature.benefit}
							</p>
							<Link
								to={feature.href}
								className="font-semibold text-gray-900 flex items-center gap-3 hover:text-blue-600 transition-colors"
							>
								Learn more <ArrowRight size={14} />
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

const whyChooseShyppin = [
	{
		title: "Real-Time",
		title2: "Tracking",
		description:
			"Track your shipments 24/7 with our advanced tracking system. Get instant updates on location, delivery status, and estimated arrival times.",
		benefit: "100% Visibility",
		icon: Clock,
		href: "/track",
	},
	{
		title: "Secure",
		title2: "Shipping",
		description:
			"Your cargo is protected with comprehensive insurance coverage and our secure handling protocols throughout the entire journey.",
		benefit: "Full Protection",
		icon: Shield,
		href: "/services",
	},
	{
		title: "Global",
		title2: "Network",
		description:
			"Access our worldwide network of trusted partners and shipping routes. We connect you to over 200 countries and territories.",
		benefit: "Worldwide Reach",
		icon: Globe,
		href: "/about",
	},
	{
		title: "Competitive",
		title2: "Rates",
		description:
			"Get the best shipping rates without compromising on service quality. Our bulk purchasing power means savings for you.",
		benefit: "Cost Savings",
		icon: DollarSign,
		href: "/quote",
	},
	{
		title: "Expert",
		title2: "Support",
		description:
			"Our dedicated logistics experts are available around the clock to assist with your shipping needs and resolve any issues quickly.",
		benefit: "24/7 Support",
		icon: Headphones,
		href: "/support",
	},
	{
		title: "Fast",
		title2: "Delivery",
		description:
			"Choose from our range of express shipping options. From same-day delivery to expedited international shipping.",
		benefit: "Speed Options",
		icon: TrendingUp,
		href: "/services",
	},
];
