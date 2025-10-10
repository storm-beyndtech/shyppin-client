import { Star } from "lucide-react";
import { AnimatedSection } from "./UI/animated-section";

const Review = ({ quote, author, role, rating }: any) => {
	return (
		<div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 flex-shrink-0">
			<div className="flex mb-3">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className={`w-5 h-5 flex items-center justify-center mr-1 ${
							i < rating ? "bg-blue-500" : "bg-gray-300"
						}`}
					>
						<Star size={12} className="text-white fill-white" />
					</div>
				))}
			</div>
			<h3 className="font-semibold text-gray-900 mb-1">{author}</h3>
			<h4 className="font-medium text-gray-700 mb-2 text-sm">{role}</h4>
			<p className="text-gray-700 text-sm leading-relaxed mb-3">{quote}</p>
			<div className="flex items-center text-xs text-blue-600">
				<span>Shyppin Reviews</span>
			</div>
		</div>
	);
};

export default function Reviews() {
	const testimonials = [
		{
			quote:
				"Exceptional service for our international shipments. Their ocean freight solutions saved us 30% on shipping costs while maintaining reliability.",
			author: "Alex Johnson",
			role: "Ocean freight excellence",
			rating: 5,
		},
		{
			quote:
				"Fast air freight delivery and real-time tracking made our urgent shipments stress-free. Highly recommend their services!",
			author: "Sarah Chen",
			role: "Air freight reliability",
			rating: 5,
		},
		{
			quote:
				"Professional customs brokerage team handled all our documentation seamlessly. No delays, no hassles, just smooth operations.",
			author: "Michael Rodriguez",
			role: "Customs expertise",
			rating: 4,
		},
		{
			quote:
				"Amazing customer support! Their logistics experts are incredibly knowledgeable and always available when we need them.",
			author: "Emma Thompson",
			role: "Outstanding support",
			rating: 5,
		},
		{
			quote:
				"Ground transport network is impressive. Door-to-door delivery with competitive rates and excellent tracking visibility.",
			author: "David Wilson",
			role: "Ground transport leader",
			rating: 5,
		},
		{
			quote: "The warehousing solutions helped us optimize our supply chain better than we ever thought possible.",
			author: "Priya Patel",
			role: "Supply chain optimization",
			rating: 4,
		},
		{
			quote:
				"Comprehensive freight solutions, competitive pricing, and excellent technology platform. A complete logistics partner.",
			author: "James Williams",
			role: "Complete logistics solution",
			rating: 5,
		},
		{
			quote:
				"Recently started using Shyppin and very impressed! Their freight forwarding expertise is exceptional.",
			author: "Olivia Garcia",
			role: "Freight forwarding expert",
			rating: 5,
		},
		{
			quote:
				"Great service and user-friendly tracking system. Makes managing our global shipments stress-free and efficient.",
			author: "Robert Kim",
			role: "Global shipping made easy",
			rating: 5,
		},
		{
			quote:
				"Competitive rates, reliable service, and excellent mobile tracking. Perfect for busy supply chain managers like me.",
			author: "Lisa Martinez",
			role: "Supply chain efficiency",
			rating: 4,
		},
		{
			quote:
				"Multi-modal shipping solutions helped us streamline both our domestic and international logistics operations.",
			author: "Thomas Anderson",
			role: "Multi-modal expertise",
			rating: 5,
		},
		{
			quote:
				"Transparent pricing and no hidden fees. The shipping performance has exceeded our expectations consistently.",
			author: "Jennifer Lopez",
			role: "Transparent and reliable",
			rating: 5,
		},
	];

	return (
		<section className="py-16 bg-opacity-50">
			<div className="container px-4 md:px-8 mx-auto max-w-7xl">
				<AnimatedSection delay={0.1} className="text-center mb-12">
					<h1 className="text-4xl md:text-7xl font-bold mb-6 text-gray-900">
						Excellent on <span className="italic text-gray-500">Trustpilot</span>
					</h1>

					{/* Trustpilot rating display */}
					<div className="flex flex-col items-center mb-8">
						<div className="flex items-center mb-2">
							<span className="text-lg font-semibold mr-3">Excellent</span>
							{[...Array(5)].map((_, i) => (
								<div key={i} className={`w-6 h-6 flex items-center justify-center mr-1 bg-blue-500`}>
									<Star size={16} className="text-white fill-white" />
								</div>
							))}
						</div>
						<p className="text-gray-600 text-sm">
							Rated 4.8 / 5 based on 2,782 reviews on
							<span className="font-semibold"> Trustpilot</span>
						</p>
					</div>

					<p className="text-gray-500 text-sm mb-8">Showing our 4 & 5 star reviews</p>
				</AnimatedSection>

				{/* Reviews container with fixed height and scroll */}
				<div className="h-[600px] overflow-y-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						{/* Column 1 */}
						<div className="space-y-4">
							{testimonials
								.filter((_, index) => index % 4 === 0)
								.map((review, index) => (
									<Review
										key={`col1-${index}`}
										quote={review.quote}
										author={review.author}
										role={review.role}
										rating={review.rating}
										delay={0.2 + index * 0.1}
									/>
								))}
							{/* Add duplicate reviews for continuous scroll */}
							{testimonials
								.filter((_, index) => index % 4 === 0)
								.map((review, index) => (
									<Review
										key={`col1-dup-${index}`}
										quote={review.quote}
										author={review.author}
										role={review.role}
										rating={review.rating}
										delay={1.0 + index * 0.1}
									/>
								))}
						</div>

						{/* Column 2 */}
						<div className="space-y-4">
							{testimonials
								.filter((_, index) => index % 4 === 1)
								.map((review, index) => (
									<Review
										key={`col2-${index}`}
										quote={review.quote}
										author={review.author}
										role={review.role}
										rating={review.rating}
										delay={0.3 + index * 0.1}
									/>
								))}
							{/* Add duplicate reviews for continuous scroll */}
							{testimonials
								.filter((_, index) => index % 4 === 1)
								.map((review, index) => (
									<Review
										key={`col2-dup-${index}`}
										quote={review.quote}
										author={review.author}
										role={review.role}
										rating={review.rating}
										delay={1.1 + index * 0.1}
									/>
								))}
						</div>

						{/* Column 3 */}
						<div className="space-y-4">
							{testimonials
								.filter((_, index) => index % 4 === 2)
								.map((review, index) => (
									<Review
										key={`col3-${index}`}
										quote={review.quote}
										author={review.author}
										role={review.role}
										rating={review.rating}
										delay={0.4 + index * 0.1}
									/>
								))}
							{/* Add duplicate reviews for continuous scroll */}
							{testimonials
								.filter((_, index) => index % 4 === 2)
								.map((review, index) => (
									<Review
										key={`col3-dup-${index}`}
										quote={review.quote}
										author={review.author}
										role={review.role}
										rating={review.rating}
										delay={1.2 + index * 0.1}
									/>
								))}
						</div>

						{/* Column 4 */}
						<div className="space-y-4">
							{testimonials
								.filter((_, index) => index % 4 === 3)
								.map((review, index) => (
									<Review
										key={`col4-${index}`}
										quote={review.quote}
										author={review.author}
										role={review.role}
										rating={review.rating}
										delay={0.5 + index * 0.1}
									/>
								))}
							{/* Add duplicate reviews for continuous scroll */}
							{testimonials
								.filter((_, index) => index % 4 === 3)
								.map((review, index) => (
									<Review
										key={`col4-dup-${index}`}
										quote={review.quote}
										author={review.author}
										role={review.role}
										rating={review.rating}
										delay={1.3 + index * 0.1}
									/>
								))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
