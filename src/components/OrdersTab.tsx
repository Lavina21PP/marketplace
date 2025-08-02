import React, { useState, type JSX } from 'react';
import { ShoppingCart, Eye, Edit, Trash2, Save, X, Filter, Search, Plus } from 'lucide-react';

// TypeScript interface for order data
interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
}

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

// Sample data
const initialOrdersData: Order[] = [
  { 
    id: 'ORD-001', 
    customerName: 'สมชาย ใจดี', 
    customerEmail: 'somchai@email.com',
    date: '2025-08-01', 
    total: 299.99, 
    status: 'Delivered',
    items: [
      { productName: 'iPhone 15 Pro', quantity: 1, price: 299.99 }
    ]
  },
  { 
    id: 'ORD-002', 
    customerName: 'สมหญิง สวยงาม', 
    customerEmail: 'somying@email.com',
    date: '2025-08-01', 
    total: 150.00, 
    status: 'Shipped',
    items: [
      { productName: 'AirPods Pro', quantity: 1, price: 150.00 }
    ]
  },
  { 
    id: 'ORD-003', 
    customerName: 'สมศักดิ์ ดีมาก', 
    customerEmail: 'somsak@email.com',
    date: '2025-07-31', 
    total: 589.75, 
    status: 'Pending',
    items: [
      { productName: 'MacBook Air M2', quantity: 1, price: 589.75 }
    ]
  },
  { 
    id: 'ORD-004', 
    customerName: 'สมใจ รักสวย', 
    customerEmail: 'somjai@email.com',
    date: '2025-07-30', 
    total: 89.50, 
    status: 'Cancelled',
    items: [
      { productName: 'Apple Watch Series 9', quantity: 1, price: 89.50 }
    ]
  },
  { 
    id: 'ORD-005', 
    customerName: 'สมปอง เก่งดี', 
    customerEmail: 'sompong@email.com',
    date: '2025-07-30', 
    total: 450.20, 
    status: 'Delivered',
    items: [
      { productName: 'iPad Pro', quantity: 1, price: 450.20 }
    ]
  },
];

const OrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrdersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<Partial<Order>>({
    customerName: '',
    customerEmail: '',
    date: new Date().toISOString().split('T')[0],
    total: 0,
    status: 'Pending',
    items: []
  });

  // Generate new order ID
  const generateOrderId = () => {
    const maxNum = Math.max(...orders.map(o => parseInt(o.id.split('-')[1])), 0);
    return `ORD-${String(maxNum + 1).padStart(3, '0')}`;
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Delete order
  const handleDeleteOrder = (orderId: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบคำสั่งซื้อนี้?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  // Add new order
  const handleAddOrder = () => {
    if (newOrder.customerName && newOrder.customerEmail && newOrder.total) {
      const order: Order = {
        id: generateOrderId(),
        customerName: newOrder.customerName,
        customerEmail: newOrder.customerEmail,
        date: newOrder.date || new Date().toISOString().split('T')[0],
        total: newOrder.total || 0,
        status: newOrder.status || 'Pending',
        items: newOrder.items || []
      };
      
      setOrders([order, ...orders]);
      setNewOrder({
        customerName: '',
        customerEmail: '',
        date: new Date().toISOString().split('T')[0],
        total: 0,
        status: 'Pending',
        items: []
      });
      setIsAddModalOpen(false);
    }
  };

  // Start editing order
  const handleEditOrder = (order: Order) => {
    setEditingOrder({ ...order });
  };

  // Save edited order
  const handleSaveEdit = () => {
    if (editingOrder) {
      setOrders(orders.map(order => 
        order.id === editingOrder.id ? editingOrder : order
      ));
      setEditingOrder(null);
    }
  };

  // Get status color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get status text in Thai
  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'จัดส่งแล้ว';
      case 'Shipped': return 'กำลังจัดส่ง';
      case 'Pending': return 'รอดำเนินการ';
      case 'Cancelled': return 'ยกเลิกแล้ว';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">จัดการคำสั่งซื้อ</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มคำสั่งซื้อ</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="ค้นหาคำสั่งซื้อ, ลูกค้า, หรืออีเมล..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">ทุกสถานะ</option>
            <option value="Pending">รอดำเนินการ</option>
            <option value="Shipped">กำลังจัดส่ง</option>
            <option value="Delivered">จัดส่งแล้ว</option>
            <option value="Cancelled">ยกเลิกแล้ว</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm">
                <th className="py-3 px-4 font-medium">คำสั่งซื้อ</th>
                <th className="py-3 px-4 font-medium">ลูกค้า</th>
                <th className="py-3 px-4 font-medium">วันที่</th>
                <th className="py-3 px-4 font-medium">ยอดรวม</th>
                <th className="py-3 px-4 font-medium">สถานะ</th>
                <th className="py-3 px-4 font-medium text-right">การกระทำ</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-gray-800 font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{order.date}</td>
                  <td className="py-4 px-4 font-medium text-gray-800">${order.total.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    {editingOrder?.id === order.id ? (
                      <select
                        value={editingOrder.status}
                        onChange={(e) => setEditingOrder({
                          ...editingOrder, 
                          status: e.target.value as Order['status']
                        })}
                        className="border border-gray-300 rounded px-2 py-1 text-xs"
                      >
                        <option value="Pending">รอดำเนินการ</option>
                        <option value="Shipped">กำลังจัดส่ง</option>
                        <option value="Delivered">จัดส่งแล้ว</option>
                        <option value="Cancelled">ยกเลิกแล้ว</option>
                      </select>
                    ) : (
                      <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {editingOrder?.id === order.id ? (
                        <>
                          <button 
                            onClick={handleSaveEdit}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setEditingOrder(null)}
                            className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="ดูรายละเอียด"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEditOrder(order)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="แก้ไข"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="ลบ"
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
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            ไม่พบคำสั่งซื้อที่ตรงกับเงื่อนไขการค้นหา
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">รายละเอียดคำสั่งซื้อ {selectedOrder.id}</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ชื่อลูกค้า</label>
                  <p className="mt-1 text-gray-900">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                  <p className="mt-1 text-gray-900">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">วันที่สั่งซื้อ</label>
                  <p className="mt-1 text-gray-900">{selectedOrder.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">สถานะ</label>
                  <span className={`inline-block mt-1 py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {getStatusText(selectedOrder.status)}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">รายการสินค้า</label>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">สินค้า</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">จำนวน</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">ราคา</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="px-4 py-2">{item.productName}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">${item.price.toLocaleString()}</td>
                          <td className="px-4 py-2">${(item.quantity * item.price).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <p className="text-lg font-bold">ยอดรวมทั้งหมด: ${selectedOrder.total.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <select
                  value={selectedOrder.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as Order['status'];
                    updateOrderStatus(selectedOrder.id, newStatus);
                    setSelectedOrder({...selectedOrder, status: newStatus});
                  }}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">รอดำเนินการ</option>
                  <option value="Shipped">กำลังจัดส่ง</option>
                  <option value="Delivered">จัดส่งแล้ว</option>
                  <option value="Cancelled">ยกเลิกแล้ว</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">เพิ่มคำสั่งซื้อใหม่</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อลูกค้า</label>
                <input
                  type="text"
                  value={newOrder.customerName || ''}
                  onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="กรอกชื่อลูกค้า"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
                <input
                  type="email"
                  value={newOrder.customerEmail || ''}
                  onChange={(e) => setNewOrder({...newOrder, customerEmail: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="กรอกอีเมลลูกค้า"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">วันที่</label>
                <input
                  type="date"
                  value={newOrder.date || ''}
                  onChange={(e) => setNewOrder({...newOrder, date: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ยอดรวม ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newOrder.total || 0}
                  onChange={(e) => setNewOrder({...newOrder, total: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                <select
                  value={newOrder.status || 'Pending'}
                  onChange={(e) => setNewOrder({...newOrder, status: e.target.value as Order['status']})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pending">รอดำเนินการ</option>
                  <option value="Shipped">กำลังจัดส่ง</option>
                  <option value="Delivered">จัดส่งแล้ว</option>
                  <option value="Cancelled">ยกเลิกแล้ว</option>
                </select>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddOrder}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                เพิ่มคำสั่งซื้อ
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
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">คำสั่งซื้อทั้งหมด</p>
              <p className="text-xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">รอดำเนินการ</p>
              <p className="text-xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">จัดส่งแล้ว</p>
              <p className="text-xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">ยอดขายรวม</p>
              <p className="text-xl font-bold text-gray-900">
                ${orders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTab;