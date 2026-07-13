import { Link } from "react-router"

export function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300 pt-16 pb-8 border-t border-gray-900 w-full">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Brand Section */}
                <div className="flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white tracking-wider">E-Commerce Store</span>
                    </Link>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Discover curated premium collections of beauty, personal care, and lifestyle products tailored to elevate your everyday routines.
                    </p>
                </div>

                {/* Shop Links */}
                <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Shop</h4>
                    <ul className="flex flex-col gap-2 text-sm">
                        <li><Link to="/products" className="hover:text-white transition-colors">All Products</Link></li>
                        <li><Link to="/collection/Beauty%20%26%20Personal%20Care" className="hover:text-white transition-colors">Beauty & Care</Link></li>
                        <li><Link to="/collection/Skincare" className="hover:text-white transition-colors">Skincare</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
                    <ul className="flex flex-col gap-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Antigravity Store. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-300 transition-colors">Cookie Settings</a>
                </div>
            </div>
        </footer>
    );
}
