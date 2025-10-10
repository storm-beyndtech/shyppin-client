import Cta from "../components/Home/Cta";
import ServicesHero from "../components/Services/ServicesHero";
import AirFreight from "../components/Services/AirFreight";
import OceanFreight from "../components/Services/OceanFreight";
import GroundTransport from "../components/Services/GroundTransport";
import Warehousing from "../components/Services/Warehousing";
import CustomsBrokerage from "../components/Services/CustomsBrokerage";
import AdditionalServices from "../components/Services/AdditionalServices";

const Services = () => {
	return (
		<div>
			<ServicesHero />
			<AirFreight />
			<OceanFreight />
			<GroundTransport />
			<Warehousing />
			<CustomsBrokerage />
			<AdditionalServices />
			<Cta />
		</div>
	);
};

export default Services;