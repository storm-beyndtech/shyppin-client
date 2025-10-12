import mapIMG from "../../assets/map.svg";

export default function Map() {
	return (
		<section className="w-full py-20 max-sm:pt-10 sm:px-4 px-10">
			<div className="w-full max-w-[1400px] mx-auto">
				<div className="max-ctn mb-16  max-sm:px-0 sm:text-center">
					<p className="text-blue-600 font-semibold text-sm">Worldwide Shipping Network</p>

					<h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug mt-3">
						Global Freight Solutions <br className="max-sm:hidden" />
						Connecting Every Continent
					</h2>
				</div>

				<div className="w-full">
					<img src={mapIMG} alt="Map" className="w-full h-auto" />
				</div>
			</div>
		</section>
	);
}
