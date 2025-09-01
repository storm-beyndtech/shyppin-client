import Hero from "../components/Home/Hero";
import TradingViewWidget from "../components/TVWidget";
import InvestorCard from "../components/Home/InvestorCard";
import Cta from "../components/Home/Cta";
import UnifiedBusinessSections from "../components/Home/UnifiedBusinessSections";
import TransactionsSection from "../components/Home/TransactionsSection";
import MissionVision from "../components/About/MissionVison";
import StepsSection from "@/components/Home/StepsSection";
import InvestmentOverviewSection from "@/components/Home/InvestmentOverviewSection";
import Reviews from "@/components/Reviews";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Home: React.FC = () => {
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const ref = searchParams.get("ref");
		if (ref) localStorage.setItem("referrer", ref);
	}, []);

	return (
		<div className="min-h-screen">
			<Hero />
			<StepsSection />
			<TradingViewWidget />
			<InvestmentOverviewSection />
			<MissionVision />
			<UnifiedBusinessSections />
			<InvestorCard />
			<TransactionsSection />
			<Reviews />
			<Cta />
		</div>
	);
};

export default Home;
