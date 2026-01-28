'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sites, skus } from '@/lib/data';
import { useParams } from 'next/navigation';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

// Unit conversion factors to tons
const unitConversions: { [key: string]: number } = {
  tons: 1,
  cases: 0.02, // 1 case = ~20kg = 0.02 tons
  liters: 0.001, // 1 liter = ~1kg = 0.001 tons
  units: 0.0005, // 1 unit = ~0.5kg
};

interface SKUVolume {
  id: string;
  sku: string;
  unit: string;
  volumes: { [key: string]: string };
  maxCapacity: string;
}

export default function SitePage() {
  const params = useParams();
  const siteId = params.id as string;
  const site = sites.find((s) => s.id === siteId);

  const [frequencyMode, setFrequencyMode] = useState<'monthly' | 'quarterly'>('monthly');
  const [showWaterRiskDetails, setShowWaterRiskDetails] = useState(false);

  const periods = frequencyMode === 'monthly' ? months : quarters;

  const createEmptySKURow = (): SKUVolume => ({
    id: Math.random().toString(36).substr(2, 9),
    sku: skus[0],
    unit: 'tons',
    maxCapacity: '',
    volumes: periods.reduce((acc, m) => ({ ...acc, [m]: '' }), {}),
  });

  const [skuRows, setSkuRows] = useState<SKUVolume[]>([createEmptySKURow()]);
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

  const updateUnit = (id: string, unit: string) => {
    setSkuRows(skuRows.map((row) => (row.id === id ? { ...row, unit } : row)));
  };

  const updateMaxCapacity = (id: string, maxCapacity: string) => {
    setSkuRows(skuRows.map((row) => (row.id === id ? { ...row, maxCapacity } : row)));
  };

  const updateVolume = (id: string, period: string, value: string) => {
    setSkuRows(
      skuRows.map((row) =>
        row.id === id ? { ...row, volumes: { ...row.volumes, [period]: value } } : row
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const getWaterRiskColor = (risk: number) => {
    if (risk >= 4) return 'text-red-600';
    if (risk === 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getWaterRiskBgColor = (risk: number) => {
    if (risk >= 4) return 'bg-red-50';
    if (risk === 3) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  // Calculate row total in original units
  const calculateRowTotal = (row: SKUVolume): number => {
    return Object.values(row.volumes).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
  };

  // Convert to tons
  const convertToTons = (value: number, unit: string): number => {
    return value * (unitConversions[unit] || 1);
  };

  // Calculate capacity utilization %
  const calculateUtilization = (row: SKUVolume): number => {
    const total = calculateRowTotal(row);
    const maxCap = parseFloat(row.maxCapacity) || 0;
    if (maxCap === 0) return 0;
    return (total / maxCap) * 100;
  };

  const getUtilizationColor = (utilization: number): string => {
    if (utilization > 90) return 'text-red-600 bg-red-100';
    if (utilization > 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const totalVolumeInTons = skuRows.reduce((sum, row) => {
    const rowTotal = calculateRowTotal(row);
    return sum + convertToTons(rowTotal, row.unit);
  }, 0);

  const clearForm = () => {
    setSkuRows([createEmptySKURow()]);
    setNotes('');
  };

  const handleFrequencyChange = (mode: 'monthly' | 'quarterly') => {
    setFrequencyMode(mode);
    // Reset volumes when changing frequency
    setSkuRows(skuRows.map(row => ({
      ...row,
      volumes: (mode === 'monthly' ? months : quarters).reduce((acc, m) => ({ ...acc, [m]: '' }), {}),
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-4 border-[#ED1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-[#ED1C24] hover:text-red-700 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <div className="flex justify-between items-start mt-2">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{site.name}</h1>
              <p className="mt-1 text-sm text-gray-500">
                {site.location} • {site.region}
              </p>
            </div>
            {/* Subtle Water Risk Icon */}
            <div className="relative">
              <button
                onClick={() => setShowWaterRiskDetails(!showWaterRiskDetails)}
                className={`p-2 rounded-lg hover:bg-gray-100 transition ${getWaterRiskColor(site.waterRisk)}`}
                title="Click to see water risk details"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-400 text-white text-xs rounded-full flex items-center justify-center">
                  {site.waterRisk}
                </span>
              </button>
              {showWaterRiskDetails && (
                <div className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg p-4 z-10 ${getWaterRiskBgColor(site.waterRisk)}`}>
                  <h4 className="font-medium text-gray-900 mb-2">Water Risk Score</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{'💧'.repeat(site.waterRisk)}</span>
                    <span className={`font-bold ${getWaterRiskColor(site.waterRisk)}`}>{site.waterRisk}/5</span>
                  </div>
                  {site.waterRisk >= 4 && (
                    <p className="text-sm text-red-700">⚠️ High risk area - Monitor closely</p>
                  )}
                  {site.waterRisk === 3 && (
                    <p className="text-sm text-yellow-700">⚡ Medium risk - Review mitigation plans</p>
                  )}
                  {site.waterRisk < 3 && (
                    <p className="text-sm text-green-700">✓ Low risk - Continue monitoring</p>
                  )}
                  <button
                    onClick={() => setShowWaterRiskDetails(false)}
                    className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
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
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Volume (tons)</h3>
            <p className="mt-2 text-xl font-semibold text-blue-600">{totalVolumeInTons.toFixed(1)}</p>
          </div>
        </div>

        {site.waterRisk >= 4 && totalVolumeInTons > 5000 && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Sustainability Alert: High Volume + High Water Risk
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  This site has high planned volumes ({totalVolumeInTons.toLocaleString()} tons) in a
                  high water-risk area. Consider capacity redistribution or water efficiency measures.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Volume Planning</h2>
            <div className="flex items-center gap-4">
              {/* Frequency Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => handleFrequencyChange('monthly')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                    frequencyMode === 'monthly'
                      ? 'bg-white shadow text-[#ED1C24]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => handleFrequencyChange('quarterly')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition ${
                    frequencyMode === 'quarterly'
                      ? 'bg-white shadow text-[#ED1C24]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Quarterly
                </button>
              </div>
              <div className="text-sm text-gray-500">{skuRows.length}/20 SKUs</div>
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
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[150px]">
                        SKU
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[80px]">
                        Unit
                      </th>
                      {periods.map((period) => (
                        <th
                          key={period}
                          className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[60px]"
                        >
                          {period}
                        </th>
                      ))}
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                        Total
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[60px]">
                        Tons
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[70px]">
                        Max Cap
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b min-w-[60px]">
                        Util %
                      </th>
                      <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b w-[40px]">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {skuRows.map((row, index) => {
                      const rowTotal = calculateRowTotal(row);
                      const rowTons = convertToTons(rowTotal, row.unit);
                      const utilization = calculateUtilization(row);
                      return (
                        <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-3 py-2 border-b">
                            <select
                              value={row.sku}
                              onChange={(e) => updateSKU(row.id, e.target.value)}
                              className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-[#ED1C24] focus:border-[#ED1C24] bg-gray-50"
                            >
                              {skus.map((sku) => (
                                <option key={sku} value={sku}>{sku}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-1 py-2 border-b">
                            <select
                              value={row.unit}
                              onChange={(e) => updateUnit(row.id, e.target.value)}
                              className="w-full px-1 py-1.5 text-xs border border-gray-300 rounded focus:ring-[#ED1C24] focus:border-[#ED1C24] bg-gray-50"
                            >
                              <option value="tons">tons</option>
                              <option value="cases">cases</option>
                              <option value="liters">liters</option>
                              <option value="units">units</option>
                            </select>
                          </td>
                          {periods.map((period) => (
                            <td key={period} className="px-1 py-2 border-b">
                              <input
                                type="number"
                                step="0.1"
                                min="0"
                                value={row.volumes[period] || ''}
                                onChange={(e) => updateVolume(row.id, period, e.target.value)}
                                className="w-full px-1 py-1.5 text-sm text-center border border-gray-300 rounded focus:ring-[#ED1C24] focus:border-[#ED1C24] bg-gray-50"
                                placeholder="0"
                              />
                            </td>
                          ))}
                          <td className="px-2 py-2 border-b text-center font-medium text-sm">
                            {rowTotal.toFixed(1)}
                          </td>
                          <td className="px-2 py-2 border-b text-center text-sm text-blue-600 font-medium">
                            {rowTons.toFixed(1)}
                          </td>
                          <td className="px-1 py-2 border-b">
                            <input
                              type="number"
                              min="0"
                              value={row.maxCapacity}
                              onChange={(e) => updateMaxCapacity(row.id, e.target.value)}
                              className="w-full px-1 py-1.5 text-sm text-center border border-gray-300 rounded focus:ring-[#ED1C24] focus:border-[#ED1C24] bg-gray-50"
                              placeholder="Max"
                            />
                          </td>
                          <td className="px-2 py-2 border-b text-center">
                            {row.maxCapacity && (
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getUtilizationColor(utilization)}`}>
                                {utilization.toFixed(0)}%
                              </span>
                            )}
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
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-blue-50 font-medium">
                      <td className="px-3 py-3 border-t text-sm text-blue-900" colSpan={2}>
                        Total (consolidated to tons)
                      </td>
                      {periods.map((period) => {
                        const periodTotal = skuRows.reduce((sum, row) => {
                          const val = parseFloat(row.volumes[period]) || 0;
                          return sum + convertToTons(val, row.unit);
                        }, 0);
                        return (
                          <td key={period} className="px-1 py-3 border-t text-center text-sm text-blue-900">
                            {periodTotal > 0 ? periodTotal.toFixed(1) : '-'}
                          </td>
                        );
                      })}
                      <td className="px-2 py-3 border-t text-center text-blue-900">-</td>
                      <td className="px-2 py-3 border-t text-center text-blue-900 font-bold">
                        {totalVolumeInTons.toFixed(1)}
                      </td>
                      <td className="px-2 py-3 border-t" colSpan={3}></td>
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

              {/* Notes */}
              <div className="pt-4 border-t">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#ED1C24] focus:border-[#ED1C24] bg-gray-50 placeholder-gray-500"
                  placeholder="Add any relevant notes..."
                />
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
      </main>
    </div>
  );
}
