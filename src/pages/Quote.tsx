import { useState } from "react";
import { Calculator, Package, Truck, CheckCircle, DollarSign, Plane, Ship, AlertCircle } from "lucide-react";

const Quote = () => {
	const [formData, setFormData] = useState({
		serviceType: "air",
		origin: {
			address: "",
			city: "",
			state: "",
			zipCode: "",
			country: "US"
		},
		destination: {
			address: "",
			city: "",
			state: "",
			zipCode: "",
			country: "US"
		},
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
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		
		// Handle nested object properties
		if (name.includes('.')) {
			const [parent, child] = name.split('.');
			setFormData({
				...formData,
				[parent]: {
					...formData[parent as keyof typeof formData],
					[child]: value
				}
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			// Parse dimensions
			const dimensionParts = formData.dimensions.split('x').map(d => parseFloat(d.trim()));
			const [length = 0, width = 0, height = 0] = dimensionParts;

			// Prepare quote request data
			const quoteRequest = {
				customer: {
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					company: formData.company || undefined
				},
				serviceType: formData.serviceType,
				urgency: 'standard',
				package: {
					weight: parseFloat(formData.weight),
					dimensions: {
						length: length,
						width: width,
						height: height
					},
					declaredValue: 1000, // Default value
					description: `${formData.cargoType} cargo`,
					fragile: formData.cargoType === 'fragile',
					hazardous: formData.cargoType === 'hazardous'
				},
				origin: formData.origin,
				destination: formData.destination,
				preferredDeliveryDate: formData.shipDate
			};

			const response = await fetch(`${url}/quotes/request`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(quoteRequest)
			});

			if (response.ok) {
				const result = await response.json();
				setSubmitted(true);
				
				// Calculate estimated cost for display
				const baseRates = {
					air: 8.5,
					ocean: 2.2,
					ground: 3.8,
				};
				const weight = parseFloat(formData.weight) || 0;
				const estimatedCost = weight * baseRates[formData.serviceType as keyof typeof baseRates];
				
				setQuoteResult({
					quoteNumber: result.quoteNumber,
					estimatedCost: Math.round(estimatedCost),
					...result
				});
			} else {
				const errorData = await response.json();
				setError(errorData.message || 'Failed to submit quote request');
			}
		} catch (error) {
			console.error('Error submitting quote:', error);
			setError('Failed to submit quote. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (submitted && quoteResult) {
		return (
			<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-16">
				<div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8">
					<div className="text-center">
						<div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
							<CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
						</div>
						<h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
							Quote Request Submitted!
						</h2>
						<p className="text-gray-600 dark:text-gray-400 mb-8">
							Your quote request has been received. Our logistics experts will review your requirements and send you a detailed quote within 2 hours.
						</p>
						
						<div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
								<div>
									<span className="text-gray-500 dark:text-gray-400">Quote Number:</span>
									<p className="font-semibold text-gray-900 dark:text-gray-100">{(quoteResult as any).quoteNumber}</p>
								</div>
								<div>
									<span className="text-gray-500 dark:text-gray-400">Service Type:</span>
									<p className="font-semibold text-gray-900 dark:text-gray-100 capitalize">{formData.serviceType}</p>
								</div>
								<div>
									<span className="text-gray-500 dark:text-gray-400">From:</span>
									<p className="font-semibold text-gray-900 dark:text-gray-100">{formData.origin.city}, {formData.origin.state}</p>
								</div>
								<div>
									<span className="text-gray-500 dark:text-gray-400">To:</span>
									<p className="font-semibold text-gray-900 dark:text-gray-100">{formData.destination.city}, {formData.destination.state}</p>
								</div>
							</div>
						</div>

						<button
							onClick={() => {
								setSubmitted(false);
								setQuoteResult(null);
								setFormData({
									serviceType: "air",
									origin: { address: "", city: "", state: "", zipCode: "", country: "US" },
									destination: { address: "", city: "", state: "", zipCode: "", country: "US" },
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
							}}
							className="px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-medium"
						>
							Get Another Quote
						</button>
					</div>
				</div>
			</div>
		);
	}

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

								{/* Error Message */}
								{error && (
									<div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
										<div className="flex items-center">
											<AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
											<p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
										</div>
									</div>
								)}

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
										</div>
									</div>

									{/* Origin Address */}
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
											Origin Address
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="md:col-span-2">
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Street Address
												</label>
												<input
													type="text"
													name="origin.address"
													value={formData.origin.address}
													onChange={handleInputChange}
													placeholder="123 Main Street"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													City
												</label>
												<input
													type="text"
													name="origin.city"
													value={formData.origin.city}
													onChange={handleInputChange}
													placeholder="Los Angeles"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													State
												</label>
												<input
													type="text"
													name="origin.state"
													value={formData.origin.state}
													onChange={handleInputChange}
													placeholder="CA"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													ZIP Code
												</label>
												<input
													type="text"
													name="origin.zipCode"
													value={formData.origin.zipCode}
													onChange={handleInputChange}
													placeholder="90210"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>
										</div>
									</div>

									{/* Destination Address */}
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
											Destination Address
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div className="md:col-span-2">
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Street Address
												</label>
												<input
													type="text"
													name="destination.address"
													value={formData.destination.address}
													onChange={handleInputChange}
													placeholder="456 Broadway"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													City
												</label>
												<input
													type="text"
													name="destination.city"
													value={formData.destination.city}
													onChange={handleInputChange}
													placeholder="New York"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													State
												</label>
												<input
													type="text"
													name="destination.state"
													value={formData.destination.state}
													onChange={handleInputChange}
													placeholder="NY"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													ZIP Code
												</label>
												<input
													type="text"
													name="destination.zipCode"
													value={formData.destination.zipCode}
													onChange={handleInputChange}
													placeholder="10001"
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
													Weight (lbs)
												</label>
												<input
													type="number"
													name="weight"
													value={formData.weight}
													onChange={handleInputChange}
													placeholder="1000"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Dimensions (L x W x H in inches)
												</label>
												<input
													type="text"
													name="dimensions"
													value={formData.dimensions}
													onChange={handleInputChange}
													placeholder="48 x 40 x 36"
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
													<option value="fragile">Fragile Items</option>
													<option value="hazardous">Hazardous Materials</option>
													<option value="perishable">Perishable Goods</option>
												</select>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Quantity
												</label>
												<input
													type="number"
													name="quantity"
													value={formData.quantity}
													onChange={handleInputChange}
													placeholder="1"
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
													placeholder="John Doe"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Company (Optional)
												</label>
												<input
													type="text"
													name="company"
													value={formData.company}
													onChange={handleInputChange}
													placeholder="Acme Corp"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Email Address
												</label>
												<input
													type="email"
													name="email"
													value={formData.email}
													onChange={handleInputChange}
													placeholder="john@example.com"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>

											<div>
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
													Phone Number
												</label>
												<input
													type="tel"
													name="phone"
													value={formData.phone}
													onChange={handleInputChange}
													placeholder="+1 (555) 123-4567"
													className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
													required
												/>
											</div>
										</div>
									</div>

									<button
										type="submit"
										disabled={loading}
										className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
									>
										{loading ? (
											<div className="flex items-center gap-2">
												<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
												Calculating Quote...
											</div>
										) : (
											<>
												<Calculator className="w-5 h-5 mr-2" />
												Get Instant Quote
											</>
										)}
									</button>
								</form>
							</div>
						</div>
					</div>

					{/* Quote Benefits */}
					<div className="space-y-6">
						<div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-8">
							<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
								Why Choose Shyppin?
							</h3>
							<div className="space-y-4">
								<div className="flex items-start">
									<div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3 mt-1">
										<DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-gray-100">Best Rates</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Competitive pricing with no hidden fees
										</p>
									</div>
								</div>
								<div className="flex items-start">
									<div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3 mt-1">
										<CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-gray-100">Reliable</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											99.9% on-time delivery guarantee
										</p>
									</div>
								</div>
								<div className="flex items-start">
									<div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3 mt-1">
										<Package className="w-4 h-4 text-purple-600 dark:text-purple-400" />
									</div>
									<div>
										<h4 className="font-semibold text-gray-900 dark:text-gray-100">Secure</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											Full insurance coverage included
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 rounded-3xl p-8">
							<h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
								Service Options
							</h3>
							<div className="space-y-4">
								<div className="flex items-center">
									<Plane className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
									<span className="text-blue-800 dark:text-blue-200">Air Freight - Fast & Global</span>
								</div>
								<div className="flex items-center">
									<Ship className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
									<span className="text-blue-800 dark:text-blue-200">Ocean Freight - Cost Effective</span>
								</div>
								<div className="flex items-center">
									<Truck className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
									<span className="text-blue-800 dark:text-blue-200">Ground Transport - Reliable</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Quote;