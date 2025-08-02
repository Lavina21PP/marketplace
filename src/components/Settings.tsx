'use client';

import React, { useState, lazy, type JSX } from "react";
import {
  User,
  Bell,
  Eye,
  EyeOff,
  Shield,
  Save,
  Globe,
  Database,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Settings {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  paymentReminders: boolean;
  contractExpiry: boolean;
  maintenanceAlerts: boolean;
  language: string;
  timezone: string;
  currency: string;
  backupFrequency: string;
}

const Settings = () => {
  // State for managing the active tab
  const [activeTab, setActiveTab] = useState("profile");
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State for showing a loading indicator when saving
  const [isSaving, setIsSaving] = useState(false);
  // State for managing custom messages (success/error)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | null; text: string; } | null>(null);

  const [settings, setSettings] = useState<Settings>({
    // Profile Settings
    firstName: "Lavina",
    lastName: "Xaiyavong",
    email: "Lavina.xaiyavong@gmail.com",
    phone: "2097847101",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    contractExpiry: true,
    maintenanceAlerts: true,

    // System Settings
    language: "la",
    timezone: "Asia/Bangkok",
    currency: "THB",
    backupFrequency: "daily",
  });

  const tabs = [
    { id: "profile", label: "ຂໍ້ມູນສ່ວນຕົວ", icon: User },
    { id: "notifications", label: "ການແຈ້ງເຕືອນ", icon: Bell },
    { id: "security", label: "ຄວາມປອດໄພ", icon: Shield },
    { id: "system", label: "ລະບົບ", icon: Database },
  ];

  // Handles input changes for all settings fields
  const handleInputChange = (
    field: keyof Settings,
    value: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validates password fields before saving
  const validatePasswordFields = () => {
    // Clear any previous message
    setMessage(null);

    if (
      settings.newPassword &&
      settings.newPassword !== settings.confirmPassword
    ) {
      setMessage({ type: 'error', text: "ລະຫັດຜ່ານໃໝ່ກັບລະຫັດຢືນຢັນບໍ່ຕົງກັນ!" });
      return false;
    }
    if (settings.newPassword && settings.newPassword.length < 6) {
      setMessage({ type: 'error', text: "ລະຫັດຜ່ານໃໝ່ຕ້ອງມີຄວາມຍາວຢ່າງນ້ອຍ 6 ຕົວອັກສອນ!" });
      return false;
    }
    return true;
  };

  // Handles saving the settings
  const handleSave = async () => {
    if (!validatePasswordFields()) {
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Set a success message
      setMessage({ type: 'success', text: "ບັນທຶກການຕັ້ງຄ່າສຳເລັດແລ້ວ!" });

      // Clear password fields after successful save
      setSettings((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      // Set an error message
      setMessage({ type: 'error', text: "ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກ, ກະລຸນາລອງໃໝ່ອີກຄັ້ງ." });
    } finally {
      setIsSaving(false);
      // Automatically clear the message after 5 seconds
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  // Renders the message box
  const renderMessage = () => {
    if (!message) return null;
    const isSuccess = message.type === 'success';
    return (
      <div className={`p-4 rounded-lg shadow-md flex items-center mb-6 transition-all duration-300 ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {isSuccess ? <CheckCircle className="h-5 w-5 mr-2" /> : <XCircle className="h-5 w-5 mr-2" />}
        <span className="text-sm font-medium">{message.text}</span>
      </div>
    );
  };

  // Renders the profile tab content
  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <User className="h-5 w-5 mr-2 text-blue-600" />
          ຂໍ້ມູນສ່ວນຕົວ
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ຊື່
            </label>
            <input
              type="text"
              value={settings.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ນາມສະກຸນ
            </label>
            <input
              type="text"
              value={settings.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ອີເມວ:
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ເບີໂທລະສັບ:
            </label>
            <div className="relative">
              <Phone className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Renders the security tab content
  const renderSecurityTab = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-red-600" />
        ປ່ຽນລະຫັດຜ່ານ
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ລະຫັດຜ່ານປະຈຸບັນ
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={settings.currentPassword}
              onChange={(e) =>
                handleInputChange("currentPassword", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ລະຫັດຜ່ານໃໝ່
            </label>
            <input
              type="password"
              value={settings.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              minLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">
              ລະຫັດຜ່ານຕ້ອງມີຄວາມຍາວຢ່າງນ້ອຍ 6 ຕົວອັກສອນ
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ຢືນຢັນລະຫັດຜ່ານໃໝ່
            </label>
            <input
              type="password"
              value={settings.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                settings.newPassword &&
                settings.confirmPassword &&
                settings.newPassword !== settings.confirmPassword
                  ? "border-red-300"
                  : "border-gray-300"
              }`}
            />
            {settings.newPassword &&
              settings.confirmPassword &&
              settings.newPassword !== settings.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">ລະຫັດຜ່ານໃໝ່ບໍ່ຄືກັນ</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );

  // Renders the notifications tab content
  const renderNotificationsTab = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Bell className="h-5 w-5 mr-2 text-yellow-600" />
        ການແຈ້ງເຕືອນ
      </h3>
      <div className="space-y-4">
        {[
          {
            key: "emailNotifications",
            label: "ການແຈ້ງເຕືອນທາງອີເມວ",
            description: "ຮັບການແຈ້ງເຕືອນທາງອີເມວ",
          },
          {
            key: "smsNotifications",
            label: "ການແຈ້ງເຕືອນທາງ SMS",
            description: "ຮັບການແຈ້ງເຕືອນທາງ SMS",
          },
          {
            key: "paymentReminders",
            label: "ແຈ້ງເຕືອນການຊຳລະເງິນ",
            description: "ແຈ້ງເຕືອນກ່ອນຄົບກຳນົດຊຳລະເງິນ",
          },
          {
            key: "contractExpiry",
            label: "ແຈ້ງເຕືອນສັນຍາໝົດອາຍຸ",
            description: "ແຈ້ງເຕືອນກ່ອນສັນຍາໝົດອາຍຸ 30 ມື້",
          },
        ].map(({ key, label, description }) => (
          <div
            key={key}
            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-700 block">
                {label}
              </span>
              <span className="text-xs text-gray-500">{description}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                checked={settings[key as keyof Settings] as boolean}
                onChange={(e) =>
                  handleInputChange(key as keyof Settings, e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  // Renders the system tab content
  const renderSystemTab = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Database className="h-5 w-5 mr-2 text-purple-600" />
        ການຕັ້ງຄ່າລະບົບ
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ພາສາ
          </label>
          <div className="relative">
            <Globe className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <select
              value={settings.language}
              onChange={(e) => handleInputChange("language", e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="la">ລາວ</option>
              <option value="th">ไทย</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เขตเวลา
          </label>
          <select
            value={settings.timezone}
            onChange={(e) => handleInputChange("timezone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Bangkok">เอเชีย/กรุงเทพ</option>
            <option value="UTC">UTC</option>
            <option value="Asia/Tokyo">เอเชีย/โตเกียว</option>
            <option value="America/New_York">อเมริกา/นิวยอร์ก</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ສະກຸນເງິນ
          </label>
          <select
            value={settings.currency}
            onChange={(e) => handleInputChange("currency", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="KIP">ກີບ (KIP)</option>
            <option value="THB">ບາດ (THB)</option>
            <option value="USD">ດອນລ່າ (USD)</option>
            <option value="EUR">ຢູໂລ (EUR)</option>
            <option value="JPY">ເຍນ (JPY)</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Renders the correct content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "notifications":
        return renderNotificationsTab();
      case "security":
        return renderSecurityTab();
      case "system":
        return renderSystemTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div>
      <div className="min-h-[calc(100vh-64px)] bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">ການຕັ້ງຄ່າ</h1>
            <p className="text-gray-600">
              ຈັດການການຕັ້ງຄ່າສ່ວນຕົວ ແລະ ລະບົບ
            </p>
          </div>

          {/* Message Box */}
          {renderMessage()}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white shadow-lg transform scale-105"
                          : "text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm"
                      }`}
                    >
                      <tab.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-3/4">
              {renderContent()}

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 shadow-lg ${
                    isSaving
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  <Save
                    className={`h-5 w-5 ${isSaving ? "animate-spin" : ""}`}
                  />
                  <span>
                    {isSaving ? "ກຳລັງບັນທຶກ..." : "ບັນທຶກການຕັ້ງຄ່າ"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
