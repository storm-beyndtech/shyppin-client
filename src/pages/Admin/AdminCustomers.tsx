import { useEffect, useState } from 'react';
import { Users, Mail, Phone, MapPin, Calendar, Search, Filter, Package, Truck, Eye } from 'lucide-react';

interface Customer {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  totalShipments: number;
  totalValue: number;
  firstOrder: string;
  lastOrder: string;
  source: 'shipment' | 'quote';
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch shipments and quotes to aggregate customer data
      const [shipmentsRes, quotesRes] = await Promise.all([
        fetch(`${url}/shipments`, {
          headers: { 'x-auth-token': token || '' }
        }),
        fetch(`${url}/quotes`, {
          headers: { 'x-auth-token': token || '' }
        })
      ]);

      const customerMap = new Map<string, Customer>();

      // Process shipments
      if (shipmentsRes.ok) {
        const shipments = await shipmentsRes.json();
        shipments.forEach((shipment: any) => {
          // Process sender
          const senderKey = shipment.sender.email || `${shipment.sender.name}-${shipment.sender.address}`;
          if (!customerMap.has(senderKey)) {
            customerMap.set(senderKey, {
              name: shipment.sender.name,
              email: shipment.sender.email || '',
              phone: shipment.sender.phone,
              address: shipment.sender.address,
              city: shipment.sender.city,
              state: shipment.sender.state,
              zipCode: shipment.sender.zipCode,
              country: shipment.sender.country,
              totalShipments: 0,
              totalValue: 0,
              firstOrder: shipment.createdAt,
              lastOrder: shipment.createdAt,
              source: 'shipment'
            });
          }
          const sender = customerMap.get(senderKey)!;
          sender.totalShipments++;
          sender.totalValue += shipment.service.cost;
          sender.lastOrder = shipment.createdAt;
          if (new Date(shipment.createdAt) < new Date(sender.firstOrder)) {
            sender.firstOrder = shipment.createdAt;
          }

          // Process recipient (if different from sender)
          const recipientKey = shipment.recipient.email || `${shipment.recipient.name}-${shipment.recipient.address}`;
          if (recipientKey !== senderKey && !customerMap.has(recipientKey)) {
            customerMap.set(recipientKey, {
              name: shipment.recipient.name,
              email: shipment.recipient.email || '',
              phone: shipment.recipient.phone,
              address: shipment.recipient.address,
              city: shipment.recipient.city,
              state: shipment.recipient.state,
              zipCode: shipment.recipient.zipCode,
              country: shipment.recipient.country,
              totalShipments: 0,
              totalValue: 0,
              firstOrder: shipment.createdAt,
              lastOrder: shipment.createdAt,
              source: 'shipment'
            });
          }
        });
      }

      // Process quotes
      if (quotesRes.ok) {
        const quotesData = await quotesRes.json();
        const quotes = quotesData.quotes || quotesData;
        quotes.forEach((quote: any) => {
          const customerKey = quote.customer.email || `${quote.customer.name}-${quote.origin.address}`;
          if (!customerMap.has(customerKey)) {
            customerMap.set(customerKey, {
              name: quote.customer.name,
              email: quote.customer.email,
              phone: quote.customer.phone,
              address: quote.origin.address,
              city: quote.origin.city,
              state: quote.origin.state,
              zipCode: quote.origin.zipCode,
              country: quote.origin.country,
              totalShipments: 0,
              totalValue: quote.quotedPrice || 0,
              firstOrder: quote.createdAt,
              lastOrder: quote.createdAt,
              source: 'quote'
            });
          } else {
            const customer = customerMap.get(customerKey)!;
            customer.totalValue += quote.quotedPrice || 0;
            customer.lastOrder = quote.createdAt;
            if (new Date(quote.createdAt) < new Date(customer.firstOrder)) {
              customer.firstOrder = quote.createdAt;
            }
          }
        });
      }

      setCustomers(Array.from(customerMap.values()));
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime();
      case 'oldest':
        return new Date(a.firstOrder).getTime() - new Date(b.firstOrder).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      case 'email':
        return a.email.localeCompare(b.email);
      case 'value':
        return b.totalValue - a.totalValue;
      case 'shipments':
        return b.totalShipments - a.totalShipments;
      default:
        return 0;
    }
  });

  const openCustomerModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setShowModal(false);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
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
          Customer Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your freight logistics customers
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers by name, email, or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white appearance-none"
          >
            <option value="newest">Latest Activity</option>
            <option value="oldest">First Activity</option>
            <option value="name">Name A-Z</option>
            <option value="email">Email A-Z</option>
            <option value="value">Highest Value</option>
            <option value="shipments">Most Shipments</option>
          </select>
        </div>

        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Package size={20} className="mr-2" />
          Export Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{customers.length}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {customers.filter(c => {
                  const lastOrderDate = new Date(c.lastOrder);
                  const now = new Date();
                  return lastOrderDate.getMonth() === now.getMonth() && lastOrderDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <Calendar className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${customers.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
              </p>
            </div>
            <Users className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCustomers.map((customer) => (
          <div key={customer._id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
                    {customer.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {customer.totalShipments} shipment{customer.totalShipments !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => openCustomerModal(customer)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <Eye size={16} />
                </button>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  customer.source === 'shipment' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {customer.source === 'shipment' ? 'Shipper' : 'Quote Only'}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail size={16} className="mr-2" />
                <span className="truncate">{customer.email}</span>
              </div>
              
              {customer.phone && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Phone size={16} className="mr-2" />
                  <span>{customer.phone}</span>
                </div>
              )}
              
              {customer.city && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span className="truncate">{customer.city}, {customer.state || customer.country}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar size={16} className="mr-2" />
                <span>First order {new Date(customer.firstOrder).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Truck size={16} className="mr-2" />
                <span className="font-medium">${customer.totalValue.toLocaleString()} total value</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No customers found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm 
              ? 'Try adjusting your search terms.'
              : 'Get started by adding your first customer.'
            }
          </p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Customer Details
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
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-xl">
                    {selectedCustomer.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{selectedCustomer.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedCustomer.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Address Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Address:</span> {selectedCustomer.address}</p>
                    <p><span className="font-medium">City:</span> {selectedCustomer.city}</p>
                    <p><span className="font-medium">State:</span> {selectedCustomer.state}</p>
                    <p><span className="font-medium">ZIP Code:</span> {selectedCustomer.zipCode}</p>
                    <p><span className="font-medium">Country:</span> {selectedCustomer.country}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Business Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Total Shipments:</span> {selectedCustomer.totalShipments}</p>
                    <p><span className="font-medium">Total Value:</span> ${selectedCustomer.totalValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">First Order:</span> {new Date(selectedCustomer.firstOrder).toLocaleDateString()}</p>
                    <p><span className="font-medium">Last Order:</span> {new Date(selectedCustomer.lastOrder).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`inline-flex px-3 py-1 text-sm rounded-full ${
                    selectedCustomer.source === 'shipment' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {selectedCustomer.source === 'shipment' ? 'Active Shipper' : 'Quote Request Only'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}