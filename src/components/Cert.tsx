import { FileText, Shield, Calendar, MapPin } from "lucide-react";

const CertificateSection = () => {
	return (
		<section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
			{/* Content */}
			<div className="container mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
				<div className="max-w-2xl">
					<h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">Certified & Regulated</h2>

					<p className="text-base sm:leading-8 text-gray-600">
						We operate under the legally registered entity Profyt-Opt, an Australian proprietary company
						regulated by the Australian Securities & Investments Commission (ASIC). Our registration ensures
						compliance with Australian financial regulations and provides you with the security and confidence
						you deserve.
					</p>
				</div>

				<div className="flex-1 max-w-md bg-white rounded-lg shadow-lg p-6 border border-gray-200">
					{/* Key Points */}
					<div className="space-y-4 mb-8">
						<div className="flex items-start space-x-3">
							<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
								<Shield className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">ASIC Regulated</h3>
								<p className="text-gray-600 text-sm">Australian financial regulations</p>
							</div>
						</div>

						<div className="flex items-start space-x-3">
							<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
								<Calendar className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">Registered Since 2020</h3>
								<p className="text-gray-600 text-sm">Established registration since 2020</p>
							</div>
						</div>

						<div className="flex items-start space-x-3">
							<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
								<MapPin className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900 mb-1">Melbourne Based</h3>
								<p className="text-gray-600 text-sm">Located in Melbourne, Victoria, Australia</p>
							</div>
						</div>
					</div>

					{/* CTA Button */}
					<a href="/cert.pdf" target="_blank" rel="noopener noreferrer">
						<button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
							<FileText className="w-5 h-5 mr-2" strokeWidth={1.5} />
							View Official Certificate
						</button>
					</a>
				</div>
			</div>
		</section>
	);
};

export default CertificateSection;
