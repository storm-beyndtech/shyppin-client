import Hero from "../components/Home/Hero";
import Cta from "../components/Home/Cta";
import MissionVision from "../components/About/MissionVison";
import StepsSection from "@/components/Home/StepsSection";
import Reviews from "@/components/Reviews";
import FreightServicesSection from "@/components/Home/FreightServicesSection";
import FreightFeaturesSection from "@/components/Home/FreightFeaturesSection";
import StatsSection from "@/components/Home/StatsSection";
import Map from "@/components/Home/Map";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen">
			<Hero />
			<StatsSection />
      <FreightFeaturesSection />
      <Map />
			<StepsSection />
			<FreightServicesSection />
			<MissionVision />
			<Reviews />
			<Cta />
		</div>
	);
};

export default Home;
