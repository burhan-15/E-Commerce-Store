import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen, removeFromCart, updateQuantity } from "../feature/cartSlice/cartSlice";
import { Link } from "react-router";

export function CartDrawer() {
    const dispatch = useDispatch();
    const { items, isOpen } = useSelector((state) => state.cart);

    const totalPrice = items.reduce((sum, item) => sum + (item.priceCents * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Overlay */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
                onClick={() => dispatch(setCartOpen(false))}
            />

            {/* Slider Content */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 flex flex-col shadow-2xl transition-all duration-300 transform translate-x-0 h-full border-l border-gray-100 dark:border-gray-900">
                    
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-900 flex justify-between items-center">
                        <h2 className="text-lg font-bold">Shopping Cart ({items.length})</h2>
                        <button 
                            onClick={() => dispatch(setCartOpen(false))}
                            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col justify-center items-center text-center gap-2">
                                <p className="text-gray-400 dark:text-gray-600">Your cart is currently empty.</p>
                            </div>
                        ) : (
                            items.map((item) => {
                                return (
                                    <div key={item.id} className="flex gap-4 p-3 border border-gray-100 dark:border-gray-900 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                                        <div className="w-20 h-20 bg-white rounded-lg overflow-hidden border border-gray-100 dark:border-gray-900 p-2 flex-shrink-0 flex items-center justify-center">
                                            <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{item.name}</h4>
                                                <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">Rs. {item.priceCents}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-950">
                                                    <button 
                                                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                                                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="px-2 text-xs font-bold w-6 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                                        className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                {/* Remove */}
                                                <button 
                                                    onClick={() => dispatch(removeFromCart(item.id))}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Summary Footer */}
                    {items.length > 0 && (
                        <div className="px-6 py-6 border-t border-gray-100 dark:border-gray-900 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">Rs. {totalPrice}</span>
                            </div>
                            <p className="text-[10px] text-gray-400">Shipping fees and taxes will be computed at checkout.</p>
                            <Link 
                                to="/checkout"
                                onClick={() => dispatch(setCartOpen(false))}
                                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer text-sm shadow"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
