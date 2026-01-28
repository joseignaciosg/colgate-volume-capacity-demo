'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sites, skus } from '@/lib/data';
import { useParams } from 'next/navigation';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface SKUVolume {
  id: string;
  sku: string;
  volumes: { [key: string]: string };
}

export default function SitePage() {
  const params = useParams();
  const siteId = params.id as string;
  const site = sites.find((s) => s.id === siteId);

  const createEmptySKURow = (): SKUVolume => ({
    id: Math.random().toString(36).substr(2, 9),
    sku: skus[0],
    volumes: months.reduce((acc, m) => ({ ...acc, [m]: '' }), {}),
  });

  const [skuRows, setSkuRows] = useState<SKUVolume[]>([createEmptySKURow()]);
  const [capacityUtilization, setCapacityUtilization] = useState('');
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  if (!site) {
    return <div>Site not found</div>;
  }

  const addSKURow = () => {
    if (skuRows.length < 20) {
      setSkuRows([...skuRows, createEmptySKURow()]);
    }
  };

  const removeSKURow = (id: string) => {
    if (skuRows.length > 1) {
      setSkuRows(skuRows.filter((row) => row.id !== id));
    }
  };

  const updateSKU = (id: string, sku: string) => {
    setSkuRows(skuRows.map((row) => (row.id === id ? { ...row, sku } : row)));
  };

  const updateVolume = (id: string, month: string, value: string) => {
    setSkuRows(
      skuRows.map((row) =>
        row.id === id ? { ...row, volumes: { ...row.volumes, [month]: value } } : row
      )
    );
  };

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

  const calculateRowTotal = (row: SKUVolume): number => {
    return Object.values(row.volumes).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  };

  const totalVolume = skuRows.reduce((sum, row) => sum + calculateRowTotal(row), 0);

  const clearForm = () => {
    setSkuRows([createEmptySKURow()]);
    setCapacityUtilization('');
    setNotes('');
  };

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

        {site.waterRisk >= 4 && totalVolume > 5000 && (
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
                  This site has high planned volumes ({totalVolume.toLocaleString()} tons) in a
                  high water-risk area. Consider capacity redistribution or water efficiency
                  measures.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Volume Planning</h2>
            <div className="text-sm text-gray-500">
              {skuRows.length}/20 SKUs
            </div>
          </div>

          {saved && (
            <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              ✓ Volume data saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* SKU Volume Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[180px]">
                        SKU
                      </th>
                      {months.map((month) => (
                        <th
                          key={month}
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]"
                        >
                          {month}
                        </th>
                      ))}
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[80px]">
                        Total
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[50px]">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {skuRows.map((row, index) => (
                      <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2 border-b">
                          <select
                            value={row.sku}
                            onChange={(e) => updateSKU(row.id, e.target.value)}
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                          >
                            {skus.map((sku) => (
                              <option key={sku} value={sku}>
                                {sku}
                              </option>
                            ))}
                          </select>
                        </td>
                        {months.map((month) => (
                          <td key={month} className="px-1 py-2 border-b">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              value={row.volumes[month]}
                              onChange={(e) => updateVolume(row.id, month, e.target.value)}
                              className="w-full px-2 py-1.5 text-sm text-center border border-gray-300 rounded focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                              placeholder="0"
                            />
                          </td>
                        ))}
                        <td className="px-3 py-2 border-b text-center font-medium text-sm">
                          {calculateRowTotal(row).toFixed(1)}
                        </td>
                        <td className="px-2 py-2 border-b text-center">
                          {skuRows.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSKURow(row.id)}
                              className="text-red-500 hover:text-red-700 text-lg font-bold"
                              title="Remove SKU"
                            >
                              ×
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-blue-50 font-medium">
                      <td className="px-3 py-3 border-t text-sm text-blue-900">
                        Total (tons)
                      </td>
                      {months.map((month) => {
                        const monthTotal = skuRows.reduce(
                          (sum, row) => sum + (parseFloat(row.volumes[month]) || 0),
                          0
                        );
                        return (
                          <td key={month} className="px-1 py-3 border-t text-center text-sm text-blue-900">
                            {monthTotal > 0 ? monthTotal.toFixed(1) : '-'}
                          </td>
                        );
                      })}
                      <td className="px-3 py-3 border-t text-center text-blue-900 font-bold">
                        {totalVolume.toFixed(1)}
                      </td>
                      <td className="px-2 py-3 border-t"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Add SKU Button */}
              <div>
                <button
                  type="button"
                  onClick={addSKURow}
                  disabled={skuRows.length >= 20}
                  className="px-4 py-2 text-sm font-medium text-[#ED1C24] border border-[#ED1C24] rounded-lg hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  + Add SKU Row
                </button>
              </div>

              {/* Capacity & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity Utilization (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={capacityUtilization}
                    onChange={(e) => setCapacityUtilization(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    placeholder="0-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                    placeholder="Add any relevant notes..."
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#ED1C24] text-white rounded-lg hover:bg-red-700 transition font-medium"
                >
                  Save & Submit
                </button>
                <button
                  type="button"
                  onClick={clearForm}
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
