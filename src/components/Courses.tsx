import { useEffect, useRef, useState } from "react";
import reactLogo from "../assets/courses/react.svg";
import jsLogo from "../assets/courses/js.svg";
import nextLogo from "../assets/courses/next.svg";
import figmaLogo from "../assets/courses/figma.svg";
import psLogo from "../assets/courses/ps.svg";
import cloudLogo from "../assets/courses/cloud.svg";
import calendar from "../assets/icons/calendar.svg";
import Btn from "./Btn";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Courses() {
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
		<section className="py-16">
			<div className="max-ctn flex items-end justify-between pb-15">
				<h2 className="text-2xl sm:text-3xl font-semibold text-darkBlue leading-snug">
					Explore <br />
					Courses
				</h2>
				{/* Slide controls */}
				<div className="flex gap-3">
					<Btn type="small" direction="left" onClick={handleSlideBack} enabled={canScrollLeft} />
					<Btn type="small" direction="right" onClick={handleSlideFront} enabled={canScrollRight} />
				</div>
				<h2 className="text-3xl font-semibold text-darkBlue leading-snug text-right max-sm:hidden">
					Attain <br />
					Mastery
				</h2>
			</div>

			{/* Wrapper with scroll */}
			<div
				className="max-ctn flex gap-6 overflow-x-scroll no-scrollbar my-5 sm:px-0 px-1"
				ref={slideSectionWrapperRef}
			>
				{courses.map((course, index) => (
					<div
						key={index}
						className="grid gap-4 sm:w-88 w-full min-h-70 bg-[#F9F7FC] p-6 shadow-xs rounded-lg shrink-0"
					>
						<div className="flex justify-between items-center">
							<h3 className="text-xl font-semibold text-darkBlue">
								{course.title} <br />
								{course.title2}
							</h3>

							<div className="w-15 h-15 grid place-content-center p-2.5 rounded-[30%] bg-brandPurple/5">
								<img src={course.img} alt="course logo" className="w-full p-1" />
							</div>
						</div>
						<p className="text-[#8E9198] text-sm leading-relaxed">{course.description}</p>
						<p className="font-semibold text-darkBlue flex items-center gap-3">
							<img src={calendar} alt="icon" />
							{course.duration}
						</p>
						<Link
							to={`/courses/${course.href}`}
							className="font-semibold text-darkBlue flex items-center gap-3"
						>
							Read more <ArrowRight size={14} />
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}

const courses = [
	{
		title: "Frontend ",
		title2: "Development",
		description:
			"Kickstart your journey as a Front-End Dev today. Master the skills to craft exceptional websites and interactive apps.",
		duration: "2 Months | 2 days weekly",
		img: reactLogo,
		href: "frontend-development",
	},
	{
		title: "Backend",
		title2: "Development",
		description:
			"Deploy powerful web and mobile apps with Node.js. Leverage a robust ecosystem to build scalable applications.",
		duration: "2 Months | 2 days weekly",
		img: jsLogo,
		href: "backend-development",
	},
	{
		title: "Full Stack",
		title2: "Development",
		description:
			"Build scalable apps with JavaScript frameworks like React and Node.js, integrating databases for efficient solutions.",
		duration: "4 Months | 4 days weekly",
		img: nextLogo,
		href: "fullstack-development",
	},
	{
		title: "UI/UX",
		title2: "Design",
		description:
			"UI/UX design skills are highly sought after and versatile, spanning various products and industries. With a strong focus on enhancing customer experiences.",
		duration: "2 Months | 2 days weekly",
		img: figmaLogo,
		href: "ui-ux-design",
	},
	{
		title: "Graphic",
		title2: "Design",
		description:
			"Unlock your creative potential and learn how to bring ideas to life through visual design. Create compelling designs for print, digital media, and beyond.",
		duration: "2 Months | 2 days weekly",
		img: psLogo,
		href: "graphic-design",
	},
	{
		title: "Cloud",
		title2: "Fundamentals",
		description:
			"Master cloud platforms, DevOps practices, and infrastructure automation. Build scalable, secure systems with AWS, containers, and CI/CD pipelines.",
		duration: "2 Months | 2 days weekly",
		img: cloudLogo,
		href: "cloud-fundamentals",
	},
];
