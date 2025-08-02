'use client';

import React, { useState, useEffect, type JSX } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
    TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Package,
    Bell, Search, Filter, Download, Calendar, Eye, MessageSquare,
    Star, Activity, Zap, Target, Award, CreditCard, RefreshCw,
    ArrowUp, ArrowDown, MoreVertical, Settings, User, LogOut,
    Menu,
    X
} from 'lucide-react';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';
import CustomersTab from './CustomersTab';
import SettingsTab from './SettingsTab';
// TypeScript interfaces
interface SalesData {
    month: string;
    sales: number;
    orders: number;
    customers: number;
}

interface RevenueData {
    name: string;
    value: number;
    color: string;
}

interface Product {
    id: number;
    name: string;
    sales: number;
    revenue: number;
    trend: 'up' | 'down';
    image: string;
}

interface Activity {
    id: number;
    action: string;
    user: string;
    time: string;
    amount?: string | null;
    rating?: number;
}

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ElementType;
    color: string;
    trend: 'up' | 'down';
}

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
    actions?: boolean;
}

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isOpen: boolean; // เพิ่ม prop ใหม่สำหรับควบคุมการเปิด-ปิด
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Sample data
const salesData: SalesData[] = [
    { month: 'ม.ค.', sales: 4000, orders: 240, customers: 120 },
    { month: 'ก.พ.', sales: 3000, orders: 180, customers: 98 },
    { month: 'มี.ค.', sales: 5000, orders: 320, customers: 156 },
    { month: 'เม.ย.', sales: 4500, orders: 290, customers: 142 },
    { month: 'พ.ค.', sales: 6000, orders: 410, customers: 189 },
    { month: 'มิ.ย.', sales: 5500, orders: 370, customers: 178 },
];

const revenueData: RevenueData[] = [
    { name: 'อิเล็กทรอนิกส์', value: 35000, color: '#3B82F6' },
    { name: 'เสื้อผ้า', value: 28000, color: '#10B981' },
    { name: 'บ้านและสวน', value: 22000, color: '#F59E0B' },
    { name: 'กีฬา', value: 18000, color: '#EF4444' },
    { name: 'หนังสือ', value: 12000, color: '#8B5CF6' },
];

const topProducts: Product[] = [
    { id: 1, name: 'iPhone 15 Pro', sales: 156, revenue: 187200, trend: 'up', image: '📱' },
    { id: 2, name: 'MacBook Air M2', sales: 89, revenue: 106800, trend: 'up', image: '💻' },
    { id: 3, name: 'AirPods Pro', sales: 234, revenue: 58500, trend: 'down', image: '🎧' },
    { id: 4, name: 'iPad Pro', sales: 67, revenue: 53600, trend: 'up', image: '📲' },
    { id: 5, name: 'Apple Watch', sales: 134, revenue: 40200, trend: 'up', image: '⌚' },
];

const recentActivities: Activity[] = [
    { id: 1, action: 'สั่งซื้อใหม่', user: 'สมชาย ใจดี', time: '2 นาทีที่แล้ว', amount: '$299.99' },
    { id: 2, action: 'ลูกค้าใหม่', user: 'สมหญิง สวยงาม', time: '5 นาทีที่แล้ว', amount: null },
    { id: 3, action: 'คืนสินค้า', user: 'สมศักดิ์ ดีมาก', time: '10 นาทีที่แล้ว', amount: '-$150.00' },
    { id: 4, action: 'รีวิวใหม่', user: 'สมใจ รักสวย', time: '15 นาทีที่แล้ว', rating: 5 },
    { id: 5, action: 'สั่งซื้อใหม่', user: 'สมปอง เก่งดี', time: '20 นาทีที่แล้ว', amount: '$89.50' },
];

// React Components
const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color, trend }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                <div className="flex items-center mt-2">
                    {trend === 'up' ? (
                        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                        <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {change}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">จากเดือนที่แล้ว</span>
                </div>
            </div>
            <div className={`p-3 rounded-2xl ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    </div>
);

const ChartCard: React.FC<ChartCardProps> = ({ title, children, actions = false }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {actions && (
                <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            )}
        </div>
        {children}
    </div>
);

interface TopNavbarProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ setIsOpen }) => (
    <div className="bg-white shadow-sm border-b sticky top-0 z-20 border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                {/* ปุ่มเปิด/ปิด sidebar */}

                <Menu onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer md:hidden" />
                <h1 className='text-black font-bold'>
                    Dashboard
                </h1>
                {/* กล่องค้นหา */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2">
                    <Search className="w-4 h-4 text-gray-500 mr-2" />
                    <input
                        type="text"
                        placeholder="ค้นหา..."
                        className="bg-transparent border-none outline-none text-sm w-64"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="relative p-2  border-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        3
                    </span>
                </button>

                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">แอดมิน</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);




const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) => {

    const menuItems = [
        { id: 'overview', label: 'ภาพรวม', icon: Activity },
        { id: 'analytics', label: 'การวิเคราะห์', icon: BarChart },
        { id: 'products', label: 'สินค้า', icon: Package },
        { id: 'orders', label: 'คำสั่งซื้อ', icon: ShoppingCart },
        { id: 'customers', label: 'ลูกค้า', icon: Users },
        { id: 'settings', label: 'ตั้งค่า', icon: Settings },
    ];

    useEffect(() => {
        if (isOpen) {
            setIsOpen(prev => !prev)
        }
    }, [activeTab])

    return (
        <div className={`transform bg-black/10 md:bg-transparent transition-transform duration-300 ease-in-out w-full md:w-auto h-full fixed top-0 left-0 z-50                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                border-r border-gray-200 md:translate-x-0`}>
            <div
                className={`
                bg-white shadow-lg h-full md:w-64 w-80
            `}
            >
                <div className="p-6 border-b flex justify-between border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900">ShopAdmin</h2>
                            <p className="text-xs text-gray-500">v2.0</p>
                        </div>
                    </div>
                    <X className='md:hidden' onClick={() => setIsOpen(prev => !prev)} />
                </div>

                <nav className="mt-6">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-colors ${activeTab === item.id
                                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">ออกจากระบบ</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const OverviewTab: React.FC = () => (
    <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="ยอดขายรวม"
                value="$125,430"
                change="+12.5%"
                icon={DollarSign}
                color="bg-green-500"
                trend="up"
            />
            <StatCard
                title="คำสั่งซื้อ"
                value="1,234"
                change="+8.2%"
                icon={ShoppingCart}
                color="bg-blue-500"
                trend="up"
            />
            <StatCard
                title="ลูกค้าใหม่"
                value="856"
                change="-2.4%"
                icon={Users}
                color="bg-purple-500"
                trend="down"
            />
            <StatCard
                title="สินค้าในสต็อก"
                value="2,341"
                change="+15.3%"
                icon={Package}
                color="bg-orange-500"
                trend="up"
            />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="ยอดขายรายเดือน" actions>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="sales" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="รายได้ตามหมวดหมู่" actions>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={revenueData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                        >
                            {revenueData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'รายได้']} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Products */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">สินค้าขายดี</h3>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        ดูทั้งหมด
                    </button>
                </div>
                <div className="space-y-4">
                    {topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                                    {product.image}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-sm text-gray-500">{product.sales} ขาย</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-900">${product.revenue.toLocaleString()}</p>
                                <div className="flex items-center">
                                    {product.trend === 'up' ? (
                                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    ) : (
                                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                                    )}
                                    <span className={`text-sm ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                        #{index + 1}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">กิจกรรมล่าสุด</h3>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <RefreshCw className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
                <div className="space-y-4">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-grow">
                                <p className="text-sm font-medium text-gray-900">
                                    <span className="text-blue-600">{activity.user}</span> {activity.action}
                                </p>
                                <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                            {activity.amount && (
                                <span className={`text-sm font-semibold ${activity.amount.startsWith('-') ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                    {activity.amount}
                                </span>
                            )}
                            {activity.rating && (
                                <div className="flex items-center">
                                    {[...Array(activity.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const AnalyticsTab: React.FC = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">การวิเคราะห์ขั้นสูง</h2>
            <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>เลือกช่วงเวลา</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>ส่งออกรายงาน</span>
                </button>
            </div>
        </div>

        {/* Advanced Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="เปรียบเทียบยอดขายและคำสั่งซื้อ" actions>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="sales" fill="#3B82F6" opacity={0.8} />
                        <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="อัตราการเติบโตของลูกค้า" actions>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="customers" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                    </AreaChart>
                </ResponsiveContainer>
            </ChartCard>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-blue-100 text-sm">อัตราการแปลง</p>
                        <p className="text-3xl font-bold">12.8%</p>
                        <p className="text-blue-200 text-sm mt-1">+2.4% จากเดือนที่แล้ว</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-200" />
                </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-green-100 text-sm">มูลค่าเฉลี่ยต่อคำสั่งซื้อ</p>
                        <p className="text-3xl font-bold">$87.50</p>
                        <p className="text-green-200 text-sm mt-1">+$12.30 จากเดือนที่แล้ว</p>
                    </div>
                    <Award className="w-8 h-8 text-green-200" />
                </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-purple-100 text-sm">อัตราผู้ใช้ที่กลับมา</p>
                        <p className="text-3xl font-bold">64.2%</p>
                        <p className="text-purple-200 text-sm mt-1">+5.1% จากเดือนที่แล้ว</p>
                    </div>
                    <RefreshCw className="w-8 h-8 text-purple-200" />
                </div>
            </div>
        </div>
    </div>
);

export default function Dashboard(): JSX.Element {
    const [activeTab, setActiveTab] = useState<string>('overview');
    const [isOpen, setIsOpen] = useState(false);

    const renderContent = (): JSX.Element => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab />;
            case 'analytics':
                return <AnalyticsTab />;
            case 'products':
                return <ProductsTab />;
            case 'orders':
                return <OrdersTab />;
            case 'customers':
                return <CustomersTab />;
            case 'settings':
                return <SettingsTab />
            default:
                return <OverviewTab />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <div className="md:ml-64">
                <TopNavbar setIsOpen={setIsOpen} />

                <main className="p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}