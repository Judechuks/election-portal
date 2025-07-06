import { useState } from "react";
import {
  CogIcon,
  ShieldCheckIcon,
  BellIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import SecureCard from "../ui/SecureCard";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    requireReauth: true,
    resultDelay: "immediate",
    notificationLevel: "important",
    maxLoginAttempts: 5,
    sessionTimeout: 30,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>

      <SecureCard>
        <div className="p-6 space-y-8">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <CogIcon className="h-5 w-5 text-gray-500 mr-2" />
              System Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="requireReauth"
                    name="requireReauth"
                    type="checkbox"
                    checked={settings.requireReauth}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="requireReauth"
                    className="font-medium text-gray-700"
                  >
                    Require reauthentication for sensitive actions
                  </label>
                  <p className="text-gray-500">
                    Extra security step for critical operations
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="resultDelay"
                  className="block text-sm font-medium text-gray-700"
                >
                  Results Publication Delay
                </label>
                <select
                  id="resultDelay"
                  name="resultDelay"
                  value={settings.resultDelay}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="immediate">
                    Immediate (after voting closes)
                  </option>
                  <option value="1hour">1 hour delay</option>
                  <option value="24hours">24 hours delay</option>
                  <option value="manual">Manual publication</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="maxLoginAttempts"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Login Attempts
                </label>
                <input
                  type="number"
                  id="maxLoginAttempts"
                  name="maxLoginAttempts"
                  min="1"
                  max="10"
                  value={settings.maxLoginAttempts}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="sessionTimeout"
                  className="block text-sm font-medium text-gray-700"
                >
                  Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  min="5"
                  max="240"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </SecureCard>

      <SecureCard>
        <div className="p-6 space-y-8">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <ShieldCheckIcon className="h-5 w-5 text-gray-500 mr-2" />
              Security Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password Requirements
              </label>
              <div className="mt-2 space-y-2">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="requireSpecialChar"
                      name="requireSpecialChar"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="requireSpecialChar"
                      className="font-medium text-gray-700"
                    >
                      Require special character
                    </label>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="requireNumber"
                      name="requireNumber"
                      type="checkbox"
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="requireNumber"
                      className="font-medium text-gray-700"
                    >
                      Require number
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="passwordExpiry"
                className="block text-sm font-medium text-gray-700"
              >
                Password Expiry
              </label>
              <select
                id="passwordExpiry"
                name="passwordExpiry"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>
      </SecureCard>

      <div className="flex justify-end">
        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
