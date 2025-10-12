import { useEffect, useState } from 'react';
import { Mail, Send, Users, FileText, User, CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface Customer {
  email: string;
  name: string;
  joinedAt: string;
}

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  message: string;
}

interface Campaign {
  id: string;
  subject: string;
  recipients: number;
  sent: number;
  failed: number;
  sentAt: string;
  status: 'sent' | 'sending' | 'failed';
}

export default function AdminMail() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  // Form state
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendToAll, setSendToAll] = useState(true);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch customers and templates in parallel
      const [customersRes, templatesRes] = await Promise.all([
        fetch(`${url}/mail/customers`, {
          headers: { 'x-auth-token': token || '' }
        }),
        fetch(`${url}/mail/templates`, {
          headers: { 'x-auth-token': token || '' }
        })
      ]);

      if (customersRes.ok) {
        const customersData = await customersRes.json();
        console.log('Customers data received:', customersData);
        setCustomers(Array.isArray(customersData.customers) ? customersData.customers : []);
      }

      if (templatesRes.ok) {
        const templatesData = await templatesRes.json();
        setTemplates(templatesData);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setMessage(template.message);
  };

  const handleCustomerToggle = (email: string) => {
    setSelectedCustomers(prev => 
      prev.includes(email) 
        ? prev.filter(e => e !== email)
        : [...prev, email]
    );
  };

  const handleSendEmail = async () => {
    if (!subject || !message) {
      alert('Please fill in subject and message');
      return;
    }

    if (!sendToAll && selectedCustomers.length === 0) {
      alert('Please select at least one customer or choose "Send to All"');
      return;
    }

    try {
      setSending(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${url}/mail/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token || ''
        },
        body: JSON.stringify({
          subject,
          message,
          sendToAll,
          recipients: sendToAll ? [] : selectedCustomers
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Email campaign sent successfully to ${result.totalSent} recipients!`);
        
        // Add to campaigns list (mock)
        const newCampaign: Campaign = {
          id: Date.now().toString(),
          subject,
          recipients: result.totalSent,
          sent: result.totalSent,
          failed: 0,
          sentAt: new Date().toISOString(),
          status: 'sent'
        };
        setCampaigns(prev => [newCampaign, ...prev]);
        
        // Reset form
        setSubject('');
        setMessage('');
        setSelectedCustomers([]);
        setSelectedTemplate(null);
      } else {
        const error = await response.json();
        alert(`Failed to send email: ${error.message}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email campaign');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
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
          Email Campaigns
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Send marketing emails and updates to your freight customers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-200 truncate">Email Templates</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-100 dark:text-white">{templates.length}</p>
            </div>
            <FileText className="text-green-600 flex-shrink-0" size={20} />
          </div>
        </div>

        <div className="bg-gray-700 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-200 truncate">Campaigns Sent</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-100 dark:text-white">{campaigns.length}</p>
            </div>
            <Send className="text-purple-600 flex-shrink-0" size={20} />
          </div>
        </div>

        <div className="bg-gray-700 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-600 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-gray-300 dark:text-gray-200 truncate">Total Emails Sent</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-100 dark:text-white">
                {campaigns.reduce((sum, c) => sum + c.sent, 0)}
              </p>
            </div>
            <Mail className="text-orange-600 flex-shrink-0" size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Email Composer */}
        <div className="lg:col-span-2 bg-gray-800 dark:bg-gray-900 rounded-lg border border-gray-600 dark:border-gray-700 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-100 dark:text-white mb-4 flex items-center">
            <FileText className="mr-2" size={20} />
            Compose Email Campaign
          </h2>

          <div className="space-y-4">
            {/* Template Selection */}
            {templates.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-300 dark:text-gray-200 mb-2">
                  Email Templates
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`p-3 text-left border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedTemplate?.id === template.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900 dark:text-white">{template.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{template.subject}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-200 mb-2">
                Subject Line
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-3 text-base border border-gray-600 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 dark:bg-gray-800 text-gray-100 dark:text-white"
                placeholder="Enter email subject..."
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-200 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="w-full px-3 py-3 text-base border border-gray-600 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 dark:bg-gray-800 text-gray-100 dark:text-white"
                placeholder="Enter your email message... Use {{name}} to personalize with customer names."
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Tip: Use {'{'}name{'}'} in your message to automatically insert customer names
              </p>
            </div>

            {/* Recipients */}
            <div>
              <label className="block text-sm font-medium text-gray-300 dark:text-gray-200 mb-2">
                Recipients
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={sendToAll}
                    onChange={() => setSendToAll(true)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300 dark:text-gray-200">
                    Send to all customers ({customers.length} recipients)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!sendToAll}
                    onChange={() => setSendToAll(false)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-300 dark:text-gray-200">
                    Send to selected customers ({selectedCustomers.length} selected)
                  </span>
                </label>
              </div>
            </div>

            {/* Send Button */}
            <div className="pt-4">
              <button
                onClick={handleSendEmail}
                disabled={sending || !subject || !message}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-base min-h-[48px]"
              >
                {sending ? (
                  <>
                    <Clock className="animate-spin mr-2" size={20} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2" size={20} />
                    Send Campaign
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-gray-800 dark:bg-gray-900 rounded-lg border border-gray-600 dark:border-gray-700 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-100 dark:text-white mb-4 flex items-center">
            <Users className="mr-2" size={20} />
            Customer List
          </h2>

          {!sendToAll && (
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Select customers to send emails to:
            </div>
          )}

          <div className="space-y-2 max-h-64 sm:max-h-96 overflow-y-auto">
            {customers.filter(customer => customer && customer.email).map((customer) => (
              <div
                key={customer.email}
                className={`p-3 border rounded-lg ${
                  sendToAll
                    ? 'border-gray-200 dark:border-gray-600'
                    : selectedCustomers.includes(customer.email)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                }`}
                onClick={() => !sendToAll && handleCustomerToggle(customer.email)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0 flex-1">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <User className="text-blue-600 dark:text-blue-400" size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {customer.name || 'Unknown Customer'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {customer.email || 'No email'}
                      </div>
                    </div>
                  </div>
                  {!sendToAll && selectedCustomers.includes(customer.email) && (
                    <CheckCircle className="text-blue-600 flex-shrink-0" size={16} />
                  )}
                </div>
              </div>
            ))}

            {customers.length === 0 && (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No customers found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Customers will appear here when they place orders or request quotes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      {campaigns.length > 0 && (
        <div className="mt-6 bg-gray-800 dark:bg-gray-900 rounded-lg border border-gray-600 dark:border-gray-700 p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-100 dark:text-white mb-4 flex items-center">
            <Mail className="mr-2" size={20} />
            Recent Campaigns
          </h2>

          {/* Mobile Campaign Cards */}
          <div className="block md:hidden space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-600 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{campaign.subject}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    campaign.status === 'sent' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : campaign.status === 'sending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {campaign.status === 'sent' && <CheckCircle size={12} className="mr-1" />}
                    {campaign.status === 'sending' && <Clock size={12} className="mr-1" />}
                    {campaign.status === 'failed' && <AlertCircle size={12} className="mr-1" />}
                    {campaign.status.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Recipients</p>
                    <p className="text-gray-900 dark:text-white">
                      {campaign.sent}/{campaign.recipients}
                      {campaign.failed > 0 && (
                        <span className="text-red-600"> ({campaign.failed} failed)</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Sent Date</p>
                    <p className="text-gray-900 dark:text-white">{new Date(campaign.sentAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700 dark:bg-gray-950">
                <tr>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Sent Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 dark:bg-gray-900 divide-y divide-gray-600 dark:divide-gray-700">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white text-sm">{campaign.subject}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {campaign.sent}/{campaign.recipients}
                      {campaign.failed > 0 && (
                        <span className="text-red-600"> ({campaign.failed} failed)</span>
                      )}
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        campaign.status === 'sent' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : campaign.status === 'sending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {campaign.status === 'sent' && <CheckCircle size={12} className="mr-1" />}
                        {campaign.status === 'sending' && <Clock size={12} className="mr-1" />}
                        {campaign.status === 'failed' && <AlertCircle size={12} className="mr-1" />}
                        {campaign.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(campaign.sentAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}