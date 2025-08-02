'use client';

import React from 'react';
import {
  ShieldCheck,
  Mail,
} from 'lucide-react';
import Head from 'next/head';

// This is a client-side component for a Privacy Policy page.
const PrivacyPolicyPage = () => {
  return (
    // Main container for the entire page
    <div className="font-inter bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      {/* SEO-related head information */}
      <Head>
        <title>นโยบายความเป็นส่วนตัว | Marketplace</title>
        <meta name="description" content="อ่านนโยบายความเป็นส่วนตัวของ Marketplace เพื่อทำความเข้าใจวิธีการเก็บและใช้ข้อมูลของคุณ" />
      </Head>

      {/* Header section with a dark, rounded hero area */}
      <section className="relative h-60 md:h-80 bg-slate-900 flex items-center justify-center text-center p-4 rounded-b-3xl shadow-lg">
        <div className="relative z-10 text-white">
          <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-emerald-400" />
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="mt-2 text-sm md:text-lg font-light text-slate-300 max-w-2xl mx-auto">
            คำมั่นสัญญาของเราในการปกป้องข้อมูลส่วนบุคคลของคุณ
          </p>
        </div>
      </section>

      {/* Main content area for the policy text */}
      <main className="container mx-auto px-4 py-12 md:py-16 flex-grow">
        <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl prose prose-slate max-w-none">
          <p className="text-slate-600 mb-8">
            นโยบายความเป็นส่วนตัวนี้อธิบายถึงวิธีการที่ Shoperza เว็บไซต์ของเรา รวบรวม, ใช้, เปิดเผย, และปกป้องข้อมูลส่วนบุคคลของคุณเมื่อคุณเข้าถึงหรือใช้งานเว็บไซต์ของเรา (ต่อไปนี้เรียกว่า "บริการ")
          </p>
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-8 mb-4">
            1. ข้อมูลที่เราเก็บรวบรวม
          </h2>
          <p>
            เราอาจรวบรวมข้อมูลส่วนบุคคลจากคุณเมื่อคุณลงทะเบียนบัญชี, ใช้บริการของเรา, หรือติดต่อเราโดยตรง ซึ่งข้อมูลเหล่านี้อาจรวมถึง:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li>ข้อมูลการระบุตัวตน เช่น ชื่อ-นามสกุล, ที่อยู่, ที่อยู่อีเมล, และเบอร์โทรศัพท์</li>
            <li>ข้อมูลทางการเงิน เช่น รายละเอียดการชำระเงิน</li>
            <li>ข้อมูลการใช้งาน เช่น ประเภทเบราว์เซอร์, ที่อยู่ IP, และหน้าที่คุณเข้าชม</li>
            <li>ข้อมูลการติดต่อ เช่น ข้อความที่คุณส่งถึงเรา</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-8 mb-4">
            2. การใช้ข้อมูลของคุณ
          </h2>
          <p>
            เราใช้ข้อมูลที่รวบรวมเพื่อวัตถุประสงค์ดังต่อไปนี้:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li>เพื่อให้บริการ, ดำเนินการ และบำรุงรักษาบริการของเรา</li>
            <li>เพื่อปรับปรุง, ปรับแต่ง และขยายบริการของเรา</li>
            <li>เพื่อสื่อสารกับคุณ, ตอบคำถามของคุณ และส่งการแจ้งเตือน</li>
            <li>เพื่อตรวจจับและป้องกันการฉ้อโกงและกิจกรรมที่ผิดกฎหมายอื่นๆ</li>
            <li>เพื่อปฏิบัติตามข้อกำหนดทางกฎหมายที่เกี่ยวข้อง</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-8 mb-4">
            3. การเปิดเผยข้อมูล
          </h2>
          <p>
            เราจะไม่ขายหรือให้เช่าข้อมูลส่วนบุคคลของคุณแก่บุคคลที่สามโดยไม่มีการยินยอมจากคุณ ยกเว้นในกรณีดังต่อไปนี้:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
            <li>กับผู้ให้บริการที่เราว่าจ้างเพื่อช่วยในการดำเนินงานของเรา (เช่น ผู้ให้บริการชำระเงิน, ผู้ให้บริการจัดเก็บข้อมูล)</li>
            <li>เมื่อกฎหมายกำหนดหรือเมื่อเราเชื่อโดยสุจริตว่าการเปิดเผยเป็นสิ่งจำเป็นเพื่อปกป้องสิทธิหรือทรัพย์สินของเรา</li>
          </ul>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-8 mb-4">
            4. การรักษาความปลอดภัยของข้อมูล
          </h2>
          <p>
            เราใช้มาตรการทางเทคนิคและองค์กรที่เหมาะสมเพื่อปกป้องข้อมูลส่วนบุคคลของคุณจากการเข้าถึงโดยไม่ได้รับอนุญาต, การใช้งาน, การแก้ไข, และการเปิดเผย
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-8 mb-4">
            5. การเปลี่ยนแปลงนโยบายนี้
          </h2>
          <p>
            เราอาจปรับปรุงนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว การเปลี่ยนแปลงใดๆ จะมีผลบังคับใช้เมื่อเราโพสต์นโยบายที่แก้ไขแล้วบนหน้านี้ เราขอแนะนำให้คุณทบทวนนโยบายนี้เป็นประจำ
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-8 mb-4">
            6. ติดต่อเรา
          </h2>
          <p>
            หากคุณมีคำถามหรือข้อกังวลใดๆ เกี่ยวกับนโยบายความเป็นส่วนตัวนี้ โปรดติดต่อเราได้ที่:
          </p>
          <div className="flex items-center mt-4 text-emerald-600 font-semibold">
            <Mail className="w-5 h-5 mr-2" />
            <a href="mailto:support@your-marketplace.com" className="hover:underline">
              support@your-marketplace.com
            </a>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="bg-slate-900 text-gray-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2024 Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
