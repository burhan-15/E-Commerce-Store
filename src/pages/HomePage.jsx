import { useSelector } from 'react-redux';
import { ProductGrid } from '../components/ProductGrid';

export default function HomePage() {
    let products = useSelector((state) => state.products.items) || [];

    if (products.length > 0) {
        products = products.filter((p) => p.rating.stars >= 4.8);
    }
    return (
        <div className="flex flex-col items-center w-full max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 self-start">Home / Featured Products</h2>
            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center gap-4 w-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 dark:border-gray-800 dark:border-t-blue-500"></div>
                    <p className="text-gray-550 dark:text-gray-400 text-sm font-semibold animate-pulse">Loading products...</p>
                </div>
            )}
        </div>
    );
}
