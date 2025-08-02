'use client';
import { ShoppingCart, Heart, Store } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Interface for a product, reused from the product list page
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  likes: number;
  isLiked: boolean;
}

// New interface for a store
interface StoreItem {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

/**
 * Formats a number of likes into a more readable string (e.g., 1.5k, 1M).
 * @param likes The number of likes.
 * @returns A formatted string.
 */
const formatLikes = (likes: number) => {
  if (likes >= 1000000)
    return `${(likes / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  if (likes >= 1000) return `${(likes / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return likes.toString();
};

/**
 * Renders a single product card with details and interactive buttons.
 * Note: This component is reused from the product list page.
 * @param product The product data.
 * @param onLike The function to call when the like button is clicked.
 */
const ProductCard: React.FC<{
  product: Product;
  onLike: (id: number) => void;
}> = ({ product, onLike }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-48 object-cover rounded-t-xl"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xl font-bold text-indigo-600">
          ฿{product.price.toLocaleString()}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onLike(product.id)}
            className={`flex items-center p-2 rounded-full transition-colors duration-200 ${
              product.isLiked // Conditional styling based on isLiked state
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            }`}
            aria-label="Add to favorites"
          >
            <Heart
              size={18}
              className="mr-1"
              fill={product.isLiked ? 'currentColor' : 'none'}
            />
            <span className="text-sm">{formatLikes(product.likes)}</span>
          </button>
          <button
            className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors duration-200"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

/**
 * Renders a single store card.
 * @param store The store data.
 */
const StoreCard: React.FC<{ store: StoreItem }> = ({ store }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
    <img
      src={store.imageUrl}
      alt={store.name}
      className="w-full h-48 object-cover rounded-t-xl"
    />
    <div className="p-4 flex-grow flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
        {store.name}
      </h3>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-grow">
        {store.description}
      </p>
      <div className="mt-4">
        <button className="w-full bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2">
          <Store size={18} />
          <span>ไปที่ร้านค้า</span>
        </button>
      </div>
    </div>
  </div>
);

/**
 * Main component to display a list of liked items (products and stores).
 */
function Myfavorite() {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [likedStores, setLikedStores] = useState<StoreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // New state to manage the active tab (either 'products' or 'stores')
  const [activeTab, setActiveTab] = useState<'products' | 'stores'>('products');

  // A function to simulate the "unlike" action on this page
  const handleUnlike = (id: number) => {
    setLikedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /**
   * Fetches mock liked data. In a real app, this would be an API call.
   */
  const fetchLikedItems = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'กล้องถ่ายภาพดิจิทัล',
            price: 15990,
            imageUrl: 'https://media.istockphoto.com/id/1494935138/photo/organic-cosmetics-with-ingredients.jpg?s=612x612&w=0&k=20&c=CU-pj99HM11FO2IDnQfBW_7lw7_0D-n_gBQaLmgc00Y=',
            category: 'เครื่องสำอาง',
            likes: 1052,
            isLiked: true,
          },
          {
            id: 3,
            name: 'กระเป๋าสะพายหนัง',
            price: 3500,
            imageUrl: 'https://t4.ftcdn.net/jpg/02/99/06/03/360_F_299060393_2kkwSCSx36oUXfrdEDrYkP2PlDAteMHW.jpg',
            category: 'แฟชั่น',
            likes: 121215,
            isLiked: true,
          },
        ];
        const mockStores: StoreItem[] = [
          {
            id: 1,
            name: 'ร้านกล้องวินเทจ',
            description: 'ศูนย์รวมกล้องวินเทจและอุปกรณ์ถ่ายภาพหายาก',
            imageUrl: 'https://placehold.co/800x600/6B7280/F9FAFB?text=Vintage+Camera+Store',
          },
          {
            id: 2,
            name: 'ร้านเครื่องหนังแท้',
            description: 'ผลิตและจำหน่ายกระเป๋าหนังแท้คุณภาพสูง',
            imageUrl: 'https://placehold.co/800x600/6B7280/F9FAFB?text=Leather+Goods+Store',
          },
        ];
        resolve({ likedProducts: mockProducts, likedStores: mockStores });
      }, 1000);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const data = (await fetchLikedItems()) as {
          likedProducts: Product[];
          likedStores: StoreItem[];
        };
        setLikedProducts(data.likedProducts);
        setLikedStores(data.likedStores);
      } catch (error) {
        console.error('Failed to fetch liked items:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="font-inter bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-10">
          รายการที่คุณถูกใจ
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-4 h-64"
              >
                <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                <div className="mt-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Tab navigation for switching between products and stores */}
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-6 rounded-full font-semibold transition-colors duration-200 ${
                  activeTab === 'products'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                สินค้าที่ถูกใจ
              </button>
              <button
                onClick={() => setActiveTab('stores')}
                className={`py-2 px-6 rounded-full font-semibold transition-colors duration-200 ${
                  activeTab === 'stores'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ร้านค้าที่ถูกใจ
              </button>
            </div>

            {/* Conditional rendering based on the activeTab state */}
            {activeTab === 'products' ? (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 sr-only">
                  สินค้าที่ถูกใจ
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {likedProducts.length > 0 ? (
                    likedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onLike={handleUnlike}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">
                      คุณยังไม่ได้กดถูกใจสินค้าใดๆ
                    </p>
                  )}
                </div>
              </section>
            ) : (
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 sr-only">
                  ร้านค้าที่ถูกใจ
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {likedStores.length > 0 ? (
                    likedStores.map((store) => (
                      <StoreCard key={store.id} store={store} />
                    ))
                  ) : (
                    <p className="text-gray-500">
                      คุณยังไม่ได้กดถูกใจร้านค้าใดๆ
                    </p>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Myfavorite;
