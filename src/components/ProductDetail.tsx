'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  Star,
  Heart,
  ChevronLeft,
  ChevronRight,
  Store, // Added Store icon
  MessageSquare,
  UserCircle,
} from 'lucide-react';
import Head from 'next/head';

// Mock data for a single product. In a real application, this would come from an API.
const mockProduct = {
  id: '123456',
  name: 'กล้องถ่ายรูปดิจิตอล Vintage Pro',
  images: [
    'https://placehold.co/800x600/E5E7EB/4B5563?text=Product+Image+1',
    'https://placehold.co/800x600/D1D5DB/4B5563?text=Product+Image+2',
    'https://placehold.co/800x600/9CA3AF/4B5563?text=Product+Image+3',
  ],
  price: 15900.00,
  description: 'สัมผัสประสบการณ์การถ่ายภาพที่เหนือระดับด้วยกล้องดิจิตอล Vintage Pro ดีไซน์คลาสสิกแต่เต็มไปด้วยเทคโนโลยีที่ทันสมัย เหมาะสำหรับทั้งมืออาชีพและผู้เริ่มต้น ด้วยเลนส์คุณภาพสูงและการประมวลผลภาพที่รวดเร็ว คุณจะได้ภาพที่คมชัดและสีสันที่สมจริงในทุกสภาพแสง',
  rating: 4.8,
  reviewCount: 256,
  seller: 'ร้านกล้องวินเทจ', // Added seller information
  reviews: [ // Added mock reviews
    {
      id: 1,
      user: 'สมชาย รักการถ่ายภาพ',
      rating: 5,
      comment: 'กล้องดีมากครับ! ภาพที่ได้คมชัด สีสวยถูกใจมาก ใช้งานง่ายไม่ยุ่งยากเลยครับ',
      date: '2024-05-20',
    },
    {
      id: 2,
      user: 'สุดา ชอบของวินเทจ',
      rating: 4,
      comment: 'ดีไซน์สวยมากค่ะ แต่การตั้งค่าบางอย่างยังงงๆ อยู่บ้าง โดยรวมแล้วพอใจมากค่ะ',
      date: '2024-05-18',
    },
  ],
};

// This is a client-side component for a product detail page.
const ProductDetailPage = () => {
  const [mainImage, setMainImage] = useState(mockProduct.images[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // New state for user's rating and hover state
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Function to handle switching to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % mockProduct.images.length;
      setMainImage(mockProduct.images[newIndex]);
      return newIndex;
    });
  };

  // Function to handle switching to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + mockProduct.images.length) % mockProduct.images.length;
      setMainImage(mockProduct.images[newIndex]);
      return newIndex;
    });
  };

  return (
    <div className="font-inter bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      {/* SEO-related head information */}
      <Head>
        <title>{mockProduct.name} | Marketplace</title>
        <meta name="description" content={mockProduct.description} />
      </Head>

      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Image Gallery Section */}
            <div className="flex flex-col space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-square">
                <img
                  src={mainImage}
                  alt={mockProduct.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                {/* Navigation buttons for the main image */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </div>

              {/* Thumbnail images */}
              <div className="flex space-x-2 overflow-x-auto">
                {mockProduct.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setMainImage(img);
                      setCurrentImageIndex(index);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      mainImage === img ? 'border-blue-600 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`${mockProduct.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information Section */}
            <div className="flex flex-col space-y-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{mockProduct.name}</h1>
              
              {/* Seller information */}
              <div className="flex items-center space-x-2 text-gray-600">
                <Store className="w-4 h-4 text-gray-500" />
                <span className="text-sm">ขายโดย:</span>
                <span className="font-semibold text-gray-800">{mockProduct.seller}</span>
              </div>
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2 text-yellow-500">
                <div className="flex space-x-1">
                  {[...Array(Math.floor(mockProduct.rating))].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  {[...Array(5 - Math.floor(mockProduct.rating))].map((_, i) => (
                    <Star key={i} className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-gray-600 font-semibold">{mockProduct.rating}</span>
                <span className="text-gray-400">({mockProduct.reviewCount} รีวิว)</span>
              </div>
              
              {/* Price */}
              <div className="text-4xl font-extrabold text-blue-600">
                {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(mockProduct.price)}
              </div>
              
              {/* Description */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">รายละเอียดสินค้า</h2>
                <p className="text-gray-600 leading-relaxed">{mockProduct.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-200">
                <button
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>เพิ่มลงในตะกร้า</span>
                </button>
                <button
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-gray-800 font-semibold border-2 border-gray-300 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-sm transform hover:scale-105"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>เพิ่มลงในรายการที่ชอบ</span>
                </button>
              </div>
            </div>
          </div>

          {/* --- Review and Comment Section --- */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">รีวิวจากลูกค้า ({mockProduct.reviewCount})</h2>
            
            {/* Review list */}
            <div className="space-y-8">
              {mockProduct.reviews.map((review) => (
                <div key={review.id} className="p-6 bg-gray-50 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <UserCircle className="w-8 h-8 text-gray-400" />
                    <div>
                      <div className="font-semibold text-gray-800">{review.user}</div>
                      <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-400">วันที่: {review.date}</p>
                </div>
              ))}
            </div>

            {/* Comment/Review form (simple mock) */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">เขียนรีวิวของคุณ</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">ให้คะแนน:</span>
                  <div 
                    className="flex space-x-1"
                    onMouseLeave={() => setHoverRating(0)} // Reset hover state
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 cursor-pointer transition-colors duration-150 ${
                          star <= (hoverRating || userRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                        onClick={() => setUserRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <textarea
                  className="w-full h-24 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="เขียนความคิดเห็นของคุณที่นี่..."
                ></textarea>
                <button
                  className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>ส่งรีวิว</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;
