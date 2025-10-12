import Hero from "../components/Home/Hero";
import Cta from "../components/Home/Cta";
import MissionVision from "../components/About/MissionVison";
import StepsSection from "@/components/Home/StepsSection";
import FreightServicesSection from "@/components/Home/FreightServicesSection";
import StatsSection from "@/components/Home/StatsSection";
import Map from "@/components/Home/Map";
import WhyChooseShyppin from "@/components/Home/WhyChooseShyppin";
import Reviews from "@/components/Home/Reviews";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen">
			<Hero />
			<StatsSection />
			<Map />
			<StepsSection />
			<FreightServicesSection />
			<WhyChooseShyppin />
			<MissionVision />
			<Reviews />
			<Cta />
		</div>
	);
};

export default Home;
