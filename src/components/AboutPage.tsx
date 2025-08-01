'use client';

import React from 'react';
import { Sparkles, BarChart2, Briefcase, Users, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
      {/* ส่วน Hero */}
      <section className="relative h-96 bg-indigo-600 flex items-center justify-center text-center p-4 rounded-b-3xl shadow-lg">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://placehold.co/1920x1080/FFFFFF/000000?text=Background')" }}></div>
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fade-in-up">
            เรื่องราวของเรา
          </h1>
          <p className="mt-4 text-lg md:text-xl font-light max-w-2xl mx-auto animate-fade-in">
            เชื่อมต่อผู้คนเข้ากับสินค้าและบริการที่ดีที่สุด
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* ส่วนภารกิจและค่านิยม */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              ภารกิจและค่านิยมของเรา
            </h2>
            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              เรามุ่งมั่นที่จะเป็นแพลตฟอร์มที่ทุกคนไว้วางใจในการค้นหาสินค้าที่มีคุณภาพและสร้างสรรค์จากทั่วทุกมุมโลก
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-center">
              <Sparkles size={48} className="text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">นวัตกรรม</h3>
              <p className="mt-2 text-gray-500">
                เราใช้เทคโนโลยีเพื่อสร้างประสบการณ์การซื้อขายที่ง่ายและดีขึ้น
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-center">
              <BarChart2 size={48} className="text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">ความน่าเชื่อถือ</h3>
              <p className="mt-2 text-gray-500">
                เราสร้างความเชื่อมั่นด้วยการคัดสรรสินค้าและร้านค้าที่มีคุณภาพ
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 text-center">
              <Briefcase size={48} className="text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">การสนับสนุนผู้ประกอบการ</h3>
              <p className="mt-2 text-gray-500">
                เราช่วยให้ธุรกิจขนาดเล็กเติบโตและเข้าถึงลูกค้าได้ง่ายขึ้น
              </p>
            </div>
          </div>
        </section>

        {/* ส่วน Call to Action */}
        <section className="bg-indigo-500 text-white rounded-3xl p-8 md:p-12 text-center shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold">
            พร้อมที่จะเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            ไม่ว่าคุณจะเป็นผู้ซื้อหรือผู้ขาย เราก็พร้อมต้อนรับคุณ
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              เริ่มต้นช้อปปิ้ง
            </a>
            <a
              href="#"
              className="border border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition-colors duration-300"
            >
              เปิดร้านค้าของคุณ
            </a>
          </div>
        </section>
      </main>

      {/* ส่วนท้ายของหน้าเว็บ */}
      <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
