import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Check, X, ArrowRight, ShoppingCart } from "lucide-react";
import { clearLastAddedItem, setCartOpen } from "../feature/cartSlice/cartSlice";

export function CartToast() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lastAddedItem = useSelector((state) => state.cart.lastAddedItem);

    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const [isHovered, setIsHovered] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    // Auto-dismiss settings (4 seconds total duration)
    const DURATION = 4000; 
    const TICK_INTERVAL = 40; 

    useEffect(() => {
        if (lastAddedItem) {
            // Cancel any pending exit transition instantly
            setIsVisible(false);
            
            // Brief timeout to trigger the slide-in and scale animation again
            const timeout = setTimeout(() => {
                setActiveItem(lastAddedItem);
                setIsVisible(true);
                setProgress(100);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [lastAddedItem]);

    // Handle timer tick for progress and auto-dismiss
    useEffect(() => {
        if (!isVisible || !activeItem || isHovered) {
            return;
        }

        const step = (100 / (DURATION / TICK_INTERVAL));

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    handleClose();
                    return 0;
                }
                return prev - step;
            });
        }, TICK_INTERVAL);

        return () => clearInterval(interval);
    }, [isVisible, activeItem, isHovered]);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for slide-out transition (300ms) to finish before resetting state
        setTimeout(() => {
            dispatch(clearLastAddedItem());
            setActiveItem(null);
        }, 300);
    };

    const handleViewCart = () => {
        dispatch(setCartOpen(true));
        handleClose();
    };

    const handleCheckout = () => {
        navigate("/checkout");
        handleClose();
    };

    if (!activeItem) return null;

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`fixed top-24 md:top-28 right-4 md:right-8 z-50 w-[calc(100%-2rem)] sm:w-96 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border border-gray-150 dark:border-gray-800 rounded-2xl shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden flex flex-col gap-3.5 p-4 select-none ${
                isVisible
                    ? "translate-x-0 opacity-100 scale-100"
                    : "translate-x-full opacity-0 scale-95"
            }`}
        >
            {/* Top row: Success Status & Close Icon */}
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-650 dark:text-emerald-400">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200/50 dark:border-emerald-800/40">
                        <Check size={11} className="text-emerald-600 dark:text-emerald-400 font-bold" />
                    </span>
                    Product added!
                </span>
                <button
                    onClick={handleClose}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all cursor-pointer"
                    title="Dismiss"
                >
                    <X size={15} />
                </button>
            </div>

            {/* Middle row: Thumbnail & Product Details */}
            <div className="flex gap-3.5 items-center">
                <div className="relative w-16 h-16 shrink-0 bg-white border border-gray-150 dark:border-gray-800 rounded-xl p-1.5 flex items-center justify-center overflow-hidden shadow-xs">
                    <img
                        src={activeItem.image}
                        alt={activeItem.name}
                        className="max-w-full max-h-full object-contain"
                    />
                </div>
                <div className="flex flex-col justify-center min-w-0 flex-grow">
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white line-clamp-2 leading-snug">
                        {activeItem.name}
                    </h4>
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-1 tracking-wide">
                        Qty: {activeItem.quantity} • <span className="text-blue-600 dark:text-blue-400 font-extrabold">Rs. {activeItem.priceCents * activeItem.quantity}</span>
                    </span>
                </div>
            </div>

            {/* Bottom row: CTA Buttons */}
            <div className="flex gap-2.5 mt-0.5">
                <button
                    onClick={handleViewCart}
                    className="flex-1 py-2 px-3 border border-gray-200 dark:border-gray-850 text-[11px] font-bold text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-750 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                    <ShoppingCart size={12} className="opacity-80" />
                    View Cart
                </button>
                <button
                    onClick={handleCheckout}
                    className="flex-1 py-2 px-3 bg-blue-650 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-[11px] font-bold text-white rounded-xl transition-all shadow-xs shadow-blue-500/10 hover:shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                    Checkout
                    <ArrowRight size={12} className="opacity-90" />
                </button>
            </div>

            {/* Progress bar timer */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-900/50">
                <div
                    className="h-full bg-emerald-500 dark:bg-emerald-450 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
