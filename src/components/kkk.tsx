'use client';
import React from 'react';
import * as XLSX from 'xlsx';
import { inventoryDataWithHeaders, totalStock } from './toexcel';

export default function InventoryExport() {

  const exportToExcel = () => {
    // แปลง JSON → Sheet
    const worksheet = XLSX.utils.json_to_sheet(inventoryDataWithHeaders);
    
    // สร้าง Workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
    
    // เขียนไฟล์
    XLSX.writeFile(workbook, 'inventory.xlsx');
  };

  return (
    <div className="p-4">
      <h1>สินค้าทั้งหมด: {totalStock} ชิ้น</h1>
      <button 
        onClick={exportToExcel} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        📦 Export Excel
      </button>
    </div>
  );
}
