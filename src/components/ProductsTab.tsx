import React, { useState, type JSX } from 'react';
import { Package, Plus, Edit, Trash2, Save, X } from 'lucide-react';

// TypeScript interface for product data
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Out of Stock';
  image: string;
  category: string;
}

// Initial sample data
const initialProductsData: Product[] = [
  { id: 1, name: 'iPhone 15 Pro', price: 1199, stock: 50, status: 'In Stock', image: '📱', category: 'อิเล็กทรอนิกส์' },
  { id: 2, name: 'MacBook Air M2', price: 1099, stock: 25, status: 'In Stock', image: '💻', category: 'คอมพิวเตอร์' },
  { id: 3, name: 'AirPods Pro', price: 249, stock: 0, status: 'Out of Stock', image: '🎧', category: 'อุปกรณ์เสียง' },
  { id: 4, name: 'iPad Pro', price: 799, stock: 12, status: 'In Stock', image: '📲', category: 'แท็บเล็ต' },
  { id: 5, name: 'Apple Watch Series 9', price: 399, stock: 120, status: 'In Stock', image: '⌚', category: 'นาฬิกา' },
];

const ProductsTab: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProductsData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    stock: 0,
    image: '📦',
    category: ''
  });

  // Generate new ID
  const generateNewId = () => Math.max(...products.map(p => p.id), 0) + 1;

  // Add new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      const product: Product = {
        id: generateNewId(),
        name: newProduct.name,
        price: newProduct.price || 0,
        stock: newProduct.stock || 0,
        status: (newProduct.stock || 0) > 0 ? 'In Stock' : 'Out of Stock',
        image: newProduct.image || '📦',
        category: newProduct.category
      };
      
      setProducts([...products, product]);
      setNewProduct({ name: '', price: 0, stock: 0, image: '📦', category: '' });
      setIsAddModalOpen(false);
    }
  };

  // Delete product
  const handleDeleteProduct = (id: number) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Start editing product
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // Save edited product
  const handleSaveEdit = () => {
    if (editingProduct) {
      const updatedProduct = {
        ...editingProduct,
        status: editingProduct.stock > 0 ? 'In Stock' : 'Out of Stock' as 'In Stock' | 'Out of Stock'
      };
      
      setProducts(products.map(p => 
        p.id === editingProduct.id ? updatedProduct : p
      ));
      setEditingProduct(null);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Update stock and status automatically
  const updateProductStock = (id: number, newStock: number) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, stock: newStock, status: newStock > 0 ? 'In Stock' : 'Out of Stock' }
        : p
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">จัดการสินค้า</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มสินค้าใหม่</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="py-3 px-4 font-medium">สินค้า</th>
                <th className="py-3 px-4 font-medium">ราคา</th>
                <th className="py-3 px-4 font-medium">สต็อก</th>
                <th className="py-3 px-4 font-medium">สถานะ</th>
                <th className="py-3 px-4 font-medium">หมวดหมู่</th>
                <th className="py-3 px-4 font-medium text-right">การกระทำ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                        {product.image}
                      </div>
                      {editingProduct?.id === product.id ? (
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                          className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                        />
                      ) : (
                        <p className="font-medium text-gray-900">{product.name}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-800">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                        className="border border-gray-300 rounded px-2 py-1 w-24"
                      />
                    ) : (
                      `$${product.price.toLocaleString()}`
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct({...editingProduct, stock: Number(e.target.value)})}
                        className="border border-gray-300 rounded px-2 py-1 w-20"
                      />
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${
                      product.status === 'In Stock'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.status === 'In Stock' ? 'มีสินค้า' : 'หมดสต็อก'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {editingProduct?.id === product.id ? (
                      <input
                        type="text"
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                        className="border border-gray-300 rounded px-2 py-1"
                      />
                    ) : (
                      <div className="text-black">{product.category}</div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {editingProduct?.id === product.id ? (
                        <>
                          <button 
                            onClick={handleSaveEdit}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">เพิ่มสินค้าใหม่</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อสินค้า</label>
                <input
                  type="text"
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="กรอกชื่อสินค้า"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ราคา ($)</label>
                <input
                  type="number"
                  value={newProduct.price || 0}
                  onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">จำนวนสต็อก</label>
                <input
                  type="number"
                  value={newProduct.stock || 0}
                  onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
                <input
                  type="text"
                  value={newProduct.category || ''}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="กรอกหมวดหมู่"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">รูปภาพ (Emoji)</label>
                <input
                  type="text"
                  value={newProduct.image || ''}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="📦"
                />
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddProduct}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                เพิ่มสินค้า
              </button>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">สินค้าทั้งหมด</p>
              <p className="text-xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">มีสินค้า</p>
              <p className="text-xl font-bold text-gray-900">
                {products.filter(p => p.status === 'In Stock').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">หมดสต็อก</p>
              <p className="text-xl font-bold text-gray-900">
                {products.filter(p => p.status === 'Out of Stock').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">มูลค่ารวม</p>
              <p className="text-xl font-bold text-gray-900">
                ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTab;