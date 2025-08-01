// Inventory data array for Next.js Excel export
const inventoryData = [
  { id: 1, productName: "POCO C71 Gold 3GB RAM 64GB ROM", stock: 2 },
  { id: 2, productName: "POCO C71 Black 3GB RAM 64GB ROM", stock: 1 },
  { id: 3, productName: "POCO C71 Black 3GB RAM 64GB ROM", stock: 2 },
  { id: 4, productName: "POCO X7 Pro Black 12GB RAM 512GB ROM", stock: 2 },
  { id: 5, productName: "Redmi 14C Starry Blue 4GB RAM 128GB ROM", stock: 249 },
  { id: 6, productName: "Redmi 14C Midnight Black 4GB RAM 128GB ROM", stock: 67 },
  { id: 7, productName: "Redmi 14C Sage Green 6GB RAM 128GB ROM", stock: 15 },
  { id: 8, productName: "Redmi 14C Dreamy Purple 6GB RAM 128GB ROM", stock: 208 },
  { id: 9, productName: "Redmi A3 Midnight Black 4GB RAM 128GB ROM", stock: 194 },
  { id: 10, productName: "Redmi A3 Star Blue 4GB RAM 128GB ROM", stock: 1 },
  { id: 11, productName: "Redmi A3 Midnight Black 3GB RAM 64GB ROM", stock: 1 },
  { id: 12, productName: "Redmi A5 Ocean Blue 3GB RAM 64GB ROM", stock: 1 },
  { id: 13, productName: "Redmi A5 Lake Green 3GB RAM 64GB ROM", stock: 158 },
  { id: 14, productName: "Redmi A5 Sandy Gold 3GB RAM 64GB ROM", stock: 321 },
  { id: 15, productName: "Redmi A5 Lake Green 4GB RAM 128GB ROM", stock: 866 },
  { id: 16, productName: "Redmi A5 Midnight Black 4GB RAM 128GB ROM", stock: 400 },
  { id: 17, productName: "Redmi A5 Ocean Blue 4GB RAM 128GB ROM", stock: 5 },
  { id: 18, productName: "Redmi A5 Sandy Gold 4GB RAM 128GB ROM", stock: 82 },
  { id: 19, productName: "Redmi Note 14 Ocean Blue 6GB RAM 128GB ROM", stock: 14 },
  { id: 20, productName: "Redmi Note 14 Midnight Black 6GB RAM 128GB ROM", stock: 102 },
  { id: 21, productName: "Redmi Note 14 Lime Green 6GB RAM 128GB ROM", stock: 46 },
  { id: 22, productName: "Redmi Note 14 Lime Green 8GB RAM 256GB ROM", stock: 22 },
  { id: 23, productName: "Redmi Note 14 Midnight Black 8GB RAM 256GB ROM", stock: 26 },
  { id: 24, productName: "Redmi Note 14 Pro 5G Coral Green 12GB RAM 512GB ROM", stock: 15 },
  { id: 25, productName: "Redmi Note 14 Pro 5G Midnight Black 12GB+512GB", stock: 41 },
  { id: 26, productName: "Redmi Note 14 Pro 5G Coral Green 8GB+256GB", stock: 2 },
  { id: 27, productName: "Redmi Note 14 Pro 5G Midnight Black 8GB+256GB", stock: 95 },
  { id: 28, productName: "Redmi Note 14 Pro 5G Lavender Purple 8GB+256GB", stock: 32 },
  { id: 29, productName: "Redmi Note 14 Pro Aurora Purple 8GB+256GB", stock: 12 },
  { id: 30, productName: "Redmi Note 14 Pro Ocean Blue 8GB RAM 256GB ROM", stock: 1 },
  { id: 31, productName: "Redmi Note 14 Pro Midnight Black 8GB+256GB", stock: 14 },
  { id: 32, productName: "Redmi Note 14 Pro+ 5G Midnight Black 12GB+512GB", stock: 17 },
  { id: 33, productName: "Redmi Pad SE Graphite Gray 6GB RAM 128GB ROM", stock: 2 },
  { id: 34, productName: "Redmi Pad SE Lavender Purple 8GB RAM 256GB ROM", stock: 51 },
  { id: 35, productName: "Redmi 12C Gray 6+128", stock: 3 },
  { id: 36, productName: "Xiaomi 14T Titan Black 12GB RAM 512GB ROM", stock: 2 },
  { id: 37, productName: "Xiaomi 14T PRO Titan Black 12GB RAM 512GB ROM", stock: 1 },
  { id: 38, productName: "Xiaomi 15 Black 12GB RAM 512GB ROM", stock: 2 },
  { id: 39, productName: "Poco M5 green 6+128", stock: 20 },
  { id: 40, productName: "Poco M5 black 6+128GB", stock: 6 },
  { id: 41, productName: "POCO X5 5G Blue 8+256", stock: 13 },
  { id: 42, productName: "POCO X5 5G Black 8+256", stock: 12 },
  { id: 43, productName: "TECLAST Tablet PC T50Plus 6GB+256GB 4G版", stock: 9 },
  { id: 44, productName: "TECLAST Tablet PC M50Plus 6GB+128GB 4G版", stock: 10 },
  { id: 45, productName: "Xiaomi Smart Band 9", stock: 10 },
  { id: 46, productName: "Xiaomi Smart Band 9", stock: 1 },
  { id: 47, productName: "Xiaomi Smart Band 9 Active", stock: 38 },
  { id: 48, productName: "Xiaomi Smart Band 9", stock: 14 },
  { id: 49, productName: "Xiaomi Smart Band 9 Pro", stock: 11 },
  { id: 50, productName: "Redmi Watch 5 Active", stock: 14 },
  { id: 51, productName: "Redmi Watch 5 Active", stock: 10 },
  { id: 52, productName: "Redmi Watch 5", stock: 20 },
  { id: 53, productName: "Redmi Watch 5", stock: 8 },
  { id: 54, productName: "Xiaomi智能儿童手表", stock: 6 },
  { id: 55, productName: "米家牌空气净化器Y-602型可适式空气消毒机", stock: 27 },
  { id: 56, productName: "米家空气净化器4Pro H", stock: 8 },
  { id: 57, productName: "米家储能空气净化器", stock: 18 },
  { id: 58, productName: "米家空气净化器4 Pro 白色", stock: 8 },
  { id: 59, productName: "米家空气净化器4 Lite", stock: 15 }
];

// Total stock count
const totalStock = inventoryData.reduce((sum, item) => sum + item.stock, 0);

// Export functions for Next.js
export { inventoryData, totalStock };

// Example usage in Next.js component for Excel export
/*
import * as XLSX from 'xlsx';
import { inventoryData } from './path-to-this-file';

const exportToExcel = () => {
  const worksheet = XLSX.utils.json_to_sheet(inventoryData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
  XLSX.writeFile(workbook, 'inventory.xlsx');
};
*/

// Alternative format for Excel with headers in Thai/English
const inventoryDataWithHeaders = inventoryData.map(item => ({
  'รหัสสินค้า / Product ID': item.id,
  'ชื่อสินค้า / Product Name': item.productName,
  'จำนวนคงเหลือ / Stock Quantity': item.stock
}));

export { inventoryDataWithHeaders };