import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiPlus, FiMinus, FiChevronLeft } from "react-icons/fi";

interface CartItem {
	id: string;
	name: string;
	price: string;
	quantity: number;
}

const CartPage: React.FC = () => {
	const navigate = useNavigate();

	const location = useLocation();
	const selectedItems: CartItem[] = location.state?.selectedItems || [];

	// Sample cart data - in a real app, this would come from state management
	const [cartItems, setCartItems] = React.useState<CartItem[]>(selectedItems);

	// Calculate subtotals and total
	const calculateSubtotal = (price: string, quantity: number): number => {
		const numericPrice = parseFloat(price.replace("$", ""));
		return numericPrice * quantity;
	};

	const calculateTotal = (): number => {
		return cartItems.reduce((total, item) => {
			return total + calculateSubtotal(item.price, item.quantity);
		}, 0);
	};

	const taxRate = 0.1; // 10% tax
	const taxAmount = calculateTotal() * taxRate;
	const grandTotal = calculateTotal() + taxAmount;

	// Quantity handlers
	const increaseQuantity = (id: string) => {
		setCartItems(
			cartItems.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item
			)
		);
	};

	const decreaseQuantity = (id: string) => {
		setCartItems(
			cartItems.map((item) =>
				item.id === id
					? { ...item, quantity: Math.max(1, item.quantity - 1) }
					: item
			)
		);
	};

	// const removeItem = (id: string) => {
	// 	setCartItems(cartItems.filter((item) => item.id !== id));
	// };

	return (
		<div className='max-w-4xl mx-auto p-4 md:p-6'>
			{/* Header */}
			<div className='flex items-center mb-6'>
				<button
					onClick={() => navigate(-1)}
					className='mr-4 p-2 rounded-full hover:bg-gray-100'
				>
					<FiChevronLeft className='text-xl' />
				</button>
				<h1 className='text-2xl font-bold'>Your Cart</h1>
				<div className='ml-auto bg-red-500 text-white px-3 py-1 rounded-full'>
					{cartItems.reduce(
						(total, item) => total + item.quantity,
						0
					)}{" "}
					items
				</div>
			</div>

			{cartItems.length === 0 ? (
				<div className='text-center py-12'>
					<h2 className='text-xl font-medium mb-2'>
						Your cart is empty
					</h2>
					<p className='text-gray-600 mb-6'>
						Browse our menu and add some delicious items
					</p>
					<button
						onClick={() => navigate("/table/4")}
						className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition'
					>
						View Menu
					</button>
				</div>
			) : (
				<>
					{/* Cart Items */}
					<div className='space-y-4 mb-8'>
						{cartItems.map((item) => (
							<div
								key={item.id}
								className='flex items-start border-b pb-4'
							>
								<div className='flex-1'>
									<h3 className='font-medium'>{item.name}</h3>
									<p className='text-gray-700'>
										{item.price}
									</p>

									<div className='flex items-center justify-center mt-2'>
										<button
											onClick={() =>
												decreaseQuantity(item.id)
											}
											className='p-1 text-gray-700 hover:text-red-500'
											disabled={item.quantity <= 1}
										>
											<FiMinus />
										</button>
										<span className='mx-2 w-8 text-center'>
											{item.quantity}
										</span>
										<button
											onClick={() =>
												increaseQuantity(item.id)
											}
											className='p-1 text-gray-700 hover:text-green-500'
										>
											<FiPlus />
										</button>

										{/* <button
											onClick={() => removeItem(item.id)}
											className='ml-auto p-1 text-gray-400 hover:text-red-500'
										>
											<FiTrash2 />
										</button> */}
									</div>
								</div>
								<div className='ml-4 font-medium'>
									$
									{calculateSubtotal(
										item.price,
										item.quantity
									).toFixed(2)}
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className='bg-gray-50 p-6 rounded-lg'>
						<h2 className='text-xl font-bold mb-4'>
							Order Summary
						</h2>

						<div className='space-y-3 mb-6'>
							<div className='flex justify-between'>
								<span>Subtotal:</span>
								<span>${calculateTotal().toFixed(2)}</span>
							</div>
							<div className='flex justify-between'>
								<span>Tax (10%):</span>
								<span>${taxAmount.toFixed(2)}</span>
							</div>
							<div className='flex justify-between font-bold text-lg pt-2 border-t'>
								<span>Total:</span>
								<span>${grandTotal.toFixed(2)}</span>
							</div>
						</div>

						<Link to="/checkout" state={{cartItems}}>
							<button className='w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition'>
								Proceed to Checkout
							</button>
						</Link>
					</div>
				</>
			)}
		</div>
	);
};

export default CartPage;
