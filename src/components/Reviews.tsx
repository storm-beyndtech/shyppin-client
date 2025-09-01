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
				<span>Profyt-Opt Reviews</span>
			</div>
		</div>
	);
};

export default function Reviews() {
	const testimonials = [
		{
			quote:
				"Solid regulatory foundation and comprehensive retirement planning. The personalized approach really sets them apart from other platforms.",
			author: "Alex Johnson",
			role: "Retirement planning works for me",
			rating: 5,
		},
		{
			quote:
				"Made investing accessible for everyone! Simple platform with diverse options for both active and hands-off investors.",
			author: "Sarah Chen",
			role: "Investment diversity rocks!",
			rating: 5,
		},
		{
			quote:
				"Impressed with the variety of portfolios and retirement accounts. Transparent fees and great flexibility for different investment styles.",
			author: "Michael Rodriguez",
			role: "Excellent investment options",
			rating: 4,
		},
		{
			quote:
				"Amazing professional support! Their retirement planning advisors are incredibly knowledgeable and helpful. THUMBS UP!",
			author: "Emma Thompson",
			role: "Amazing retirement guidance",
			rating: 5,
		},
		{
			quote:
				"User-friendly tools with competitive returns. The automated rebalancing keeps my portfolio optimized without constant monitoring.",
			author: "David Wilson",
			role: "Smart automation features",
			rating: 5,
		},
		{
			quote: "The educational resources helped me understand investing better than I ever thought possible.",
			author: "Priya Patel",
			role: "Learning made easy",
			rating: 4,
		},
		{
			quote:
				"User-friendly design, diverse portfolios, and excellent educational resources. A well-rounded ecosystem for wealth building.",
			author: "James Williams",
			role: "My Profyt-Opt experience",
			rating: 5,
		},
		{
			quote:
				"Recently started and very impressed! The investment guidance and retirement planning tools are exceptional.",
			author: "Olivia Garcia",
			role: "What an investment platform",
			rating: 5,
		},
		{
			quote:
				"Great customer service and intuitive interface. Makes managing my retirement savings stress-free and efficient.",
			author: "Robert Kim",
			role: "Stress-free investing",
			rating: 5,
		},
		{
			quote:
				"Low fees, high-quality investment options, and excellent mobile app. Perfect for busy professionals like me.",
			author: "Lisa Martinez",
			role: "Perfect for professionals",
			rating: 4,
		},
		{
			quote:
				"The goal-based investing feature helped me plan for my children's education and my own retirement simultaneously.",
			author: "Thomas Anderson",
			role: "Goal-based planning",
			rating: 5,
		},
		{
			quote:
				"Transparent pricing and no hidden fees. The portfolio performance has exceeded my expectations consistently.",
			author: "Jennifer Lopez",
			role: "Transparent and profitable",
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
