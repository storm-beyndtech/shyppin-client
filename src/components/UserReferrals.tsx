import { contextData } from '@/context/AuthContext';
import { CheckSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UserReferrals() {
  const { user } = contextData();
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/?ref=${user.username}`,
      );
      alert('Text copied to clipboard');
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    const fetchReferrals = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${url}/users/referrals/${user.username}`);

        const data = await response.json();
        if (response.ok) {
          setReferrals(data);
        } else {
          console.error('Failed to fetch referrals:', data.message);
        }
      } catch (err) {
        console.error('Error fetching referrals:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchReferrals();
    }
  }, [user]);

  return (
    <div className="dark:bg-gray-900 bg-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold dark:text-white text-gray-900 mb-6">
        Referral Program
      </h2>

      <div className="dark:bg-gray-800 bg-gray-100 p-4 rounded-lg mb-8">
        <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-4">
          Your Referral Link
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={`${window.location.origin}/?ref=${user.username}`}
            readOnly
            className="flex-1 p-3 dark:bg-gray-700 bg-gray-50 border dark:border-gray-600 border-gray-300 rounded-md dark:text-white text-gray-900"
          />
          <button
            onClick={() => handleCopy()}
            className="bg-blue-500 hover:bg-blue-600 p-3 rounded-md"
          >
            <CheckSquare size={20} />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-4">
          Your Referrals
        </h3>
        <div className="dark:bg-gray-800 bg-gray-100 rounded-lg overflow-hidden">
          <table className="w-full text-sm dark:text-gray-300 text-gray-700">
            <thead className="dark:bg-gray-700 bg-gray-200 text-left">
              <tr>
                <th className="p-4 dark:text-white text-gray-900">Username</th>
                <th className="p-4 dark:text-white text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={2}
                    className="p-4 text-center dark:text-gray-400 text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : referrals.length > 0 ? (
                referrals.map((referral: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t dark:border-gray-700 border-gray-300"
                  >
                    <td className="p-4">{referral.username}</td>
                    <td className="p-4">
                      {new Date(referral.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
                    className="p-4 text-center dark:text-gray-400 text-gray-500"
                  >
                    No referrals yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
