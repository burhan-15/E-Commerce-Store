import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

export function ProductGrid({ products }) {
    // Component states
    const [searchQuery, setSearchQuery] = useState("");
    const [minPriceLimit, setMinPriceLimit] = useState(0);
    const [maxPriceLimit, setMaxPriceLimit] = useState(10000);
    const [sortBy, setSortBy] = useState("default");

    // Dynamic price boundaries
    const maxProductPrice = useMemo(() => {
        if (products.length === 0) return 10000;
        return Math.max(...products.map((p) => p.priceCents));
    }, [products]);

    const minProductPrice = useMemo(() => {
        if (products.length === 0) return 0;
        return Math.min(...products.map((p) => p.priceCents));
    }, [products]);

    // Reset price limits when products array changes (e.g. changing category page)
    useEffect(() => {
        if (products.length > 0) {
            setMinPriceLimit(minProductPrice);
            setMaxPriceLimit(maxProductPrice);
        }
    }, [products, minProductPrice, maxProductPrice]);

    // Handler with boundary safety checks
    const handleMinChange = (val) => {
        setMinPriceLimit(Math.min(val, maxPriceLimit));
    };

    const handleMaxChange = (val) => {
        setMaxPriceLimit(Math.max(val, minPriceLimit));
    };

    // 1. Filter logic
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Search text matches title or keywords
            const matchesSearch =
                searchQuery === "" ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.keywords && product.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())));

            // Price range filter (slider bounds)
            const matchesPrice = product.priceCents >= minPriceLimit && product.priceCents <= maxPriceLimit;

            return matchesSearch && matchesPrice;
        });
    }, [products, searchQuery, minPriceLimit, maxPriceLimit]);

    // 2. Sort logic
    const sortedProducts = useMemo(() => {
        const result = [...filteredProducts];
        if (sortBy === "priceLowHigh") {
            result.sort((a, b) => a.priceCents - b.priceCents);
        } else if (sortBy === "priceHighLow") {
            result.sort((a, b) => b.priceCents - a.priceCents);
        } else if (sortBy === "ratingHighLow") {
            result.sort((a, b) => b.rating.stars - a.rating.stars);
        }
        return result;
    }, [filteredProducts, sortBy]);

    return (
        <div className="w-full flex flex-col gap-8">

            {/* Filter and Sort Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-900 shadow-xs">

                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                </div>

                {/* Filters & Sorting controls */}
                <div className="flex flex-wrap w-full md:w-auto items-center gap-4 justify-end">

                    {/* Price Range Filter Slider Panel */}
                    <div className="flex flex-col gap-2 text-[11px] w-full md:w-64 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-900">
                        <div className="flex justify-between font-semibold text-gray-700 dark:text-gray-300">
                            <span className="flex items-center gap-1">
                                <SlidersHorizontal size={12} className="text-gray-400 dark:text-gray-500" />
                                Price Range:
                            </span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                                Rs. {minPriceLimit} - Rs. {maxPriceLimit}
                            </span>
                        </div>

                        {/* Overlapping Range Slider Track Container */}
                        <div className="relative w-full h-5 flex items-center">
                            {/* Inactive Track */}
                            <div className="absolute inset-x-0 h-1 bg-gray-200 dark:bg-gray-800 rounded-lg" />

                            {/* Active Range Highlight */}
                            <div
                                className="absolute h-1 bg-blue-600 rounded-lg"
                                style={{
                                    left: `${maxProductPrice > minProductPrice ? ((minPriceLimit - minProductPrice) / (maxProductPrice - minProductPrice)) * 100 : 0}%`,
                                    right: `${maxProductPrice > minProductPrice ? 100 - ((maxPriceLimit - minProductPrice) / (maxProductPrice - minProductPrice)) * 100 : 0}%`
                                }}
                            />

                            {/* Min Input Slider */}
                            <input
                                type="range"
                                min={minProductPrice}
                                max={maxProductPrice}
                                value={minPriceLimit}
                                onChange={(e) => handleMinChange(Number(e.target.value))}
                                className="dual-range-input"
                                style={{ zIndex: minPriceLimit > maxProductPrice / 2 ? 5 : 4 }}
                            />

                            {/* Max Input Slider */}
                            <input
                                type="range"
                                min={minProductPrice}
                                max={maxProductPrice}
                                value={maxPriceLimit}
                                onChange={(e) => handleMaxChange(Number(e.target.value))}
                                className="dual-range-input"
                                style={{ zIndex: 4 }}
                            />
                        </div>
                    </div>

                    {/* Sort Order */}
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 px-3 py-3 rounded-xl border border-gray-100 dark:border-gray-900 text-xs h-20">
                        <ArrowUpDown size={14} className="text-gray-400 dark:text-gray-500" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent text-gray-700 dark:text-gray-300 font-semibold focus:outline-none cursor-pointer"
                        >
                            <option value="default">Default Sorting</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                            <option value="ratingHighLow">Highest Rated</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Results Grid */}
            {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 w-full">
                    {sortedProducts.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            ) : (
                <div className="w-full text-center py-16 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-3xl p-6">
                    <p className="text-gray-500 dark:text-gray-400">No Products Available</p>
                </div>
            )}

        </div>
    );
}