import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
	const whatsappUrl = 'https://wa.me/message/L5FGSKFBOLPPA1';

	return (
		<a
			href={whatsappUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
			aria-label="Contact us on WhatsApp"
		>
			<MessageCircle className="w-6 h-6" />
			<span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
				Chat with us on WhatsApp
			</span>
		</a>
	);
};

export default WhatsAppButton;