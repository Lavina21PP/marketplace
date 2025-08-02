import React, { useState, type JSX } from 'react';
import { Users, Plus, Eye, Edit, Trash2, Save, X, Search, Filter, Mail, Calendar, ShoppingBag } from 'lucide-react';

// TypeScript interface for customer data
interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    joinedDate: string;
    totalOrders: number;
    totalSpent: number;
    status: 'Active' | 'Inactive';
    address: string;
}

// Sample data
const initialCustomersData: Customer[] = [
    { 
        id: 1, 
        name: 'สมชาย ใจดี', 
        email: 'somchai.j@example.com', 
        phone: '086-123-4567',
        joinedDate: '2025-01-15', 
        totalOrders: 5, 
        totalSpent: 1299.95,
        status: 'Active',
        address: '123 ถนนสุขุมวิท กรุงเทพฯ 10110'
    },
    { 
        id: 2, 
        name: 'สมหญิง สวยงาม', 
        email: 'somying.s@example.com', 
        phone: '089-234-5678',
        joinedDate: '2025-02-20', 
        totalOrders: 2, 
        totalSpent: 450.00,
        status: 'Active',
        address: '456 ถนนพหลโยธิน เชียงใหม่ 50000'
    },
    { 
        id: 3, 
        name: 'สมศักดิ์ ดีมาก', 
        email: 'somsak.d@example.com', 
        phone: '092-345-6789',
        joinedDate: '2025-03-10', 
        totalOrders: 1, 
        totalSpent: 89.50,
        status: 'Inactive',
        address: '789 ถนนเจริญกรุง กรุงเทพฯ 10500'
    },
    { 
        id: 4, 
        name: 'สมใจ รักสวย', 
        email: 'somjai.r@example.com', 
        phone: '081-456-7890',
        joinedDate: '2025-04-05', 
        totalOrders: 8, 
        totalSpent: 2150.75,
        status: 'Active',
        address: '321 ถนนราชดำเนิน ขอนแก่น 40000'
    },
    { 
        id: 5, 
        name: 'สมปอง เก่งดี', 
        email: 'sompong.k@example.com', 
        phone: '095-567-8901',
        joinedDate: '2025-05-25', 
        totalOrders: 3, 
        totalSpent: 750.60,
        status: 'Active',
        address: '654 ถนนนิมมานเหมินท์ เชียงใหม่ 50200'
    },
];

const CustomersTab: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>(initialCustomersData);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
        name: '',
        email: '',
        phone: '',
        joinedDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalSpent: 0,
        status: 'Active',
        address: ''
    });

    // Generate new customer ID
    const generateNewId = () => Math.max(...customers.map(c => c.id), 0) + 1;

    // Filter customers based on search and status
    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             customer.phone.includes(searchQuery);
        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Add new customer
    const handleAddCustomer = () => {
        if (newCustomer.name && newCustomer.email) {
            const customer: Customer = {
                id: generateNewId(),
                name: newCustomer.name,
                email: newCustomer.email,
                phone: newCustomer.phone || '',
                joinedDate: newCustomer.joinedDate || new Date().toISOString().split('T')[0],
                totalOrders: newCustomer.totalOrders || 0,
                totalSpent: newCustomer.totalSpent || 0,
                status: newCustomer.status || 'Active',
                address: newCustomer.address || ''
            };
            
            setCustomers([customer, ...customers]);
            setNewCustomer({
                name: '',
                email: '',
                phone: '',
                joinedDate: new Date().toISOString().split('T')[0],
                totalOrders: 0,
                totalSpent: 0,
                status: 'Active',
                address: ''
            });
            setIsAddModalOpen(false);
        }
    };

    // Delete customer
    const handleDeleteCustomer = (id: number) => {
        if (confirm('คุณแน่ใจหรือไม่ที่จะลบข้อมูลลูกค้านี้?')) {
            setCustomers(customers.filter(c => c.id !== id));
        }
    };

    // Start editing customer
    const handleEditCustomer = (customer: Customer) => {
        setEditingCustomer({ ...customer });
    };

    // Save edited customer
    const handleSaveEdit = () => {
        if (editingCustomer) {
            setCustomers(customers.map(c => 
                c.id === editingCustomer.id ? editingCustomer : c
            ));
            setEditingCustomer(null);
        }
    };

    // Toggle customer status
    const toggleCustomerStatus = (id: number) => {
        setCustomers(customers.map(customer => 
            customer.id === id 
                ? { ...customer, status: customer.status === 'Active' ? 'Inactive' : 'Active' }
                : customer
        ));
    };

    // Get status color
    const getStatusColor = (status: Customer['status']) => {
        return status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
    };

    // Get status text in Thai
    const getStatusText = (status: Customer['status']) => {
        return status === 'Active' ? 'ใช้งาน' : 'ไม่ใช้งาน';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">จัดการลูกค้า</h2>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>เพิ่มลูกค้าใหม่</span>
                </button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="ค้นหาลูกค้า, อีเมล, หรือเบอร์โทร..."
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
                        <option value="Active">ใช้งาน</option>
                        <option value="Inactive">ไม่ใช้งาน</option>
                    </select>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 text-sm">
                                <th className="py-3 px-4 font-medium">ลูกค้า</th>
                                <th className="py-3 px-4 font-medium">ติดต่อ</th>
                                <th className="py-3 px-4 font-medium">วันที่สมัคร</th>
                                <th className="py-3 px-4 font-medium">ยอดสั่งซื้อ</th>
                                <th className="py-3 px-4 font-medium">ยอดเงิน</th>
                                <th className="py-3 px-4 font-medium">สถานะ</th>
                                <th className="py-3 px-4 font-medium text-right">การกระทำ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-4">
                                        {editingCustomer?.id === customer.id ? (
                                            <input
                                                type="text"
                                                value={editingCustomer.name}
                                                onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                                                className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                                            />
                                        ) : (
                                            <div className="font-medium text-gray-900">{customer.name}</div>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        {editingCustomer?.id === customer.id ? (
                                            <div className="space-y-1">
                                                <input
                                                    type="email"
                                                    value={editingCustomer.email}
                                                    onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                                                    className="text-gray-800 border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                                />
                                                <input
                                                    type="tel"
                                                    value={editingCustomer.phone}
                                                    onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                                                    className="text-gray-600 border border-gray-300 rounded px-2 py-1 text-sm w-full"
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="text-gray-800">{customer.email}</div>
                                                <div className="text-sm text-gray-600">{customer.phone}</div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-gray-600">{customer.joinedDate}</td>
                                    <td className="py-4 px-4">
                                        {editingCustomer?.id === customer.id ? (
                                            <input
                                                type="number"
                                                value={editingCustomer.totalOrders}
                                                onChange={(e) => setEditingCustomer({...editingCustomer, totalOrders: Number(e.target.value)})}
                                                className="text-gray-600 border border-gray-300 rounded px-2 py-1 w-16"
                                            />
                                        ) : (
                                            <span className="text-gray-600">{customer.totalOrders}</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        {editingCustomer?.id === customer.id ? (
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={editingCustomer.totalSpent}
                                                onChange={(e) => setEditingCustomer({...editingCustomer, totalSpent: Number(e.target.value)})}
                                                className="font-medium text-gray-800 border border-gray-300 rounded px-2 py-1 w-24"
                                            />
                                        ) : (
                                            <span className="font-medium text-gray-800">${customer.totalSpent.toLocaleString()}</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        {editingCustomer?.id === customer.id ? (
                                            <select
                                                value={editingCustomer.status}
                                                onChange={(e) => setEditingCustomer({
                                                    ...editingCustomer, 
                                                    status: e.target.value as Customer['status']
                                                })}
                                                className="border border-gray-300 rounded px-2 py-1 text-xs"
                                            >
                                                <option value="Active">ใช้งาน</option>
                                                <option value="Inactive">ไม่ใช้งาน</option>
                                            </select>
                                        ) : (
                                            <button
                                                onClick={() => toggleCustomerStatus(customer.id)}
                                                className={`py-1 px-3 rounded-full text-xs font-semibold transition-colors ${getStatusColor(customer.status)} hover:opacity-80`}
                                            >
                                                {getStatusText(customer.status)}
                                            </button>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            {editingCustomer?.id === customer.id ? (
                                                <>
                                                    <button 
                                                        onClick={handleSaveEdit}
                                                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => setEditingCustomer(null)}
                                                        className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={() => setSelectedCustomer(customer)}
                                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="ดูรายละเอียด"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleEditCustomer(customer)}
                                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                        title="แก้ไข"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteCustomer(customer.id)}
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
                
                {filteredCustomers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        ไม่พบข้อมูลลูกค้าที่ตรงกับเงื่อนไขการค้นหา
                    </div>
                )}
            </div>

            {/* Customer Detail Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">รายละเอียดลูกค้า</h3>
                            <button 
                                onClick={() => setSelectedCustomer(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="space-y-6">
                            {/* Customer Info */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">{selectedCustomer.name}</h4>
                                        <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColor(selectedCustomer.status)}`}>
                                            {getStatusText(selectedCustomer.status)}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">{selectedCustomer.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">สมัครเมื่อ: {selectedCustomer.joinedDate}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-700">📞 {selectedCustomer.phone}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-700">📍 {selectedCustomer.address}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4 text-center">
                                    <ShoppingBag className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                    <p className="text-2xl font-bold text-blue-600">{selectedCustomer.totalOrders}</p>
                                    <p className="text-sm text-gray-600">คำสั่งซื้อทั้งหมด</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4 text-center">
                                    <span className="text-2xl">💰</span>
                                    <p className="text-2xl font-bold text-green-600">${selectedCustomer.totalSpent.toLocaleString()}</p>
                                    <p className="text-sm text-gray-600">ยอดซื้อรวม</p>
                                </div>
                            </div>

                            {/* Toggle Status */}
                            <div className="flex justify-center">
                                <button
                                    onClick={() => {
                                        toggleCustomerStatus(selectedCustomer.id);
                                        setSelectedCustomer({
                                            ...selectedCustomer, 
                                            status: selectedCustomer.status === 'Active' ? 'Inactive' : 'Active'
                                        });
                                    }}
                                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                                        selectedCustomer.status === 'Active'
                                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    }`}
                                >
                                    {selectedCustomer.status === 'Active' ? 'ปิดการใช้งาน' : 'เปิดการใช้งาน'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Customer Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-900">เพิ่มลูกค้าใหม่</h3>
                            <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อลูกค้า *</label>
                                <input
                                    type="text"
                                    value={newCustomer.name || ''}
                                    onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="กรอกชื่อลูกค้า"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">อีเมล *</label>
                                <input
                                    type="email"
                                    value={newCustomer.email || ''}
                                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="กรอกอีเมล"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทร</label>
                                <input
                                    type="tel"
                                    value={newCustomer.phone || ''}
                                    onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="กรอกเบอร์โทร"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
                                <textarea
                                    value={newCustomer.address || ''}
                                    onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="กรอกที่อยู่"
                                    rows={2}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">วันที่สมัคร</label>
                                <input
                                    type="date"
                                    value={newCustomer.joinedDate || ''}
                                    onChange={(e) => setNewCustomer({...newCustomer, joinedDate: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">สถานะ</label>
                                <select
                                    value={newCustomer.status || 'Active'}
                                    onChange={(e) => setNewCustomer({...newCustomer, status: e.target.value as Customer['status']})}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Active">ใช้งาน</option>
                                    <option value="Inactive">ไม่ใช้งาน</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={handleAddCustomer}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                เพิ่มลูกค้า
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
                            <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">ลูกค้าทั้งหมด</p>
                            <p className="text-xl font-bold text-gray-900">{customers.length}</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">ลูกค้าที่ใช้งาน</p>
                            <p className="text-xl font-bold text-gray-900">
                                {customers.filter(c => c.status === 'Active').length}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">ลูกค้าไม่ใช้งาน</p>
                            <p className="text-xl font-bold text-gray-900">
                                {customers.filter(c => c.status === 'Inactive').length}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">ยอดขายรวม</p>
                            <p className="text-xl font-bold text-gray-900">
                                ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomersTab;