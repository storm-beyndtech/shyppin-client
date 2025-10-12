import { useEffect, useState } from 'react';
import { Package, Truck, MapPin, Calendar, Search, Filter, Plus, Edit, Trash2, Eye } from 'lucide-react';

interface TrackingEvent {
  timestamp: string;
  location: string;
  status: string;
  description: string;
}

interface Shipment {
  _id: string;
  trackingNumber: string;
  sender: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
    email?: string;
  };
  recipient: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
    email?: string;
  };
  package: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    declaredValue: number;
    description: string;
    fragile: boolean;
    hazardous: boolean;
  };
  service: {
    type: string;
    cost: number;
    estimatedDelivery: string;
  };
  status: string;
  currentLocation: string;
  trackingEvents: TrackingEvent[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminShipments() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/shipments`, {
        headers: {
          'x-auth-token': token || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setShipments(data);
      } else {
        console.error('Failed to fetch shipments');
      }
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'out-for-delivery':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'exception':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'delayed':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = 
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.sender.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const openShipmentModal = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedShipment(null);
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Shipment Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track and manage all shipments in your freight network
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by tracking number, sender, or recipient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white appearance-none"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="picked-up">Picked Up</option>
            <option value="in-transit">In Transit</option>
            <option value="out-for-delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="delayed">Delayed</option>
            <option value="exception">Exception</option>
          </select>
        </div>

        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} className="mr-2" />
          New Shipment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Shipments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{shipments.length}</p>
            </div>
            <Package className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Transit</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {shipments.filter(s => s.status === 'in-transit').length}
              </p>
            </div>
            <Truck className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {shipments.filter(s => s.status === 'delivered').length}
              </p>
            </div>
            <Package className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Exceptions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {shipments.filter(s => s.status === 'exception' || s.status === 'delayed').length}
              </p>
            </div>
            <Package className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Shipments Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Tracking Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Sender/Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Current Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredShipments.map((shipment) => (
                <tr key={shipment._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {shipment.trackingNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">
                        From: {shipment.sender.name}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        To: {shipment.recipient.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                      {shipment.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-900 dark:text-white">{shipment.service.type}</div>
                      <div className="text-gray-500 dark:text-gray-400">${shipment.service.cost}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      {shipment.currentLocation || 'Not Available'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      {new Date(shipment.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openShipmentModal(shipment)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredShipments.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No shipments found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.'
                : 'Get started by creating a new shipment.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Shipment Detail Modal */}
      {showModal && selectedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Shipment Details - {selectedShipment.trackingNumber}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sender Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedShipment.sender.name}</p>
                    <p><span className="font-medium">Address:</span> {selectedShipment.sender.address}</p>
                    <p><span className="font-medium">City:</span> {selectedShipment.sender.city}, {selectedShipment.sender.state} {selectedShipment.sender.zipCode}</p>
                    <p><span className="font-medium">Country:</span> {selectedShipment.sender.country}</p>
                    {selectedShipment.sender.phone && <p><span className="font-medium">Phone:</span> {selectedShipment.sender.phone}</p>}
                    {selectedShipment.sender.email && <p><span className="font-medium">Email:</span> {selectedShipment.sender.email}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Recipient Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedShipment.recipient.name}</p>
                    <p><span className="font-medium">Address:</span> {selectedShipment.recipient.address}</p>
                    <p><span className="font-medium">City:</span> {selectedShipment.recipient.city}, {selectedShipment.recipient.state} {selectedShipment.recipient.zipCode}</p>
                    <p><span className="font-medium">Country:</span> {selectedShipment.recipient.country}</p>
                    {selectedShipment.recipient.phone && <p><span className="font-medium">Phone:</span> {selectedShipment.recipient.phone}</p>}
                    {selectedShipment.recipient.email && <p><span className="font-medium">Email:</span> {selectedShipment.recipient.email}</p>}
                  </div>
                </div>
              </div>

              {/* Package Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Package Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Weight:</span> {selectedShipment.package.weight} lbs</p>
                    <p><span className="font-medium">Dimensions:</span> {selectedShipment.package.dimensions.length}" × {selectedShipment.package.dimensions.width}" × {selectedShipment.package.dimensions.height}"</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Declared Value:</span> ${selectedShipment.package.declaredValue}</p>
                    <p><span className="font-medium">Description:</span> {selectedShipment.package.description}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Fragile:</span> {selectedShipment.package.fragile ? 'Yes' : 'No'}</p>
                    <p><span className="font-medium">Hazardous:</span> {selectedShipment.package.hazardous ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Tracking Events */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tracking History</h3>
                <div className="space-y-3">
                  {selectedShipment.trackingEvents.length > 0 ? (
                    selectedShipment.trackingEvents.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-1"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{event.description}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{event.location}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(event.status)}`}>
                              {event.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No tracking events available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}