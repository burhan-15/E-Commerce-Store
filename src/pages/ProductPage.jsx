import { useParams, Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Star, ShoppingCart, ArrowLeft, Shield, Truck, RotateCcw,Plus,Minus } from "lucide-react";
import { addToCart } from "../feature/cartSlice/cartSlice";
import { useState } from "react";

export default function ProductPage() {
    const [quantity , setQuantity] = useState(1)
    const { productId } = useParams();
    const dispatch = useDispatch();

    const allProducts = useSelector((state) => state.products.items) || [];

    if (allProducts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center gap-4 w-full">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 dark:border-gray-800 dark:border-t-blue-500"></div>
                <p className="text-gray-505 dark:text-gray-400 text-sm font-semibold animate-pulse">Loading product details...</p>
            </div>
        );
    }

    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4 w-full">
                <p className="text-gray-500 dark:text-gray-400 text-lg">Product not found.</p>
                <Link to="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl px-4 flex flex-col gap-6 text-gray-800 dark:text-gray-100">
            {/* Breadcrumb Navigation */}
            <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 font-medium self-start transition-colors">
                <ArrowLeft size={16} /> Back to Products
            </Link>

            {/* Product Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white dark:bg-gray-950 p-6 md:p-10 rounded-3xl border border-gray-100 dark:border-gray-900 shadow-sm">

                {/* Image Section */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-50 dark:border-gray-900/50 flex items-center justify-center h-80 sm:h-96 md:min-h-[400px] max-h-[500px]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain hover:scale-102 transition-transform duration-300"
                    />
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4">
                        {/* Tags */}
                        <div className="flex gap-2">
                            <span className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                                {product.category || "General"}
                            </span>
                            {product.subCategory && (
                                <span className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full">
                                    {product.subCategory}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-lg text-amber-700 dark:text-amber-400 text-sm font-bold">
                                <Star fill="#d97706" strokeWidth={0} size={15} />
                                <span>{product.rating.stars}</span>
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">({product.rating.count} buyer reviews)</span>
                        </div>

                        {/* Divider */}
                        <hr className="border-gray-100 dark:border-gray-900" />

                        {/* Price */}
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-400">Price</span>
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                Rs. {product.priceCents}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-semibold text-gray-400">Description</span>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                {product.description || "No description available for this product."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex w-fit items-center p-1 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-950">
                            <button 
                                onClick={() => setQuantity(quantity > 1  ? quantity - 1 : quantity)}
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                                >
                                <Minus size={12} />
                            </button>
                            <span className="px-2 text-xs font-bold w-6 text-center">{quantity}</span>
                            <button 
                                onClick={() => setQuantity(quantity+1)}
                                className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                            >
                                <Plus size={12} />
                            </button>
                        </div>
                        {/* Add to Cart Call to Action */}
                        <button
                            onClick={() => dispatch(addToCart({ ...product, quantity: quantity }))}
                            className="w-full md:w-auto bg-gray-900 dark:bg-blue-600 hover:bg-blue-750 dark:hover:bg-blue-750 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow hover:shadow-lg self-start"
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-900 text-center">
                            <div className="flex flex-col items-center gap-1.5">
                                <Truck size={20} className="text-blue-500" />
                                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <RotateCcw size={20} className="text-blue-500" />
                                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">30-Day Return</span>
                            </div>
                            <div className="flex flex-col items-center gap-1.5">
                                <Shield size={20} className="text-blue-500" />
                                <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Secure Warranty</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
