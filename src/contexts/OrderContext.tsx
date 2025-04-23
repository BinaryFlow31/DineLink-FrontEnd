// contexts/OrderContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  specialInstructions?: string;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'prepared' | 'served';
  createdAt: string;
  address?: string;
  phone: string;
  email: string;
  specialInstructions?: string;
  tableNumber?: number;
  isTakeaway?: boolean;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (newOrder: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
  updateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Load orders from localStorage on initial render
  useEffect(() => {
    const savedOrders = localStorage.getItem('restaurantOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('restaurantOrders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const order: Order = {
      ...newOrder,
      id: `ORD-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};