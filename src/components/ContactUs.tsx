'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactUsPage = () => {
  // สถานะสำหรับฟอร์มติดต่อ
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // จัดการการเปลี่ยนแปลงของข้อมูลในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // จัดการการส่งฟอร์ม
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // จำลองการส่งข้อมูล
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form data submitted:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' }); // ล้างฟอร์ม
    } catch (error) {
      console.error('Submission failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-900">
      {/* ส่วน Hero */}
      <section className="relative h-72 bg-indigo-600 flex items-center justify-center text-center p-4 rounded-b-3xl shadow-lg">
        <div className="relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            ติดต่อเรา
          </h1>
          <p className="mt-2 text-lg md:text-xl font-light max-w-2xl mx-auto">
            เราพร้อมที่จะรับฟังและช่วยเหลือคุณ
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* ส่วนข้อมูลการติดต่อ */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ข้อมูลการติดต่อ</h2>
            <p className="text-gray-600 mb-8">
              หากคุณมีคำถาม ข้อเสนอแนะ หรือต้องการความช่วยเหลือ
              สามารถติดต่อเราได้ตามช่องทางด้านล่างนี้
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Whatsapp</h3>
                  <p className="text-gray-500">+856 2097847101</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-500">support@marketplace.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* ส่วนฟอร์มติดต่อ */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">ส่งข้อความถึงเรา</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  ชื่อของคุณ
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  อีเมลของคุณ
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  ข้อความ
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    กำลังส่ง...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    ส่งข้อความ
                  </>
                )}
              </button>
            </form>

            {/* ส่วนแสดงสถานะการส่งฟอร์ม */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg">
                ✅ ขอบคุณครับ! ข้อความของคุณถูกส่งเรียบร้อยแล้ว
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
                ❌ เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง
              </div>
            )}
          </div>
        </div>
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

export default ContactUsPage;
