'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sites, skus } from '@/lib/data';
import { useParams } from 'next/navigation';

export default function SitePage() {
  const params = useParams();
  const siteId = params.id as string;
  const site = sites.find((s) => s.id === siteId);

  const [formData, setFormData] = useState({
    product: skus[0],
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    capacityUtilization: '',
    notes: '',
  });

  const [saved, setSaved] = useState(false);

  if (!site) {
    return <div>Site not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getWaterRiskColor = (risk: number) => {
    if (risk >= 4) return 'text-red-600 bg-red-50';
    if (risk === 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const totalVolume =
    (parseInt(formData.q1) || 0) +
    (parseInt(formData.q2) || 0) +
    (parseInt(formData.q3) || 0) +
    (parseInt(formData.q4) || 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-4 border-[#ED1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-[#ED1C24] hover:text-red-700 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{site.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {site.location} • {site.region}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Status</h3>
            <p className="mt-2 text-xl font-semibold text-gray-900">{site.status}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Product Categories</h3>
            <p className="mt-2 text-xl font-semibold text-gray-900">{site.products}</p>
          </div>
          <div className={`rounded-lg shadow p-6 ${getWaterRiskColor(site.waterRisk)}`}>
            <h3 className="text-sm font-medium uppercase">Water Risk Score</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-2xl">{'💧'.repeat(site.waterRisk)}</span>
              <span className="text-xl font-bold">{site.waterRisk}/5</span>
            </div>
            {site.waterRisk >= 4 && (
              <p className="mt-2 text-sm font-medium">⚠️ High risk - Monitor closely</p>
            )}
          </div>
        </div>

        {site.waterRisk >= 4 && totalVolume > 400000 && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Sustainability Alert: High Volume + High Water Risk
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  This site has high planned volumes ({totalVolume.toLocaleString()} units) in a
                  high water-risk area. Consider capacity redistribution or water efficiency
                  measures.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Volume Planning</h2>

          {saved && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              ✓ Volume data saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product SKU
                </label>
                <select
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                >
                  {skus.map((product) => (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Q1 Volume (units)
                  </label>
                  <input
                    type="number"
                    value={formData.q1}
                    onChange={(e) => setFormData({ ...formData, q1: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Q2 Volume (units)
                  </label>
                  <input
                    type="number"
                    value={formData.q2}
                    onChange={(e) => setFormData({ ...formData, q2: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Q3 Volume (units)
                  </label>
                  <input
                    type="number"
                    value={formData.q3}
                    onChange={(e) => setFormData({ ...formData, q3: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Q4 Volume (units)
                  </label>
                  <input
                    type="number"
                    value={formData.q4}
                    onChange={(e) => setFormData({ ...formData, q4: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    placeholder="0"
                  />
                </div>
              </div>

              {totalVolume > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    Total Annual Volume: {totalVolume.toLocaleString()} units
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity Utilization (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.capacityUtilization}
                  onChange={(e) =>
                    setFormData({ ...formData, capacityUtilization: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                  placeholder="0-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                  placeholder="Add any relevant notes or comments..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#ED1C24] text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Save & Submit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      product: skus[0],
                      q1: '',
                      q2: '',
                      q3: '',
                      q4: '',
                      capacityUtilization: '',
                      notes: '',
                    })
                  }
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Carbon Intensity (Coming Soon)
          </h3>
          <p className="text-gray-500">
            Carbon emissions tracking and reporting will be integrated in the next release.
          </p>
        </div>
      </main>
    </div>
  );
}
