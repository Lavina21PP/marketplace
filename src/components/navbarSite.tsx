'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Mail, Settings, UserCircle, Heart, ShoppingCart } from 'lucide-react';

const NavbarSite = () => {
  const [isOpen, setIsOpen] = useState(false);
  // สถานะเพื่อเก็บ path ปัจจุบันของ URL
  const [currentPath, setCurrentPath] = useState('');

  // ใช้ useEffect เพื่อตั้งค่า path ปัจจุบันเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // ฟังก์ชันสำหรับปิดการเลื่อน (scroll) ของหน้า
  const bodyHidden = () => {
    document.body.style.overflow = "hidden"; // ปิดการเลื่อน
  };

  // ฟังก์ชันสำหรับเปิดการเลื่อน (scroll) ของหน้า
  const bodyAuto = () => {
    document.body.style.overflow = ""; // เปิดการเลื่อน
  };

  // ใช้ useEffect เพื่อจัดการการเลื่อนเมื่อเมนูเปิดหรือปิด
  useEffect(() => {
    if (isOpen) {
      bodyHidden();
    } else {
      bodyAuto();
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { id: 'home', name: "หน้าแรก", href: "/", icon: Home },
    { id: 'about', name: "เกี่ยวกับ", href: "/about", icon: User },
    { id: 'contactUs', name: "ติดต่อ", href: "/contact-us", icon: Mail },
    { id: 'cart', name: "ตะกร้า", href: "/cart", icon: ShoppingCart },
    { id: 'favorites', name: "ชื่นชอบ", href: "/favorites", icon: Heart },
    { id: 'settings', name: "ตั้งค่า", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 theme2 shadow-md">
      <div className="contain container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo และ Mobile Menu Button */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-2xl hidden md:block font-bold text-indigo-600">
              Marketplace
            </a>
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 inline-flex md:hidden items-center justify-center rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              aria-expanded="false"
            >
              <Menu aria-hidden="true" />
            </button>
          </div>

          {/* Desktop Menu - แสดงบนหน้าจอขนาดใหญ่ */}
          <div className="hidden md:block">
            <div className="flex items-center gap-4">
              <div className="flex items-baseline gap-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  // ตรวจสอบว่า item.href ตรงกับ path ปัจจุบันหรือไม่
                  const isActive = item.href === currentPath;
                  const activeClasses = isActive 
                    ? "bg-indigo-100 text-indigo-700" 
                    : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600";
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      // ใส่คลาสแบบมีเงื่อนไข
                      className={`flex items-center gap-2 ${activeClasses} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                    >
                      <IconComponent size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
              <button className="text-gray-600 p-1.5 hover:text-indigo-600 transition-colors duration-200">
                <User size={24} />
              </button>
            </div>
          </div>
          
          {/* Mobile Profile Icons */}
          <div className="md:hidden flex items-center gap-2">
            <button className="text-gray-600 p-1.5 hover:text-indigo-600 transition-colors duration-200">
              <ShoppingCart size={24} />
            </button>
            <button className="text-gray-600 p-1.5 hover:text-indigo-600 transition-colors duration-200">
              <Heart size={24} />
            </button>
            <button className="text-gray-600 p-1.5 hover:text-indigo-600 transition-colors duration-200">
              <User size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-gray-600 opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Side Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header ของ Mobile Menu */}
        <div className="flex items-center justify-between p-3 border-b">
          <a href="#" className="text-xl font-bold text-indigo-600">
            Marketplace
          </a>
          <button
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Menu Items ของ Mobile Menu */}
        <div className="py-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            // ตรวจสอบว่า item.href ตรงกับ path ปัจจุบันหรือไม่
            const isActive = item.href === currentPath;
            const activeClasses = isActive 
                ? "bg-indigo-100 text-indigo-700" 
                : "hover:bg-indigo-50 hover:text-indigo-600";

            if (item.id === "favorites" || item.id === "cart") {
              return null; // ซ่อนปุ่มเหล่านี้ในเมนู mobile
            }
            return (
              <a
                key={item.id}
                href={item.href}
                // ใส่คลาสแบบมีเงื่อนไข
                className={`flex items-center space-x-4 ${activeClasses} px-6 py-4 text-base font-medium transition-colors duration-200 border-b border-gray-100`}
                onClick={() => setIsOpen(false)}
              >
                <IconComponent size={24} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Footer ของ Mobile Menu */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="flex items-center space-x-3">
            <UserCircle className="h-8 w-8 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-gray-800">ชื่อผู้ใช้</div>
              <div className="text-xs text-gray-500">user@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSite;
