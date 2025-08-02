import { Heart, ShoppingCart } from "lucide-react";

// กำหนดประเภทข้อมูลสำหรับสินค้า
export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  likes: number;
  isLiked: boolean; // Added isLiked property
}

const formatLikes = (likes: number) => {
  if (likes >= 1000000)
    return `${(likes / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (likes >= 1000) return `${(likes / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return likes.toString();
};

const ProductCard = ({
  product,
  onLike,
  onClickPd,
}: {
  product: Product;
  onLike: (id: number) => void;
  onClickPd: (path: string) => void;
}) => (
  <div
    onClick={() => onClickPd(`/product/${product.id}`)}
    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
  >
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
            onClick={(e) => {
              e.stopPropagation();
              onLike(product.id);
            }}
            className={`flex items-center p-2 rounded-full transition-colors duration-200 ${
              product.isLiked // Conditional styling based on isLiked state
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
            aria-label="Add to favorites"
          >
            {/* The Heart icon's fill property also changes */}
            <Heart
              size={18}
              className="mr-1"
              fill={product.isLiked ? "currentColor" : "none"}
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

export default ProductCard;
