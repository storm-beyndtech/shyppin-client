import AboutSection from "../components/About/AboutSection";
import Hero from "../components/About/Hero";
import MissionVison from "../components/About/MissionVison";
import Testimonials from "../components/About/Testimonials";
import Overview from "../components/Overview";
import Cta from "../components/Home/Cta";
import CertificateSection from "@/components/Cert";

const About = () => {
	return (
		<div>
			<Hero />
			<CertificateSection />
			<MissionVison />
			<AboutSection />
			<Overview />
			<Testimonials />
			<Cta />
		</div>
	);
};

export default About;
