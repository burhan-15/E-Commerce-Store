import { useSelector } from 'react-redux';
import { ProductGrid } from '../components/ProductGrid';

export default function AllProduct() {
    const products = useSelector((state) => state.products.items) || [];

    return (
        <div className="flex flex-col items-center w-full max-w-7xl px-6 py-10">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 self-start">All Products</h2>
            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center gap-4 w-full">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 dark:border-gray-800 dark:border-t-blue-500"></div>
                    <p className="text-gray-505 dark:text-gray-400 text-sm font-semibold animate-pulse">Loading products...</p>
                </div>
            )}
        </div>
    );
}
