import logo from "/logo.png";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDown, Sun, Moon, ShoppingBag, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { toggleCart } from "../feature/cartSlice/cartSlice";
import { useState } from "react";

export function Navbar() {
    const categories = useSelector((state) => state.categories.items) || [];
    const cartItems = useSelector((state) => state.cart.items) || [];
    const cartCount = cartItems.length;
    const { theme, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);

    return (
        <div className="h-20 md:h-26 flex justify-between items-center shadow-sm sticky top-[env(safe-area-inset-top)] bg-white dark:bg-black dark:text-white border-b border-gray-100 dark:border-gray-900 px-6 md:px-16 z-40 transition-colors duration-300">

            {/* Left Section: Mobile Menu Trigger + Logo */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                    title="Open Menu"
                >
                    <Menu size={20} />
                </button>
                <Link to="/" className="h-14 md:h-12 flex items-center">
                    <img src={logo} className="h-full object-contain dark:invert" alt="Logo" />
                </Link>
            </div>

            {/* Middle Section: Desktop Nav Links */}
            <div className="hidden md:flex gap-8 items-center text-sm font-semibold">
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>

                {/* Collections Dropdown */}
                <div className="relative group cursor-pointer py-2">
                    <span className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Collections <ChevronDown size={14} />
                    </span>
                    <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="py-1">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    to={`/collection/${encodeURIComponent(category)}`}
                                    className="block px-4 py-2.5 text-sm text-gray-705 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <Link to="/products" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">All Products</Link>
            </div>

            {/* Right Section: Action Buttons */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle Button */}
                <button
                    onClick={toggleTheme}
                    className="p-2 md:p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === "light" ? (
                        <Moon size={20} className="transition-transform duration-300 hover:rotate-12" />
                    ) : (
                        <Sun size={20} className="transition-transform duration-300 hover:rotate-45" />
                    )}
                </button>

                {/* Cart Button */}
                <button
                    onClick={() => dispatch(toggleCart())}
                    className="relative p-2 md:p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
                    title="View Cart"
                >
                    <ShoppingBag size={20} />
                    {cartCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-950">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Mobile Slide-out Menu Drawer */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Panel */}
                    <div className="absolute inset-y-0 left-0 w-72 bg-white dark:bg-gray-955 text-gray-800 dark:text-gray-100 flex flex-col shadow-2xl transition-all duration-300 border-r border-gray-100 dark:border-gray-900 p-5 gap-6">
                        <div className="flex justify-between items-center">
                            <img src={logo} className="h-12 object-contain dark:invert" alt="Logo" />
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-4 mt-2">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                            >
                                Home
                            </Link>

                            <Link
                                to="/products"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5"
                            >
                                All Products
                            </Link>

                            <hr className="border-gray-100 dark:border-gray-900 my-1" />

                            {/* Mobile Collapsible Collections Dropdown */}
                            <div className="flex flex-col gap-1.5">
                                <button
                                    onClick={() => setIsMobileCollectionsOpen(!isMobileCollectionsOpen)}
                                    className="flex justify-between items-center text-sm font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1.5 w-full text-left cursor-pointer"
                                >
                                    <span>Collections</span>
                                    <ChevronDown size={16} className={`transform transition-transform ${isMobileCollectionsOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isMobileCollectionsOpen && (
                                    <div className="flex flex-col gap-2.5 pl-3 border-l border-gray-100 dark:border-gray-900 mt-1">
                                        {categories.map((category) => (
                                            <Link
                                                key={category}
                                                to={`/collection/${encodeURIComponent(category)}`}
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    setIsMobileCollectionsOpen(false);
                                                }}
                                                className="text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1"
                                            >
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            )}

        </div>
    );
}