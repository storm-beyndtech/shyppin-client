import { Building2, Globe, Ship, Truck, Plane, Users2, BarChart3, Shield } from "lucide-react";

const Section = ({ icon: Icon, title, children }: any) => (
	<div className="flex flex-col gap-3 border-t border-gray-200 pt-8 text-justify">
		<div className="flex items-center gap-4">
			<div className="bg-black p-2 w-10 h-10 flex items-center justify-center">
				<Icon className="text-white w-5 h-5" />
			</div>
			<h2 className="text-lg font-bold text-black">
				<span className="text-blue-700">{title}</span>
			</h2>
		</div>
		<div className="text-sm text-gray-800 leading-relaxed">{children}</div>
	</div>
);

const Overview = () => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<div className="border border-gray-200 p-6 space-y-12">
				{/* Section Wrapper */}
				<div className="grid gap-12 md:grid-cols-2">
					<Section icon={Building2} title="Company Overview">
						<p>
							Shyppin is a modern freight forwarding company founded in 2020 to simplify global logistics 
							for businesses of all sizes. We leverage cutting-edge technology and a worldwide network of 
							partners to provide enterprise-level logistics solutions at accessible prices.
						</p>
					</Section>

					<Section icon={Ship} title="Ocean Freight Excellence">
						<p>
							Our ocean freight services connect major ports worldwide with reliable LCL and FCL solutions. 
							We maintain partnerships with leading carriers to ensure competitive rates and flexible 
							scheduling for your cargo, regardless of size or destination.
						</p>
					</Section>

					<Section icon={Plane} title="Air Freight Solutions">
						<p>
							When time is critical, our air freight services deliver. From express overnight shipments 
							to consolidated cargo flights, we provide fast, secure transportation with real-time tracking 
							and dedicated customer support throughout the journey.
						</p>
					</Section>

					<Section icon={Truck} title="Ground Transportation">
						<p>
							Our extensive ground network covers major trade routes with reliable trucking, rail, and 
							last-mile delivery services. We ensure seamless door-to-door delivery with competitive 
							rates and flexible scheduling options.
						</p>
					</Section>

					<Section icon={Globe} title="Global Network & Reach">
						<p>
							With operations spanning over 200 countries and territories, Shyppin's network of trusted 
							partners ensures your cargo reaches its destination safely and on time, no matter where 
							in the world your business needs to go.
						</p>
					</Section>

					<Section icon={BarChart3} title="Technology & Innovation">
						<p>
							Our proprietary logistics platform provides real-time tracking, automated documentation, 
							and intelligent route optimization. Advanced analytics help you make informed decisions 
							about your supply chain and logistics operations.
						</p>
					</Section>

					<Section icon={Users2} title="Expert Team & Support">
						<p>
							Our team of logistics professionals brings decades of combined experience in freight 
							forwarding, customs brokerage, and supply chain management. We're available 24/7 to 
							support your shipping needs and resolve any challenges.
						</p>
					</Section>

					<Section icon={Shield} title="Security & Compliance">
						<p>
							Your cargo is protected by comprehensive insurance coverage and strict security protocols. 
							We maintain full compliance with international shipping regulations and customs requirements 
							to ensure smooth, hassle-free deliveries.
						</p>
					</Section>
				</div>
			</div>
		</div>
	);
};

export default Overview;
