import { Star, ShoppingCart } from "lucide-react"
import { useDispatch } from "react-redux"
import { addToCart } from "../feature/cartSlice/cartSlice"
import { Link } from "react-router"

export function ProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <div className="group flex flex-col bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full">
            {/* Clickable Card Link Area */}
            <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
                {/* Image Wrapper */}
                <div className="relative bg-white border-b border-gray-100 dark:border-gray-900 pt-[100%] overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                    {product.rating.stars >= 4.8 && (
                        <span className="absolute top-2.5 left-2.5 bg-blue-600 text-white text-[9px] sm:text-[10px] font-bold uppercase px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md tracking-wider">
                            Popular
                        </span>
                    )}
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between gap-2.5 sm:gap-3">
                    <div className="flex flex-col gap-1 sm:gap-1.5">
                        {/* Category Label */}
                        <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                            {product.category || "General"}
                        </span>
                        {/* Title */}
                        <h3 className="text-gray-800 dark:text-gray-200 font-semibold text-xs sm:text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors h-9 sm:h-10 leading-snug">
                            {product.name}
                        </h3>
                    </div>

                    {/* Price and Rating */}
                    <div className="flex items-center justify-between gap-1">
                        <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                            Rs. {product.priceCents}
                        </span>
                        <div className="flex items-center gap-0.5 sm:gap-1 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-amber-700 dark:text-amber-400 text-[10px] sm:text-xs font-semibold">
                            <Star fill="#d97706" strokeWidth={0} size={11} className="sm:w-3.5 sm:h-3.5" />
                            <span>{product.rating.stars}</span>
                            <span className="text-gray-400 dark:text-gray-500 font-normal hidden xs:inline">({product.rating.count})</span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Action Button */}
            <div className="px-3 pb-3 sm:px-5 sm:pb-5 mt-auto">
                <button
                    onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                    className="w-full bg-gray-900 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-500 text-white text-[10px] sm:text-xs font-semibold py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-sm hover:shadow"
                >
                    <ShoppingCart size={13} className="sm:w-3.5 sm:h-3.5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}