import { useEffect, useState } from 'react';
import { FileText, MapPin, Package, Calendar, Search, Filter, DollarSign, Clock, Check, X, Eye, Send } from 'lucide-react';

interface Quote {
  _id: string;
  quoteNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  origin: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  destination: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
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
  serviceType: string;
  urgency: string;
  preferredDeliveryDate?: string;
  status: string;
  quotedPrice: number;
  estimatedDelivery?: string;
  specialInstructions?: string;
  adminNotes?: string;
  quotedBy?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  quotedAt?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState({
    quotedPrice: '',
    estimatedDelivery: '',
    adminNotes: ''
  });
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/quotes`, {
        headers: {
          'x-auth-token': token || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setQuotes(data.quotes || data);
      } else {
        console.error('Failed to fetch quotes');
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'quoted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'asap':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'urgent':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'standard':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const openQuoteModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowModal(true);
  };

  const openResponseModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setQuoteResponse({
      quotedPrice: quote.quotedPrice ? quote.quotedPrice.toString() : '',
      estimatedDelivery: quote.estimatedDelivery || '',
      adminNotes: quote.adminNotes || ''
    });
    setShowResponseModal(true);
  };

  const closeModal = () => {
    setSelectedQuote(null);
    setShowModal(false);
  };

  const closeResponseModal = () => {
    setSelectedQuote(null);
    setShowResponseModal(false);
    setQuoteResponse({ quotedPrice: '', estimatedDelivery: '', adminNotes: '' });
  };

  const handleSubmitQuote = async () => {
    if (!selectedQuote) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${url}/quotes/${selectedQuote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token || ''
        },
        body: JSON.stringify({
          quotedPrice: parseFloat(quoteResponse.quotedPrice),
          estimatedDelivery: quoteResponse.estimatedDelivery,
          adminNotes: quoteResponse.adminNotes,
          status: 'quoted'
        })
      });

      if (response.ok) {
        await fetchQuotes();
        closeResponseModal();
      } else {
        alert('Failed to submit quote');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('Error submitting quote');
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Quote Management
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Review and respond to freight quote requests
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by quote number, customer name, or email..."
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
            <option value="quoted">Quoted</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Quotes</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{quotes.length}</p>
            </div>
            <FileText className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {quotes.filter(q => q.status === 'pending').length}
              </p>
            </div>
            <Clock className="text-yellow-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Accepted</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {quotes.filter(q => q.status === 'accepted').length}
              </p>
            </div>
            <Check className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${quotes.filter(q => q.status === 'accepted').reduce((sum, q) => sum + (q.quotedPrice || 0), 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Quote Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
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
              {filteredQuotes.map((quote) => (
                <tr key={quote._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {quote.quoteNumber}
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(quote.urgency)}`}>
                      {quote.urgency.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {quote.customer.name}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {quote.customer.email}
                      </div>
                      {quote.customer.company && (
                        <div className="text-gray-500 dark:text-gray-400 text-xs">
                          {quote.customer.company}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="flex items-center text-gray-900 dark:text-white">
                        <MapPin size={14} className="mr-1" />
                        {quote.origin.city}, {quote.origin.state}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        to {quote.destination.city}, {quote.destination.state}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-900 dark:text-white capitalize">{quote.serviceType}</div>
                      <div className="text-gray-500 dark:text-gray-400 flex items-center">
                        <Package size={14} className="mr-1" />
                        {quote.package.weight} lbs
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                      {quote.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {quote.quotedPrice ? `$${quote.quotedPrice.toLocaleString()}` : 'Not quoted'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openQuoteModal(quote)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye size={16} />
                      </button>
                      {quote.status === 'pending' && (
                        <button
                          onClick={() => openResponseModal(quote)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                        >
                          <Send size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No quotes found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.'
                : 'Quote requests will appear here when customers submit them.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Quote Detail Modal */}
      {showModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Quote Details - {selectedQuote.quoteNumber}
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
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Name:</span> {selectedQuote.customer.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedQuote.customer.email}</p>
                  </div>
                  <div>
                    {selectedQuote.customer.phone && <p><span className="font-medium">Phone:</span> {selectedQuote.customer.phone}</p>}
                    {selectedQuote.customer.company && <p><span className="font-medium">Company:</span> {selectedQuote.customer.company}</p>}
                  </div>
                </div>
              </div>

              {/* Route Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Origin</h3>
                  <div className="space-y-2 text-sm">
                    <p>{selectedQuote.origin.address}</p>
                    <p>{selectedQuote.origin.city}, {selectedQuote.origin.state} {selectedQuote.origin.zipCode}</p>
                    <p>{selectedQuote.origin.country}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Destination</h3>
                  <div className="space-y-2 text-sm">
                    <p>{selectedQuote.destination.address}</p>
                    <p>{selectedQuote.destination.city}, {selectedQuote.destination.state} {selectedQuote.destination.zipCode}</p>
                    <p>{selectedQuote.destination.country}</p>
                  </div>
                </div>
              </div>

              {/* Package Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Package Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Weight:</span> {selectedQuote.package.weight} lbs</p>
                    <p><span className="font-medium">Dimensions:</span> {selectedQuote.package.dimensions.length}" × {selectedQuote.package.dimensions.width}" × {selectedQuote.package.dimensions.height}"</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Declared Value:</span> ${selectedQuote.package.declaredValue}</p>
                    <p><span className="font-medium">Description:</span> {selectedQuote.package.description}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Service:</span> {selectedQuote.serviceType}</p>
                    <p><span className="font-medium">Urgency:</span> {selectedQuote.urgency}</p>
                    <p><span className="font-medium">Fragile:</span> {selectedQuote.package.fragile ? 'Yes' : 'No'}</p>
                    <p><span className="font-medium">Hazardous:</span> {selectedQuote.package.hazardous ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              {/* Quote Response */}
              {selectedQuote.status !== 'pending' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quote Response</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><span className="font-medium">Quoted Price:</span> ${selectedQuote.quotedPrice?.toLocaleString()}</p>
                        <p><span className="font-medium">Estimated Delivery:</span> {selectedQuote.estimatedDelivery ? new Date(selectedQuote.estimatedDelivery).toLocaleDateString() : 'Not provided'}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Quoted By:</span> {selectedQuote.quotedBy ? `${selectedQuote.quotedBy.firstName} ${selectedQuote.quotedBy.lastName}` : 'System'}</p>
                        <p><span className="font-medium">Quoted At:</span> {selectedQuote.quotedAt ? new Date(selectedQuote.quotedAt).toLocaleString() : 'N/A'}</p>
                      </div>
                    </div>
                    {selectedQuote.adminNotes && (
                      <div className="mt-3">
                        <p><span className="font-medium">Admin Notes:</span></p>
                        <p className="mt-1 text-gray-700 dark:text-gray-300">{selectedQuote.adminNotes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              {selectedQuote.specialInstructions && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Special Instructions</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    {selectedQuote.specialInstructions}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quote Response Modal */}
      {showResponseModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Respond to Quote
                </h2>
                <button
                  onClick={closeResponseModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Quoted Price ($)
                  </label>
                  <input
                    type="number"
                    value={quoteResponse.quotedPrice}
                    onChange={(e) => setQuoteResponse({...quoteResponse, quotedPrice: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter price"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Delivery Date
                  </label>
                  <input
                    type="date"
                    value={quoteResponse.estimatedDelivery}
                    onChange={(e) => setQuoteResponse({...quoteResponse, estimatedDelivery: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Admin Notes (Optional)
                  </label>
                  <textarea
                    value={quoteResponse.adminNotes}
                    onChange={(e) => setQuoteResponse({...quoteResponse, adminNotes: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Additional notes or terms..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    onClick={closeResponseModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitQuote}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={!quoteResponse.quotedPrice}
                  >
                    Submit Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}