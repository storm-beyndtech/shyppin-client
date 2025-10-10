import mapIMG from "../assets/map.svg";

export default function Map() {
	return (
		<section className="w-full py-20 max-sm:pt-10 sm:px-4 px-10">
			<div className="w-full max-w-[1400px] mx-auto">
				<div className="max-ctn mb-16  text-center">
					<p className="text-brandPurple font-semibold text-sm">No Regional restriction</p>

					<h2 className="text-2xl sm:text-3xl font-semibold text-darkBlue leading-snug mt-3">
						We've Got <br />
						Global Dominance
					</h2>
				</div>

				<div className="w-full">
					<img src={mapIMG} alt="Map" className="w-full h-auto" />
				</div>
			</div>
		</section>
	);
}
