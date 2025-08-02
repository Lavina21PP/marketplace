'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, Heart, Star, Truck, Shield, CreditCard } from 'lucide-react';

// Define the shape of a cart item
interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number; // For showing discounts
  quantity: number;
  imageUrl: string;
  storeName: string;
  rating?: number;
  inStock: boolean;
  category: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'สมาร์ทโฟน iPhone 15 Pro',
    price: 1199.99,
    originalPrice: 1299.99,
    quantity: 1,
    imageUrl: 'https://placehold.co/100x100/1E40AF/FFFFFF?text=📱',
    storeName: 'Tech Master',
    rating: 4.8,
    inStock: true,
    category: 'อิเล็กทรอนิกส์',
  },
  {
    id: 2,
    name: 'หูฟังไร้สาย AirPods Pro',
    price: 249.50,
    quantity: 2,
    imageUrl: 'https://placehold.co/100x100/059669/FFFFFF?text=🎧',
    storeName: 'Audio World',
    rating: 4.6,
    inStock: true,
    category: 'อุปกรณ์เสียง',
  },
  {
    id: 3,
    name: 'เคสโทรศัพท์ Premium',
    price: 29.99,
    originalPrice: 39.99,
    quantity: 1,
    imageUrl: 'https://placehold.co/100x100/DC2626/FFFFFF?text=📱💼',
    storeName: 'Case Kingdom',
    rating: 4.3,
    inStock: false,
    category: 'อุปกรณ์เสริม',
  },
];

const deliveryOptions = [
  { id: 1, name: 'จัดส่งมาตรฐาน (3-5 วัน)', price: 0, icon: Truck },
  { id: 2, name: 'จัดส่งเร่งด่วน (1-2 วัน)', price: 15.00, icon: Truck },
  { id: 3, name: 'จัดส่งในวันเดียวกัน', price: 25.00, icon: Truck },
];

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [selectedDelivery, setSelectedDelivery] = useState(0);
  const [total, setTotal] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [favoriteItems, setFavoriteItems] = useState<Set<number>>(new Set());

  // Recalculate totals whenever cart items change
  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalSavings = cartItems.reduce((acc, item) => 
      acc + ((item.originalPrice || item.price) - item.price) * item.quantity, 0);
    
    setSubtotal(newSubtotal);
    setSavings(totalSavings);
    setTotal(newSubtotal + selectedDelivery - promoDiscount);
  }, [cartItems, selectedDelivery, promoDiscount]);

  // Handle quantity changes for an item
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  // Handle removing an item from the cart
  const handleRemoveItem = (itemId: number) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.id !== itemId)
    );
  };

  // Handle adding to favorites
  const toggleFavorite = (itemId: number) => {
    setFavoriteItems(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  // Handle promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoDiscount(subtotal * 0.1);
      alert('รหัสส่วนลดถูกใช้แล้ว! ลด 10%');
    } else if (promoCode.toLowerCase() === 'free20') {
      setPromoDiscount(20);
      alert('รหัสส่วนลดถูกใช้แล้ว! ลด $20');
    } else {
      alert('รหัสส่วนลดไม่ถูกต้อง');
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              ตะกร้าสินค้า
            </h1>
          </div>
          <p className="text-gray-600">
            คุณมีสินค้า {itemCount} รายการในตะกร้า
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-100">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-gray-100 shadow-md">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/100x100/E5E7EB/1F2937?text=ไม่พบรูป";
                        }}
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">หมด</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.name}</h2>
                          <p className="text-sm text-blue-600 font-medium">{item.storeName}</p>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                            {item.category}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="p-2 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favoriteItems.has(item.id) 
                                ? 'text-red-500 fill-current' 
                                : 'text-gray-400'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Rating */}
                      {item.rating && (
                        <div className="flex items-center space-x-1">
                          {renderStars(item.rating)}
                          <span className="text-sm text-gray-600 ml-2">({item.rating})</span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${formatPrice(item.price)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ${formatPrice(item.originalPrice)}
                            </span>
                            <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                              ลด {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>

                      {/* Stock Status */}
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-sm ${item.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {item.inStock ? 'มีสินค้า' : 'สินค้าหมด'}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center space-y-3">
                      <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="text-gray-500 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-8 h-8 flex items-center justify-center transition-all duration-200"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border-0 bg-transparent font-semibold focus:outline-none"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="text-gray-500 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-8 h-8 flex items-center justify-center transition-all duration-200"
                          disabled={!item.inStock}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="ลบออกจากตะกร้า"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">ตะกร้าของคุณว่างเปล่า</h3>
                <p className="text-gray-500 mb-6">เพิ่มสินค้าเพื่อเริ่มต้นการช้อปปิ้ง</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                  เริ่มช้อปปิ้ง
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="space-y-6">
            {/* Delivery Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                ตัวเลือกการจัดส่ง
              </h3>
              <div className="space-y-3">
                {deliveryOptions.map((option) => (
                  <label key={option.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value={option.price}
                      checked={selectedDelivery === option.price}
                      onChange={() => setSelectedDelivery(option.price)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{option.name}</span>
                        <span className="text-sm font-bold text-gray-900">
                          {option.price === 0 ? 'ฟรี' : `$${formatPrice(option.price)}`}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">รหัสส่วนลด</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="ใส่รหัสส่วนลด"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={applyPromoCode}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  ใช้
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                ลองใช้: SAVE10 หรือ FREE20
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                สรุปยอดการสั่งซื้อ
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-gray-600">
                  <span>ยอดรวมสินค้า ({itemCount} รายการ)</span>
                  <span>${formatPrice(subtotal)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>ส่วนลดรวม</span>
                    <span>-${formatPrice(savings)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center text-gray-600">
                  <span>ค่าจัดส่ง</span>
                  <span>{selectedDelivery === 0 ? 'ฟรี' : `$${formatPrice(selectedDelivery)}`}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>ส่วนลดจากโค้ด</span>
                    <span>-${formatPrice(promoDiscount)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>ยอดรวมทั้งหมด</span>
                  <span>${formatPrice(total)}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className="flex items-center justify-center space-x-4 mb-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1 text-green-500" />
                  <span>การชำระเงินปลอดภัย</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-1 text-blue-500" />
                  <span>จัดส่งรวดเร็ว</span>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => alert('กำลังเปลี่ยนเส้นทางไปยังหน้าชำระเงิน...')}
                disabled={cartItems.some(item => !item.inStock)}
              >
                ดำเนินการชำระเงิน
              </button>
              
              {cartItems.some(item => !item.inStock) && (
                <p className="text-sm text-red-600 text-center mt-2">
                  กรุณาลบสินค้าที่หมดออกจากตะกร้าก่อนชำระเงิน
                </p>
              )}

              <div className="mt-4 text-center">
                <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  ← กลับไปช้อปปิ้งต่อ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-green-500 mb-2" />
              <h4 className="font-semibold text-gray-800">ความปลอดภัย 100%</h4>
              <p className="text-sm text-gray-600">การชำระเงินเข้ารหัส SSL</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-blue-500 mb-2" />
              <h4 className="font-semibold text-gray-800">จัดส่งฟรี</h4>
              <p className="text-sm text-gray-600">สำหรับคำสั่งซื้อมากกว่า $50</p>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-8 h-8 text-yellow-500 mb-2" />
              <h4 className="font-semibold text-gray-800">รับประกันคุณภาพ</h4>
              <p className="text-sm text-gray-600">คืนเงิน 30 วันไม่มีเงื่อนไข</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}