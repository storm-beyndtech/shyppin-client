import { useEffect, useState } from 'react';
import { Truck, Package, Users } from 'lucide-react';

export default function AdminShipmentCards() {
  const [customers, setCustomers] = useState<any>(0);
  const [activeShipments, setActiveShipments] = useState(0);
  const [totalShipments, setTotalShipments] = useState(0);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch customers from users API endpoint
      const customersRes = await fetch(`${url}/users`, {
        headers: {
          ...(token && { 'x-auth-token': token })
        }
      });
      
      if (customersRes.ok) {
        const customersData = await customersRes.json();
        setCustomers(customersData.length);
      }

      // Fetch shipments
      const shipmentsRes = await fetch(`${url}/shipments`, {
        headers: {
          ...(token && { 'x-auth-token': token })
        }
      });
      
      if (shipmentsRes.ok) {
        const shipmentsData = await shipmentsRes.json();
        setTotalShipments(shipmentsData.length);
        const active = shipmentsData.filter((shipment: any) => 
          shipment.status !== 'delivered' && shipment.status !== 'exception'
        ).length;
        setActiveShipments(active);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2 p-3 rounded-lg bg-gray-700 dark:border-gray-700 border-gray-600 dark:bg-gray-800 border shadow-lg animate-pulse">
            <div className="w-full flex flex-row-reverse items-end justify-between">
              <div className="h-10 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="h-3 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col gap-2 p-3 rounded-lg bg-gray-700 dark:border-gray-700 border-gray-600 dark:bg-gray-800 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-100 dark:text-white">
            {Number(totalShipments).toLocaleString('en-US')}
          </h2>
          <Package className="text-4xl text-blue-600" />
        </div>

        <p className="text-xs font-light flex text-gray-300 dark:text-gray-200">
          Total Shipments
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-gray-700 dark:border-gray-700 border-gray-600 dark:bg-gray-800 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-100 dark:text-white">
            {Number(activeShipments).toLocaleString('en-US')}
          </h2>
          <Truck className="text-4xl text-green-500" />
        </div>

        <p className="text-xs font-light flex text-gray-300 dark:text-gray-200">
          Active Shipments
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-gray-700 dark:border-gray-700 border-gray-600 dark:bg-gray-800 border shadow-lg">
        <div className="w-full flex flex-row-reverse items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-100 dark:text-white">
            {Number(customers).toLocaleString('en-US')}
          </h2>
          <Users className="text-4xl text-purple-500" />
        </div>

        <p className="text-xs font-light flex text-gray-300 dark:text-gray-200">
          Customers
        </p>
      </div>
    </div>
  );
}
