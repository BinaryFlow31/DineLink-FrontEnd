import HeaderAdmin from '@/components/HeaderAdmin';
import { useOrders } from '@/contexts/OrderContext';
import React, { useState, useEffect } from 'react';
import { FiClock, FiCheckCircle} from 'react-icons/fi';


const ChefDashboard: React.FC = () => {
  // const [orders, setOrders] = useState<Order[]>([]);
  const { orders, updateOrderStatus } = useOrders();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'preparing'>('pending');

  // Simulate initial loading - in real app, this would be handled by your backend
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [])


  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => 
    activeTab === 'pending' 
      ? order.status === 'pending' 
      : order.status === 'preparing' || order.status === 'prepared'
  );

  // Calculate time since order was placed
  const getTimeSince = (dateString: string) => {
    const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000);
    return `${diff} min ago`;
  };

  // Handle status updates
  const handleStatusUpdate = (orderId: string, newStatus: 'preparing' | 'prepared' | 'served') => {
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <>
    <HeaderAdmin />
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Chef Dashboard</h1>
      
      {/* Status Tabs */}
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('pending')}
        >
          New Orders
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'preparing' ? 'text-red-500 border-b-2 border-red-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('preparing')}
        >
          In Progress
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiCheckCircle className="mx-auto text-4xl text-green-500 mb-3" />
          <h3 className="text-lg font-medium">No {activeTab === 'pending' ? 'new' : 'in progress'} orders</h3>
          <p className="text-gray-600">All caught up!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map(order => (
            <div 
              key={order.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
                order.status === 'pending' ? 'border-red-500' : 
                order.status === 'preparing' ? 'border-yellow-500' : 
                'border-green-500'
              }`}
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">Order #{order.id}</h3>
                    <p className="text-gray-600">
                      {order.tableNumber ? `Table ${order.tableNumber}` : 'Takeaway'} • {order.customerName}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center">
                    <FiClock className="mr-1" /> {getTimeSince(order.createdAt)}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-medium mb-2">Items:</h4>
                <ul className="space-y-2 mb-4">
                  {order.items.map(item => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.quantity} × {item.name}
                        {item.specialInstructions && (
                          <span className="block text-xs text-gray-500 mt-1">
                            Note: {item.specialInstructions}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between items-center pt-3 border-t">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'pending' ? 'bg-red-100 text-red-800' : 
                    order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>

                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'preparing')}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'prepared')}
                        className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 transition"
                      >
                        Mark Prepared
                      </button>
                    )}
                    {order.status === 'prepared' && (
                      <button
                        onClick={() => handleStatusUpdate(order.id, 'served')}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                      >
                        Mark Served
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kitchen Status Legend */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-3">Kitchen Status Legend:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span>Pending - Waiting to be prepared</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span>Preparing - Currently being cooked</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span>Prepared - Ready to be served</span>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default ChefDashboard;