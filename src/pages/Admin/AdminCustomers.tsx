import { useEffect, useState } from 'react';
import { Users, Mail, Phone, MapPin, Calendar, Search, Filter, Package, Truck, Eye, CheckCircle, AlertCircle } from 'lucide-react';

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
  const [sendingEmail, setSendingEmail] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please log in.');
        return;
      }
      
      // Fetch shipments and quotes to aggregate customer data
      const [shipmentsRes, quotesRes] = await Promise.all([
        fetch(`${url}/shipments`, {
          headers: { 'x-auth-token': token }
        }),
        fetch(`${url}/quotes`, {
          headers: { 'x-auth-token': token }
        })
      ]);

      const customerMap = new Map<string, Customer>();
      let hasData = false;

      // Process shipments
      if (shipmentsRes.ok) {
        const shipments = await shipmentsRes.json();
        if (Array.isArray(shipments) && shipments.length > 0) {
          hasData = true;
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
            sender.totalValue += shipment.service?.cost || 0;
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
      } else {
        const errorData = await shipmentsRes.json().catch(() => ({}));
        console.warn('Failed to fetch shipments:', errorData.message || shipmentsRes.status);
      }

      // Process quotes
      if (quotesRes.ok) {
        const quotesData = await quotesRes.json();
        const quotes = Array.isArray(quotesData) ? quotesData : quotesData.quotes || [];
        if (quotes.length > 0) {
          hasData = true;
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
      } else {
        const errorData = await quotesRes.json().catch(() => ({}));
        console.warn('Failed to fetch quotes:', errorData.message || quotesRes.status);
      }

      setCustomers(Array.from(customerMap.values()));
      
      if (hasData) {
        setSuccess('Customer data loaded successfully');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      setError(`Error fetching customer data: ${errorMessage}`);
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

  const sendEmail = async (customer: Customer) => {
    if (!customer.email) {
      setError('Customer does not have an email address.');
      return;
    }

    try {
      setSendingEmail(true);
      setError('');
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please log in.');
        return;
      }
      
      const response = await fetch(`${url}/mail/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          recipients: [customer.email],
          subject: 'Thank you for choosing Shyppin',
          message: `Dear ${customer.name},

Thank you for being a valued customer of Shyppin. We appreciate your business and look forward to continuing to serve your freight logistics needs.

If you have any questions or need assistance with any of your shipments, please don't hesitate to reach out to our customer service team.

Best regards,
The Shyppin Team`
        })
      });

      if (response.ok) {
        setSuccess(`Email sent successfully to ${customer.name}!`);
        setTimeout(() => setSuccess(''), 5000);
        closeModal();
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Failed to send email (${response.status})`;
        setError(errorMessage);
        console.error('Send email error:', response.status, errorMessage);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Network error occurred';
      setError(`Error sending email: ${errorMessage}`);
      console.error('Error sending email:', error);
    } finally {
      setSendingEmail(false);
    }
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
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Customer Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your freight logistics customers
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
            <p className="text-green-800 dark:text-green-200 text-sm">{success}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-800">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers by name, email, or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-base border border-gray-600 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-white"
          />
        </div>
        
        <div className="relative sm:w-auto w-full">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full pl-10 pr-8 py-3 text-base border border-gray-600 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-white appearance-none"
          >
            <option value="newest">Latest Activity</option>
            <option value="oldest">First Activity</option>
            <option value="name">Name A-Z</option>
            <option value="email">Email A-Z</option>
            <option value="value">Highest Value</option>
            <option value="shipments">Most Shipments</option>
          </select>
        </div>

        <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap min-h-[48px] text-base">
          <Package size={20} className="mr-2" />
          <span className="hidden sm:inline">Export Data</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-200 truncate">Total Customers</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-100 dark:text-white">{customers.length}</p>
            </div>
            <Users className="text-blue-600 flex-shrink-0" size={20} />
          </div>
        </div>

        <div className="bg-gray-700 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-200 truncate">Active This Month</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-100 dark:text-white">
                {customers.filter(c => {
                  const lastOrderDate = new Date(c.lastOrder);
                  const now = new Date();
                  return lastOrderDate.getMonth() === now.getMonth() && lastOrderDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <Calendar className="text-green-600 flex-shrink-0" size={20} />
          </div>
        </div>

        <div className="bg-gray-700 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-200 truncate">Total Revenue</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-100 dark:text-white">
                ${customers.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}
              </p>
            </div>
            <Users className="text-purple-600 flex-shrink-0" size={20} />
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sortedCustomers.map((customer, index) => (
          <div key={index} className="bg-gray-700 dark:bg-gray-800 rounded-lg border border-gray-600 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm sm:text-lg">
                    {customer.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-100 dark:text-white text-sm sm:text-base truncate">
                    {customer.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-200">
                    {customer.totalShipments} shipment{customer.totalShipments !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <button
                  onClick={() => openCustomerModal(customer)}
                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-2"
                >
                  <Eye size={16} />
                </button>
                <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                  customer.source === 'shipment' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {customer.source === 'shipment' ? 'Shipper' : 'Quote Only'}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Mail size={14} className="mr-2 flex-shrink-0" />
                <span className="truncate">{customer.email}</span>
              </div>
              
              {customer.phone && (
                <div className="flex items-center text-gray-300 dark:text-gray-200">
                  <Phone size={14} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{customer.phone}</span>
                </div>
              )}
              
              {customer.city && (
                <div className="flex items-center text-gray-300 dark:text-gray-200">
                  <MapPin size={14} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{customer.city}, {customer.state || customer.country}</span>
                </div>
              )}
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar size={14} className="mr-2 flex-shrink-0" />
                <span className="truncate">First order {new Date(customer.firstOrder).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Truck size={14} className="mr-2 flex-shrink-0" />
                <span className="font-medium truncate">${customer.totalValue.toLocaleString()} total value</span>
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
          <div className="bg-gray-800 dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-600 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-100 dark:text-white">
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
                  <h3 className="text-xl font-semibold text-gray-100 dark:text-white">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{selectedCustomer.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-100 dark:text-white mb-3">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Email:</span> {selectedCustomer.email}</p>
                    <p><span className="font-medium">Phone:</span> {selectedCustomer.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-100 dark:text-white mb-3">Address Information</h4>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-600 dark:border-gray-700">
                <button 
                  onClick={closeModal}
                  className="px-4 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 text-base min-h-[48px]"
                >
                  Close
                </button>
                <button 
                  onClick={() => sendEmail(selectedCustomer)}
                  disabled={sendingEmail || !selectedCustomer.email}
                  className="px-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-base min-h-[48px] flex items-center justify-center"
                >
                  {sendingEmail ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Email'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}