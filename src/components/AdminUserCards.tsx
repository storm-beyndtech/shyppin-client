import { useEffect, useState } from 'react';
import { PiUsersThreeThin } from 'react-icons/pi';

export default function AdminUserCards() {
  const [users, setUsers] = useState<any>(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${url}/users`);
      const data = await res.json();

      if (res.ok) {
        setUsers(data.length - 1);
        setActiveUsers(data.length - 1);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-700 dark:text-white">
            {Number(users).toLocaleString('en-US')}
          </h2>
          <PiUsersThreeThin className="text-4xl text-blue-600" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          All Users
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-700 dark:text-white">
            {Number(0).toLocaleString('en-US')}
          </h2>
          <PiUsersThreeThin className="text-4xl text-rose-500" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          Banned Users
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-700 dark:text-white">
            {Number(activeUsers).toLocaleString('en-US')}
          </h2>
          <PiUsersThreeThin className="text-4xl text-green-500" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          Active Users
        </p>
      </div>
    </div>
  );
}
