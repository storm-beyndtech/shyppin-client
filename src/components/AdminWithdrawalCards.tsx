import { useEffect, useState } from 'react';
import { Plane, Ship, Truck } from 'lucide-react';

export default function AdminServiceCards() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [airShipments, setAirShipments] = useState(432);
  const [oceanShipments, setOceanShipments] = useState(1204);
  const [groundShipments, setGroundShipments] = useState(1211);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchShipmentData = async () => {
    try {
      const res = await fetch(`${url}/shipments`);
      const data = await res.json();

      if (res.ok) {
        setShipments(data);
        // Calculate shipments by service type
        const air = data.filter((shipment: any) => shipment.service_type === 'air_freight').length;
        const ocean = data.filter((shipment: any) => shipment.service_type === 'ocean_freight').length;
        const ground = data.filter((shipment: any) => shipment.service_type === 'ground_transport').length;
        
        if (air > 0) setAirShipments(air);
        if (ocean > 0) setOceanShipments(ocean);
        if (ground > 0) setGroundShipments(ground);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShipmentData();
  }, []);

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-800 dark:text-white">
            {Number(airShipments).toLocaleString('en-US')}
          </h2>
          <Plane className="text-3xl text-blue-500" />
        </div>

        <p className="text-xs font-light text-gray-600 dark:text-gray-300">
          Air Freight
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-800 dark:text-white">
            {Number(oceanShipments).toLocaleString('en-US')}
          </h2>
          <Ship className="text-3xl text-blue-600" />
        </div>

        <p className="text-xs font-light text-gray-600 dark:text-gray-300">
          Ocean Freight
        </p>
      </div>

      <div className="flex flex-col gap-2 p-3 rounded-lg bg-white dark:border-gray-900 border-gray-200 dark:bg-gray-950/70 border shadow-lg">
        <div className="w-full flex items-end justify-between">
          <h2 className="text-4xl font-medium text-gray-800 dark:text-white">
            {Number(groundShipments).toLocaleString('en-US')}
          </h2>
          <Truck className="text-3xl text-green-500" />
        </div>

        <p className="text-xs font-light text-gray-600 dark:text-gray-300">
          Ground Transport
        </p>
      </div>
    </div>
  );
}
