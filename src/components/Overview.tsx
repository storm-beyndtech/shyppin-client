import { Building2, Landmark, Mountain, Hammer, Leaf, Users2, Tractor, BadgeDollarSign } from "lucide-react";

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
							Profyt-Opt. LTD. is a private Australian company with a long history in the Pilbara and iron
							ore sector, as well as cattle agro-farming. Its mission is to bring Australia's mineral and
							agricultural products to global markets.
						</p>
					</Section>

					<Section icon={Mountain} title="Iron Ore Ventures">
						<p>
							Known as the “flying prospector,” Blue Scope pioneered aerial mineral exploration. Its
							discoveries led to ten major mines, including Hope Downs in partnership with Rio Tinto. Roy
							Hill, a $10B iron ore operation, is now Australia's largest single mine at 55M tonnes/year.
						</p>
					</Section>

					<Section icon={Hammer} title="Innovation & Impact">
						<p>
							Roy Hill introduced Australia’s first pink truck fleet for breast cancer awareness and surpasses
							industry norms in female workforce participation.
						</p>
					</Section>

					<Section icon={Landmark} title="Joint Ventures & Ownership">
						<p>
							HPPL owns 70% of Roy Hill Holdings. The remaining 30% is owned by Marubeni, POSCO, and China
							Steel.
						</p>
					</Section>

					<Section icon={Tractor} title="Agricultural Growth">
						<p>
							From premium cattle stations to wagyu beef and dairy through Bannister Downs, HPPL is reshaping
							the future of Australian agriculture with investments in natural fertilizers via Sirius
							Minerals.
						</p>
					</Section>

					<Section icon={BadgeDollarSign} title="Reinvestment Strategy">
						<p>
							Profits from mining are funneled into long-term agricultural development, with the goal of
							becoming a top-tier beef and dairy producer.
						</p>
					</Section>

					<Section icon={Users2} title="Leadership & Vision">
						<p>
							The Executive Chairman since 1992 has led HPPL through mining diversification and agricultural
							excellence, emphasizing sustainability and growth.
						</p>
					</Section>

					<Section icon={Leaf} title="Legacy & Future">
						<p>
							With investments in agriculture and mining, HPPL honors its legacy while building a
							forward-looking business focused on impact, innovation, and Australian ownership.
						</p>
					</Section>
				</div>
			</div>
		</div>
	);
};

export default Overview;
