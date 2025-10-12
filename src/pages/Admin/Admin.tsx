import AdminShipmentCards from '@/components/AdminUserCards';

export default function Admin() {
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
        <div className="bg-white dark:bg-gray-950/70 border border-gray-200 dark:border-gray-900 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Recent shipments and customer activity will be displayed here.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-950/70 border border-gray-200 dark:border-gray-900 rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
              Create New Shipment
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
              View All Customers
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
              Send Email Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
