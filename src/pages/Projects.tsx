import Cta from "../components/Home/Cta";
import Agriculture from "../components/projects/Agriculture";
import Hero from "../components/projects/Hero";
import Mining from "../components/projects/Mining";
import OilAndGas from "../components/projects/Oil&Gas";
import Philanthropy from "../components/projects/Philanthropy";

const Projects = () => {
	return (
		<div>
			<Hero />
			<Mining />
			<Agriculture />
			<OilAndGas />
			<Philanthropy />
			<Cta />
		</div>
	);
};

export default Projects;
