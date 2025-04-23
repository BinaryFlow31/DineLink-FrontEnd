import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCreditCard, FiUser, FiCalendar, FiLock } from 'react-icons/fi';
import { useOrders } from '@/contexts/OrderContext';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const location = useLocation();
	const selectedItems: CartItem[] = location.state?.cartItems || [];
  const {addOrder} = useOrders();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Sample cart data - in a real app, this would come from state management
  const [cartItems] = useState<CartItem[]>(selectedItems);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    specialInstructions: '',
    deliveryOption: 'delivery' as 'delivery' | 'pickup' | 'dine-in',
    tableNumber: '',
  });

  // Calculate order totals
  const calculateSubtotal = (price: string, quantity: number): number => {
    const numericPrice = parseFloat(price.replace('$', ''));
    return numericPrice * quantity;
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => {
      return total + calculateSubtotal(item.price, item.quantity);
    }, 0);
  };

  const taxRate = 0.10; // 10% tax
  const taxAmount = calculateTotal() * taxRate;
  const grandTotal = calculateTotal() + taxAmount;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle card number formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g'))?.join(' ') || '';
    }
    setFormData(prev => ({ ...prev, cardNumber: value }));
  };

 // Handle form submission
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsProcessing(true);
  
  try {
    // In a real app, you would process payment here
    // For demo, we'll just simulate a payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create the order
    addOrder({
      customerName: formData.name,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      ...(formData.deliveryOption === 'dine-in' && { tableNumber: parseInt(formData.tableNumber) }),
      isTakeaway: formData.deliveryOption === 'pickup',
      address: formData.deliveryOption === 'delivery' ? formData.address : undefined,
      phone: formData.phone,
      email: formData.email,
      specialInstructions: formData.specialInstructions,
    });
    
    // Mark order as placed
    setOrderPlaced(true);
  } catch (error) {
    console.error('Payment processing failed:', error);
    // Handle payment failure (show error message, etc.)
  } finally {
    setIsProcessing(false);
  }
};

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p>Your order #ORD-{Math.floor(Math.random() * 10000)} has been confirmed.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-left">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>${calculateSubtotal(item.price, item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-semibold">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Delivery Information */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit}>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Delivery Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  rows={3}
                  placeholder="Any special delivery instructions..."
                />
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Card Number</label>
                <div className="relative">
                  <FiCreditCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full p-2 pl-10 border rounded"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name on Card</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full p-2 pl-10 border rounded"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Expiry Date</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-10 border rounded"
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full p-2 pl-10 border rounded"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 rounded-lg text-white font-medium ${isProcessing ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} <span className="text-gray-500">× {item.quantity}</span>
                  </span>
                  <span>${calculateSubtotal(item.price, item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 p-3 bg-yellow-50 rounded-lg text-sm">
              <p className="font-medium">Estimated delivery time: 30-45 minutes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;