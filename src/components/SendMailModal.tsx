import { FormEvent, useState } from "react";
import Alert from "./UI/Alert";

export default function SendMailModal({ emails, onClose }: any) {
	const [message, setMessage] = useState("");
	const [subject, setSubject] = useState("");
	const [sending, setSending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);
	const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setSending(true);
		setError(null);
		setSuccess(null);

		try {
			const res = await fetch(`${url}/utils/send-mail`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					emails,
					subject,
					message,
				}),
			});

			const data = await res.json();

			if (res.ok) {
				setSuccess(data.message);
				setTimeout(() => onClose(), 2000);
			} else {
				setError(data.message);
				throw new Error(data.message);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSending(false);
		}
	};

	return (
		<div className="w-screen h-screen fixed left-0 top-0 z-9999 flex items-center justify-center backdrop-blur px-2">
			<div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
				<div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
						<h2 className="text-lg text-gray-500 dark:text-gray-300 font-semibold mb-4">
							Send Mail to {emails.length} {emails.length === 1 ? "User" : "Users"}
						</h2>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="editUserLabel">Subject</label>
								<input
									type="text"
									value={subject}
									onChange={(e) => setSubject(e.target.value)}
									className="editUserInput"
									required
								/>
							</div>

							<div>
								<label className="editUserLabel">Message</label>
								<textarea
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className="editUserInput"
									required
								/>
							</div>

							<div className="flex justify-end space-x-2">
								<button
									type="button"
									onClick={onClose}
									className="px-4 py-1.5 rounded-md text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-900"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={sending}
									className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
								>
									{sending ? "Sending..." : "Send"}
								</button>
							</div>

							{error && <Alert type="danger" message={error} />}
							{success && <Alert type="success" message={success as any} />}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
