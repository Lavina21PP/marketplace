'use client';

import React, { useState, useEffect } from 'react';

// ใช้ Lucide icons สำหรับดีไซน์ที่ดูสะอาดตา
// คุณสามารถติดตั้งได้ด้วยคำสั่ง `npm install lucide-react`
import { Search, ShoppingCart, User, Heart, ChevronRight } from 'lucide-react';

// กำหนดประเภทข้อมูลสำหรับสินค้า
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

// กำหนดประเภทข้อมูลสำหรับร้านค้า
interface Store {
  id: number;
  name: string;
  logoUrl: string;
  description: string;
}

// การเรียก API แบบจำลองเพื่อดึงข้อมูลสินค้า
const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "กล้องถ่ายภาพดิจิทัล",
          price: 15990,
          imageUrl: "https://media.istockphoto.com/id/1494935138/photo/organic-cosmetics-with-ingredients.jpg?s=612x612&w=0&k=20&c=CU-pj99HM11FO2IDnQfBW_7lw7_0D-n_gBQaLmgc00Y=",
          category: "เครื่องสำอาง"
        },
        {
          id: 2,
          name: "หูฟังไร้สาย",
          price: 2490,
          imageUrl: "https://img.freepik.com/free-photo/natural-cosmetics-desk_23-2148574904.jpg",
          category: "ผลิตภัณฑ์ดูแลผิว"
        },
        {
          id: 3,
          name: "กระเป๋าสะพายหนัง",
          price: 3500,
          imageUrl: "https://t4.ftcdn.net/jpg/02/99/06/03/360_F_299060393_2kkwSCSx36oUXfrdEDrYkP2PlDAteMHW.jpg",
          category: "แฟชั่น"
        },
        {
          id: 4,
          name: "เสื้อยืดคอตตอน",
          price: 590,
          imageUrl: "https://t3.ftcdn.net/jpg/02/72/37/20/360_F_272372012_2aOGqAOdrJaFmaqlkGCHSvlcL2wrLUDD.jpg",
          category: "เสื้อผ้า"
        },
        {
          id: 5,
          name: "นาฬิกาข้อมืออัจฉริยะ",
          price: 8990,
          imageUrl: "https://media.istockphoto.com/id/172372025/photo/spa-cosmetics-series.jpg?s=612x612&w=0&k=20&c=6XAzl77SWlU-jDaCXeQFnvRI_f-UDRXisLsoXF-rzLg=",
          category: "น้ำหอม"
        },
        {
          id: 6,
          name: "หนังสือ 'สร้างสรรค์โค้ด'",
          price: 450,
          imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/040/247/630/small/ai-generated-spa-essentials-with-flowers-on-neutral-backdrop-photo.jpg",
          category: "ของใช้ส่วนตัว"
        },
      ]);
    }, 1000);
  });
};

// การเรียก API แบบจำลองเพื่อดึงข้อมูลร้านค้า
const fetchStores = (): Promise<Store[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Beauty Hub",
          logoUrl: "https://placehold.co/100x100/F0F9FF/0C4A6E?text=BH",
          description: "สินค้าความงามและสกินแคร์จากแบรนด์ชั้นนำทั่วโลก"
        },
        {
          id: 2,
          name: "Trendy Fashion",
          logoUrl: "https://placehold.co/100x100/F0FDF4/14532D?text=TF",
          description: "อัปเดตเทรนด์แฟชั่นล่าสุดสำหรับทุกสไตล์"
        },
        {
          id: 3,
          name: "Tech Gadgets",
          logoUrl: "https://placehold.co/100x100/FEF2F2/991B1B?text=TG",
          description: "อุปกรณ์อิเล็กทรอนิกส์และแกดเจ็ตล้ำสมัย"
        },
        {
          id: 4,
          name: "Books & Beyond",
          logoUrl: "https://placehold.co/100x100/FFF7ED/7C2D12?text=BB",
          description: "แหล่งรวมหนังสือคุณภาพดีจากสำนักพิมพ์ต่างๆ"
        },
      ]);
    }, 1200);
  });
};

// คอมโพเนนต์การ์ดสินค้าที่นำกลับมาใช้ใหม่ได้
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
    <img
      src={product.imageUrl}
      alt={product.name}
      className="w-full h-48 object-cover rounded-t-xl"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xl font-bold text-indigo-600">฿{product.price.toLocaleString()}</span>
        <button className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors duration-200">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </div>
);

// คอมโพเนนต์การ์ดร้านค้าที่นำกลับมาใช้ใหม่ได้ (ปรับปรุงใหม่)
const StoreCard: React.FC<{ store: Store }> = ({ store }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center">
    <img
      src={store.logoUrl}
      alt={`${store.name} logo`}
      className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-indigo-300 p-1"
    />
    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{store.name}</h3>
    <p className="mt-2 text-sm text-gray-500 line-clamp-2">{store.description}</p>
    <a
      href="#"
      className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-200"
    >
      เยี่ยมชม
    </a>
  </div>
);


// คอมโพเนนต์หน้าแรกหลัก
const MarketplaceHomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ดึงข้อมูลสินค้าและร้านค้าเมื่อคอมโพเนนต์ถูกเมาท์
  useEffect(() => {
    const getData = async () => {
      try {
        const [productData, storeData] = await Promise.all([
          fetchProducts(),
          fetchStores()
        ]);
        setProducts(productData);
        setStores(storeData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
      {/* ส่วนเนื้อหาหลัก */}
      <main className="container mx-auto px-4 py-8">
        {/* ส่วน Hero */}
        <div className="bg-indigo-600 text-white rounded-3xl p-8 md:p-16 text-center shadow-lg mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            ค้นพบสิ่งที่คุณต้องการ
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto">
            สินค้าคุณภาพมากมายจากผู้ขายที่เชื่อถือได้
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
            เริ่มต้นช้อปปิ้ง
          </button>
        </div>

        {/* ส่วนสินค้าแนะนำ */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">สินค้าแนะนำ</h2>
            <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200">
              ดูทั้งหมด <ChevronRight size={20} className="ml-1" />
            </a>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-4 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-indigo-200 rounded-full w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* ส่วนร้านค้าแนะนำ */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">ร้านค้าแนะนำ</h2>
            <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200">
              ดูทั้งหมด <ChevronRight size={20} className="ml-1" />
            </a>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {stores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </section>

        {/* ส่วนหมวดหมู่สินค้า */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">หมวดหมู่สินค้า</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {['เครื่องสำอาง', 'แฟชั่น', 'ผลิตภัณฑ์ดูแลผิว', 'บ้านและสวน', 'กีฬา', 'หนังสือ'].map((category) => (
              <a
                key={category}
                href="#"
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:bg-indigo-50 transition-colors duration-200 transform hover:scale-105"
              >
                <div className="text-indigo-600 text-4xl mb-2">📦</div> {/* ไอคอน emoji แบบง่าย */}
                <h3 className="font-semibold">{category}</h3>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* ส่วนท้ายของหน้าเว็บ */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Marketplace. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="#" className="hover:text-white transition-colors duration-200">เกี่ยวกับเรา</a>
            <a href="#" className="hover:text-white transition-colors duration-200">ติดต่อเรา</a>
            <a href="#" className="hover:text-white transition-colors duration-200">นโยบายความเป็นส่วนตัว</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketplaceHomePage;
