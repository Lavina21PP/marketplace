"use client";
import { ShoppingCart, Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductCard, { type Product } from "./ProductBlock";
import { useRouter } from "next/navigation";

/**
 * Formats a number of likes into a more readable string (e.g., 1.5k, 1M).
 * @param likes The number of likes.
 * @returns A formatted string.
 */
const formatLikes = (likes: number) => {
  if (likes >= 1000000)
    return `${(likes / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (likes >= 1000) return `${(likes / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return likes.toString();
};

/**
 * Renders a single product card with details and interactive buttons.
 * @param product The product data.
 * @param onLike The function to call when the like button is clicked.
 */

/**
 * Main component to display a list of products.
 */
function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const goToDetail = (path: string) => {
    router.push(path); // ไปหน้า /home/123
  };

  /**
   * Toggles the liked state of a product and updates the like count.
   * @param id The ID of the product to update.
   */
  const handleLike = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked, // Toggle the liked state
              likes: p.isLiked ? p.likes - 1 : p.likes + 1, // Increment/decrement likes
            }
          : p
      )
    );
  };

  /**
   * Fetches mock product data. In a real app, this would be an API call.
   */
  const fetchProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "กล้องถ่ายภาพดิจิทัล",
            price: 15990,
            imageUrl:
              "https://media.istockphoto.com/id/1494935138/photo/organic-cosmetics-with-ingredients.jpg?s=612x612&w=0&k=20&c=CU-pj99HM11FO2IDnQfBW_7lw7_0D-n_gBQaLmgc00Y=",
            category: "เครื่องสำอาง",
            likes: 1052,
            isLiked: false,
          },
          {
            id: 2,
            name: "หูฟังไร้สาย",
            price: 2490,
            imageUrl:
              "https://img.freepik.com/free-photo/natural-cosmetics-desk_23-2148574904.jpg",
            category: "ผลิตภัณฑ์ดูแลผิว",
            likes: 135125562,
            isLiked: false,
          },
          {
            id: 3,
            name: "กระเป๋าสะพายหนัง",
            price: 3500,
            imageUrl:
              "https://t4.ftcdn.net/jpg/02/99/06/03/360_F_299060393_2kkwSCSx36oUXfrdEDrYkP2PlDAteMHW.jpg",
            category: "แฟชั่น",
            likes: 121215,
            isLiked: false,
          },
          {
            id: 4,
            name: "เสื้อยืดคอตตอน",
            price: 590,
            imageUrl:
              "https://t3.ftcdn.net/jpg/02/72/37/20/360_F_272372012_2aOGqAOdrJaFmaqlkGCHSvlcL2wrLUDD.jpg",
            category: "เสื้อผ้า",
            likes: 125465,
            isLiked: false,
          },
          {
            id: 5,
            name: "นาฬิกาข้อมืออัจฉริยะ",
            price: 8990,
            imageUrl:
              "https://media.istockphoto.com/id/172372025/photo/spa-cosmetics-series.jpg?s=612x612&w=0&k=20&c=6XAzl77SWlU-jDaCXeQFnvRI_f-UDRXisLsoXF-rzLg=",
            category: "น้ำหอม",
            likes: 0,
            isLiked: false,
          },
          {
            id: 6,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 7,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 8,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 9,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 10,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 11,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 12,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 13,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 14,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 15,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 16,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
          {
            id: 17,
            name: "หนังสือ 'สร้างสรรค์โค้ด'",
            price: 450,
            imageUrl:
              "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
            category: "ของใช้ส่วนตัว",
            likes: 0,
            isLiked: false,
          },
        ]);
      }, 1000);
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const productData = await fetchProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">สินค้าทั้งหมด</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-4 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-indigo-200 rounded-full w-1/2"></div>
                  </div>
                </div>
              ))
            : products.map((product, i) => (
                <ProductCard
                  key={i}
                  product={product}
                  onLike={handleLike}
                  onClickPd={goToDetail}
                />
              ))}
        </div>
      </section>
    </main>
  );
}

export default Product;
