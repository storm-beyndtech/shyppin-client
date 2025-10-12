import { Star } from "lucide-react";
import { AnimatedSection } from "../UI/animated-section";

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
				"Outstanding ocean freight service! Shyppin delivered our cargo safely and on time. The tracking system kept us informed every step of the way.",
			author: "Alex Johnson",
			role: "Global shipping excellence",
			rating: 5,
		},
		{
			quote:
				"Made international shipping accessible for our small business! Simple platform with competitive rates for air and ocean freight.",
			author: "Sarah Chen",
			role: "Small business friendly",
			rating: 5,
		},
		{
			quote:
				"Impressed with the variety of shipping options and transparent pricing. Great flexibility for different cargo types and urgent deliveries.",
			author: "Michael Rodriguez",
			role: "Excellent shipping options",
			rating: 4,
		},
		{
			quote:
				"Amazing customer support! Their logistics team is incredibly knowledgeable and helped us navigate complex customs requirements. THUMBS UP!",
			author: "Emma Thompson",
			role: "Amazing logistics support",
			rating: 5,
		},
		{
			quote:
				"User-friendly tracking tools with reliable delivery times. The automated notifications keep our supply chain optimized without constant monitoring.",
			author: "David Wilson",
			role: "Smart tracking features",
			rating: 5,
		},
		{
			quote: "The shipping guides helped me understand international logistics better than I ever thought possible.",
			author: "Priya Patel",
			role: "Learning made easy",
			rating: 4,
		},
		{
			quote:
				"User-friendly platform, diverse shipping solutions, and excellent customer service. A well-rounded ecosystem for global trade.",
			author: "James Williams",
			role: "My Shyppin experience",
			rating: 5,
		},
		{
			quote:
				"Recently started using Shyppin and very impressed! The freight guidance and customs handling are exceptional.",
			author: "Olivia Garcia",
			role: "What a shipping platform",
			rating: 5,
		},
		{
			quote:
				"Great customer service and intuitive tracking interface. Makes managing our international shipments stress-free and efficient.",
			author: "Robert Kim",
			role: "Stress-free shipping",
			rating: 5,
		},
		{
			quote:
				"Competitive rates, reliable delivery times, and excellent mobile app. Perfect for busy logistics professionals like me.",
			author: "Lisa Martinez",
			role: "Perfect for professionals",
			rating: 4,
		},
		{
			quote:
				"The multi-modal shipping options helped us optimize costs for both urgent air freight and bulk ocean cargo simultaneously.",
			author: "Thomas Anderson",
			role: "Multi-modal solutions",
			rating: 5,
		},
		{
			quote:
				"Transparent pricing and no hidden fees. The delivery performance has exceeded our expectations consistently across all routes.",
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
