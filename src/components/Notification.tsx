'use client';

import React, { useState } from 'react';
import { Bell, Mail, DollarSign, Calendar, Info, CheckCircle } from 'lucide-react';
import Head from 'next/head';

// Define a type for a single notification item
interface Notification {
  id: number;
  type: 'payment' | 'contract' | 'message' | 'security' | 'info';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

// Mock data for notifications. In a real application, this would come from an API.
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'payment',
    title: 'การชำระเงินสำเร็จแล้ว',
    message: 'การชำระเงินค่าสินค้า A ของคุณเสร็จสมบูรณ์แล้ว',
    date: '10 นาทีที่แล้ว',
    isRead: false,
  },
  {
    id: 2,
    type: 'message',
    title: 'ข้อความใหม่จากผู้ขาย',
    message: 'คุณได้รับข้อความใหม่เกี่ยวกับคำสั่งซื้อ #123456',
    date: '3 ชั่วโมงที่แล้ว',
    isRead: false,
  },
  {
    id: 3,
    type: 'contract',
    title: 'สัญญาใกล้หมดอายุ',
    message: 'สัญญาเช่าของคุณจะหมดอายุในอีก 7 วันข้างหน้า กรุณาต่ออายุสัญญา',
    date: 'เมื่อวานนี้',
    isRead: false,
  },
  {
    id: 4,
    type: 'security',
    title: 'มีการเข้าสู่ระบบจากอุปกรณ์ใหม่',
    message: 'มีการเข้าสู่ระบบบัญชีของคุณจากอุปกรณ์ที่ไม่คุ้นเคย หากไม่ใช่คุณ โปรดเปลี่ยนรหัสผ่าน',
    date: '2 วันที่แล้ว',
    isRead: true,
  },
  {
    id: 5,
    type: 'info',
    title: 'อัปเดตระบบ',
    message: 'ระบบของเราได้รับการอัปเดตเพื่อปรับปรุงประสิทธิภาพแล้ว',
    date: '5 วันที่แล้ว',
    isRead: true,
  },
];

// This is a client-side component for a notification list page.
const NotificationsListPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Function to get the appropriate icon based on notification type
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'contract':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case 'message':
        return <Mail className="w-5 h-5 text-blue-500" />;
      case 'security':
        return <Info className="w-5 h-5 text-red-500" />;
      case 'info':
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Function to mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  return (
    <div className="font-inter bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      <Head>
        <title>รายการการแจ้งเตือน | Marketplace</title>
        <meta name="description" content="ดูและจัดการการแจ้งเตือนล่าสุดของคุณจาก Marketplace" />
      </Head>

      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">การแจ้งเตือนของคุณ</h1>
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={notifications.every(notif => notif.isRead)}
          >
            <CheckCircle className="w-4 h-4" />
            <span>ทำเครื่องหมายว่าอ่านแล้วทั้งหมด</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl divide-y divide-gray-200">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start space-x-4 p-6 transition-all duration-200 ${
                  notif.isRead ? 'bg-white hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <div className="flex-shrink-0 mt-1">{getIcon(notif.type)}</div>
                <div className="flex-1">
                  <div className={`font-semibold ${notif.isRead ? 'text-gray-800' : 'text-blue-800'}`}>
                    {notif.title}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{notif.date}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-gray-500">
              <p className="text-lg">คุณไม่มีการแจ้งเตือนใหม่ในตอนนี้</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotificationsListPage;
