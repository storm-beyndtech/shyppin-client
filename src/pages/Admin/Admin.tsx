import { useNavigate } from 'react-router-dom';
import AdminShipmentCards from '@/components/AdminUserCards';

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of your Shyppin logistics operations
        </p>
      </div>
      
      <AdminShipmentCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 dark:bg-gray-900 border border-gray-600 dark:border-gray-700 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-100 dark:text-white mb-4">
            Recent Activity
          </h3>
          <p className="text-gray-300 dark:text-gray-200">
            Recent shipments and customer activity will be displayed here.
          </p>
        </div>
        
        <div className="bg-gray-800 dark:bg-gray-900 border border-gray-600 dark:border-gray-700 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-100 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button 
              onClick={() => navigate('/admin/shipments')}
              className="w-full text-left px-3 py-2 text-sm text-blue-400 hover:bg-gray-700 dark:hover:bg-gray-800 rounded transition-colors"
            >
              Create New Shipment
            </button>
            <button 
              onClick={() => navigate('/admin/customers')}
              className="w-full text-left px-3 py-2 text-sm text-blue-400 hover:bg-gray-700 dark:hover:bg-gray-800 rounded transition-colors"
            >
              View All Customers
            </button>
            <button 
              onClick={() => navigate('/admin/mail')}
              className="w-full text-left px-3 py-2 text-sm text-blue-400 hover:bg-gray-700 dark:hover:bg-gray-800 rounded transition-colors"
            >
              Send Email Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
