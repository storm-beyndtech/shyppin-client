import { useState } from "react";
import { Calculator, MapPin, Package, Truck, CheckCircle, DollarSign, Plane, Ship } from "lucide-react";

const Quote = () => {
	const [formData, setFormData] = useState({
		serviceType: "air",
		origin: "",
		destination: "",
		shipDate: "",
		weight: "",
		dimensions: "",
		cargoType: "general",
		quantity: "",
		name: "",
		company: "",
		email: "",
		phone: "",
	});

	const [quoteResult, setQuoteResult] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Simulate quote calculation
		setTimeout(() => {
			const baseRates = {
				air: 8.5,
				ocean: 2.2,
				ground: 3.8,
			};

			const weight = parseFloat(formData.weight) || 0;
			const baseRate = baseRates[formData.serviceType as keyof typeof baseRates];
			const estimatedCost = weight * baseRate;

			setQuoteResult({
				cost: estimatedCost,
				serviceType: formData.serviceType,
				transitTime: formData.serviceType === "air" ? "2-5 days" : formData.serviceType === "ocean" ? "15-30 days" : "3-7 days",
			});
			setLoading(false);
		}, 2000);
	};

	const quoteIncludes = [
		"All freight charges",
		"Fuel surcharges",
		"Basic insurance coverage",
		"Standard documentation fees",
	];

	const notIncluded = [
		"Customs duties and taxes (varies by country)",
		"Additional insurance (available as add-on)",
		"Special handling fees (if applicable)",
		"Storage or demurrage charges",
	];

	const getServiceIcon = (service: string) => {
		switch (service) {
			case "air":
				return <Plane className="w-5 h-5" />;
			case "ocean":
				return <Ship className="w-5 h-5" />;
			case "ground":
				return <Truck className="w-5 h-5" />;
			default:
				return <Package className="w-5 h-5" />;
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950">
			{/* Hero Section */}
			<div className="bg-gradient-to-b from-blue-700 to-blue-600 text-white py-16">
				<div className="max-w-4xl mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-5xl font-bold mb-4">Get an Instant Freight Quote</h1>
					<p className="text-xl opacity-90">
						Transparent pricing in seconds. No hidden fees, no surprises.
					</p>
				</div>
			</div>

			<div className="max-w-6xl mx-auto px-4 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Quote Form */}
					<div className="lg:col-span-2">
						<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
							<div className="p-8">
								<div className="flex items-center mb-6">
									<div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-2xl flex items-center justify-center mr-4 shadow-inner">
										<Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
										Quote Calculator
									</h2>
								</div>

								<form onSubmit={handleSubmit} className="space-y-8">
									{/* Shipment Details */}
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
											Shipment Details
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Service Type
												</label>
												<select
													name="serviceType"
													value={formData.serviceType}
													onChange={handleInputChange}
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100"
													required
												>
													<option value="air">Air Freight</option>
													<option value="ocean">Ocean Freight</option>
													<option value="ground">Ground Transport</option>
												</select>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Preferred Ship Date
												</label>
												<input
													type="date"
													name="shipDate"
													value={formData.shipDate}
													onChange={handleInputChange}
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Origin City/Port
												</label>
												<input
													type="text"
													name="origin"
													value={formData.origin}
													onChange={handleInputChange}
													placeholder="e.g., Los Angeles, CA"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Destination City/Port
												</label>
												<input
													type="text"
													name="destination"
													value={formData.destination}
													onChange={handleInputChange}
													placeholder="e.g., Hamburg, Germany"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>
										</div>
									</div>

									{/* Cargo Information */}
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
											Cargo Information
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Total Weight (lbs)
												</label>
												<input
													type="number"
													name="weight"
													value={formData.weight}
													onChange={handleInputChange}
													placeholder="e.g., 500"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Dimensions (L x W x H)
												</label>
												<input
													type="text"
													name="dimensions"
													value={formData.dimensions}
													onChange={handleInputChange}
													placeholder="e.g., 48 x 40 x 36 inches"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Cargo Type
												</label>
												<select
													name="cargoType"
													value={formData.cargoType}
													onChange={handleInputChange}
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100"
													required
												>
													<option value="general">General Cargo</option>
													<option value="perishable">Perishable</option>
													<option value="hazardous">Hazardous</option>
													<option value="fragile">Fragile</option>
												</select>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Number of Pieces
												</label>
												<input
													type="number"
													name="quantity"
													value={formData.quantity}
													onChange={handleInputChange}
													placeholder="e.g., 5"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>
										</div>
									</div>

									{/* Contact Information */}
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
											Contact Information
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Full Name
												</label>
												<input
													type="text"
													name="name"
													value={formData.name}
													onChange={handleInputChange}
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Company Name
												</label>
												<input
													type="text"
													name="company"
													value={formData.company}
													onChange={handleInputChange}
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100"
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Email
												</label>
												<input
													type="email"
													name="email"
													value={formData.email}
													onChange={handleInputChange}
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Phone
												</label>
												<input
													type="tel"
													name="phone"
													value={formData.phone}
													onChange={handleInputChange}
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100"
													required
												/>
											</div>
										</div>
									</div>

									{/* Submit Button */}
									<button
										type="submit"
										disabled={loading}
										className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{loading ? (
											<div className="flex items-center justify-center gap-2">
												<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
												Calculating Quote...
											</div>
										) : (
											"Get Free Quote"
										)}
									</button>
								</form>

								{/* Quote Result */}
								{quoteResult && (
									<div className="mt-8 p-6 bg-green-50 dark:bg-green-950/30 rounded-2xl border border-green-200 dark:border-green-800">
										<div className="flex items-center mb-4">
											<CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
											<h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
												Quote Generated Successfully
											</h3>
										</div>
										<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
											<div className="text-center">
												<div className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center justify-center">
													<DollarSign className="w-6 h-6 mr-1" />
													${(quoteResult as any).cost.toFixed(2)}
												</div>
												<p className="text-sm text-green-700 dark:text-green-300">Estimated Cost</p>
											</div>
											<div className="text-center">
												<div className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center justify-center capitalize">
													{getServiceIcon((quoteResult as any).serviceType)}
													<span className="ml-2">{(quoteResult as any).serviceType} Freight</span>
												</div>
												<p className="text-sm text-green-700 dark:text-green-300">Service Type</p>
											</div>
											<div className="text-center">
												<div className="text-lg font-semibold text-green-600 dark:text-green-400">
													{(quoteResult as any).transitTime}
												</div>
												<p className="text-sm text-green-700 dark:text-green-300">Transit Time</p>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Quote Information Sidebar */}
					<div className="space-y-6">
						{/* What's Included */}
						<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
								Quote Includes
							</h3>
							<ul className="space-y-3">
								{quoteIncludes.map((item, index) => (
									<li key={index} className="flex items-start">
										<CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Not Included */}
						<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
								Additional Costs
							</h3>
							<ul className="space-y-3">
								{notIncluded.map((item, index) => (
									<li key={index} className="flex items-start">
										<div className="w-4 h-4 border border-gray-400 rounded mr-2 mt-0.5 flex-shrink-0"></div>
										<span className="text-sm text-gray-600 dark:text-gray-400">{item}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Contact Info */}
						<div className="bg-blue-50 dark:bg-blue-950/30 rounded-3xl p-6">
							<h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
								Need Help?
							</h3>
							<p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
								Our logistics experts are available 24/7 to assist with your quote.
							</p>
							<div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
								<div>📞 +1 (888) 749-7746</div>
								<div>✉️ support@shyppin.com</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Quote;