'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockPutsTakes, sites, skus } from '@/lib/data';

export default function PutsTakesPage() {
  const [entries, setEntries] = useState(mockPutsTakes);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    siteId: sites[0].id,
    sku: skus[0],
    reason: 'Product transfer' as const,
    oldValue: '',
    newValue: '',
    requestedBy: '',
  });

  const reasons = ['Product transfer', 'Capacity expansion', 'Demand change', 'Supply issue'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      id: (entries.length + 1).toString(),
      siteId: formData.siteId,
      sku: formData.sku,
      date: new Date().toISOString().split('T')[0],
      reason: formData.reason,
      oldValue: parseInt(formData.oldValue),
      newValue: parseInt(formData.newValue),
      requestedBy: formData.requestedBy,
    };
    setEntries([newEntry, ...entries]);
    setShowForm(false);
    setFormData({
      siteId: sites[0].id,
      sku: skus[0],
      reason: 'Product transfer',
      oldValue: '',
      newValue: '',
      requestedBy: '',
    });
  };

  const getSiteName = (siteId: string) => {
    return sites.find((s) => s.id === siteId)?.name || siteId;
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'Product transfer':
        return 'bg-blue-100 text-blue-800';
      case 'Capacity expansion':
        return 'bg-green-100 text-green-800';
      case 'Demand change':
        return 'bg-yellow-100 text-yellow-800';
      case 'Supply issue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-4 border-[#ED1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-[#ED1C24] hover:text-red-700 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Puts & Takes Tracker</h1>
          <p className="mt-1 text-sm text-gray-500">Volume adjustment audit trail</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-[#ED1C24] text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            {showForm ? 'Cancel' : '+ Add Adjustment'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">New Volume Adjustment</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site</label>
                  <select
                    value={formData.siteId}
                    onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    required
                  >
                    {sites.map((site) => (
                      <option key={site.id} value={site.id}>
                        {site.name} - {site.location}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU / Product</label>
                  <select
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    required
                  >
                    {skus.map((sku) => (
                      <option key={sku} value={sku}>
                        {sku}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                  <select
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reason: e.target.value as typeof formData.reason,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    required
                  >
                    {reasons.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Old Value (units)
                  </label>
                  <input
                    type="number"
                    value={formData.oldValue}
                    onChange={(e) => setFormData({ ...formData, oldValue: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Value (units)
                  </label>
                  <input
                    type="number"
                    value={formData.newValue}
                    onChange={(e) => setFormData({ ...formData, newValue: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Requested By
                  </label>
                  <input
                    type="text"
                    value={formData.requestedBy}
                    onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#ED1C24] text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Log Adjustment
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Site
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU / Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Old Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.map((entry) => {
                const change = entry.newValue - entry.oldValue;
                const isIncrease = change > 0;
                return (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getSiteName(entry.siteId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getReasonColor(
                          entry.reason
                        )}`}
                      >
                        {entry.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.oldValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {entry.newValue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-sm font-medium ${
                          isIncrease ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {isIncrease ? '+' : ''}
                        {change.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.requestedBy}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Adjustments</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{entries.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Volume Increases</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {entries.filter((e) => e.newValue > e.oldValue).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Volume Decreases</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {entries.filter((e) => e.newValue < e.oldValue).length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
