import { useEffect, useState } from 'react';
import { Truck, Package, Users } from 'lucide-react';

export default function AdminShipmentCards() {
  const [customers, setCustomers] = useState<any>(0);
  const [activeShipments, setActiveShipments] = useState(156);
  const [totalShipments, setTotalShipments] = useState(2847);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchCustomers = async () => {
    try {
      const res = await fetch(`${url}/users`);
      const data = await res.json();

      if (res.ok) {
        setCustomers(data.length - 1);
      } else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-700 dark:text-white">
            {Number(totalShipments).toLocaleString('en-US')}
          </h2>
          <Package className="text-4xl text-blue-600" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          Total Shipments
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-700 dark:text-white">
            {Number(activeShipments).toLocaleString('en-US')}
          </h2>
          <Truck className="text-4xl text-green-500" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          Active Shipments
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-700 dark:text-white">
            {Number(customers).toLocaleString('en-US')}
          </h2>
          <Users className="text-4xl text-purple-500" />
        </div>

        <p className="text-xs font-light flex text-gray-600 dark:text-gray-300">
          Customers
        </p>
      </div>
    </div>
  );
}
