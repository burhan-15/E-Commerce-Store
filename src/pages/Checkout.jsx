import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { clearCart } from "../feature/cartSlice/cartSlice";
import { ArrowLeft, CheckCircle, CreditCard, DollarSign } from "lucide-react";

export default function Checkout() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        payment: "cod"
    });
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    const totalCents = cartItems.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);
    const shippingCents = totalCents > 0 ? 200 : 0; // Flat shipping rate
    const taxCents = Math.round(totalCents * 0.05); // 5% tax
    const grandTotal = totalCents + shippingCents + taxCents;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsOrderPlaced(true);
        dispatch(clearCart());
    };

    if (isOrderPlaced) {
        return (
            <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-3xl p-8 text-center flex flex-col items-center gap-6 shadow-lg text-gray-800 dark:text-gray-100">
                <CheckCircle size={64} className="text-emerald-500 animate-bounce" />
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white">Order Placed Successfully!</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Thank you for your purchase, <span className="font-semibold text-gray-850 dark:text-gray-200">{formData.name}</span>. A confirmation email has been sent to <span className="font-semibold text-gray-850 dark:text-gray-200">{formData.email}</span>.
                </p>
                <div className="w-full bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-gray-100 dark:border-gray-900 text-left text-xs space-y-2">
                    <p><span className="text-gray-400">Deliver to:</span> {formData.address}, {formData.city}</p>
                    <p><span className="text-gray-400">Payment Mode:</span> {formData.payment === "card" ? "Credit Card" : "Cash on Delivery"}</p>
                    <p className="font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-gray-900">Total Paid: Rs. {grandTotal}</p>
                </div>
                <Link to="/" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer text-sm shadow">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4 text-gray-800 dark:text-gray-100">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Your cart is empty. Add products to check out.</p>
                <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl px-4 flex flex-col gap-6 text-gray-800 dark:text-gray-100">
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 font-medium self-start transition-colors">
                <ArrowLeft size={16} /> Back to Shop
            </Link>

            <h1 className="text-3xl font-extrabold text-gray-955 dark:text-white">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Shipping Form - 7 Cols */}
                <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white dark:bg-gray-955 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-900 shadow-sm flex flex-col gap-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-450 dark:text-gray-400">Full Name</label>
                            <input 
                                required 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange}
                                className="bg-gray-50 dark:bg-gray-900 text-sm px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" 
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-450 dark:text-gray-400">Email Address</label>
                            <input 
                                required 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleInputChange}
                                className="bg-gray-50 dark:bg-gray-900 text-sm px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-gray-450 dark:text-gray-400">Street Address</label>
                        <input 
                            required 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange}
                            className="bg-gray-50 dark:bg-gray-900 text-sm px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-450 dark:text-gray-400">City</label>
                            <input 
                                required 
                                type="text" 
                                name="city" 
                                value={formData.city} 
                                onChange={handleInputChange}
                                className="bg-gray-50 dark:bg-gray-900 text-sm px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" 
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-450 dark:text-gray-400">Postal / ZIP Code</label>
                            <input 
                                required 
                                type="text" 
                                name="zip" 
                                value={formData.zip} 
                                onChange={handleInputChange}
                                className="bg-gray-50 dark:bg-gray-900 text-sm px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white" 
                            />
                        </div>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="flex flex-col gap-3 pt-2">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">Payment Method</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.payment === "cod" ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/10 text-blue-600 dark:text-blue-400" : "border-gray-100 dark:border-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/50"}`}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="cod" 
                                    checked={formData.payment === "cod"}
                                    onChange={handleInputChange}
                                    className="hidden" 
                                />
                                <DollarSign size={20} />
                                <div className="text-left">
                                    <p className="text-xs font-bold">Cash on Delivery</p>
                                    <p className="text-[10px] opacity-75">Pay in cash when delivered</p>
                                </div>
                            </label>
                            <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.payment === "card" ? "border-blue-500 bg-blue-50/20 dark:bg-blue-950/10 text-blue-600 dark:text-blue-400" : "border-gray-100 dark:border-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/50"}`}>
                                <input 
                                    type="radio" 
                                    name="payment" 
                                    value="card" 
                                    checked={formData.payment === "card"}
                                    onChange={handleInputChange}
                                    className="hidden" 
                                />
                                <CreditCard size={20} />
                                <div className="text-left">
                                    <p className="text-xs font-bold">Credit Card</p>
                                    <p className="text-[10px] opacity-75">Pay securely with card</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-2xl transition-colors cursor-pointer text-sm shadow-md hover:shadow-lg mt-4"
                    >
                        Place Order (Rs. {grandTotal})
                    </button>
                </form>

                {/* Summary Panel - 5 Cols */}
                <div className="lg:col-span-5 bg-white dark:bg-gray-955 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-900 shadow-sm flex flex-col gap-6 h-fit">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h2>
                    
                    {/* Item list */}
                    <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-3 justify-between items-center text-xs">
                                <div className="flex gap-3 items-center">
                                    <div className="w-10 h-10 bg-gray-50 rounded p-1 border border-gray-100 dark:border-gray-900 flex-shrink-0 flex items-center justify-center">
                                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                                    </div>
                                    <div>
                                        <p className="font-semibold line-clamp-1 text-gray-800 dark:text-gray-200">{item.name}</p>
                                        <p className="text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-gray-900 dark:text-white">Rs. {item.priceCents * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <hr className="border-gray-100 dark:border-gray-900" />

                    {/* Cost Breakdown */}
                    <div className="flex flex-col gap-2.5 text-xs">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Rs. {totalCents}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Rs. {shippingCents}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Est. Tax (5%)</span>
                            <span className="font-semibold text-gray-900 dark:text-white">Rs. {taxCents}</span>
                        </div>
                        <hr className="border-gray-100 dark:border-gray-900 my-1" />
                        <div className="flex justify-between text-sm font-bold">
                            <span>Total</span>
                            <span className="text-base text-gray-955 dark:text-white">Rs. {grandTotal}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
