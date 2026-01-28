'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { sites, skus, MonthlyVolumeData } from '@/lib/data';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'] as const;

export default function VolumeInputPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const site = sites.find((s) => s.id === id);

  // Initialize data for all SKUs
  const [volumeData, setVolumeData] = useState<MonthlyVolumeData[]>(
    skus.map((sku) => ({
      siteId: id,
      sku,
      jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0,
      jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0,
      unit: 'tons' as const,
      notes: '',
    }))
  );

  const handleValueChange = (skuIndex: number, month: typeof monthKeys[number], value: string) => {
    const newData = [...volumeData];
    newData[skuIndex][month] = parseFloat(value) || 0;
    setVolumeData(newData);
  };

  const getRowTotal = (skuIndex: number) => {
    return monthKeys.reduce((sum, month) => sum + volumeData[skuIndex][month], 0);
  };

  const getMonthTotal = (month: typeof monthKeys[number]) => {
    return volumeData.reduce((sum, row) => sum + row[month], 0);
  };

  const handleSave = () => {
    console.log('Saving data:', volumeData);
    alert('Data saved successfully!');
  };

  if (!site) return <div>Site not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-4 border-[#ED1C24]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href={`/site/${id}`} className="text-[#ED1C24] hover:text-red-700 text-sm font-medium">
            ← Back to {site.name}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Bulk Volume Input</h1>
          <p className="mt-1 text-sm text-gray-500">
            {site.name} - {site.location} | All values in <strong>tons per month</strong>
          </p>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-[#ED1C24] text-white rounded-lg hover:bg-red-700 transition font-medium"
          >
            💾 Save All Changes
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
            📥 Import Excel
          </button>
          <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
            📤 Export Excel
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">
                  SKU / Product
                </th>
                {months.map((month) => (
                  <th key={month} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">
                    {month}
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50 min-w-[100px]">
                  Total (Year)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {volumeData.map((row, skuIndex) => (
                <tr key={row.sku} className="hover:bg-gray-50">
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                    {row.sku}
                  </td>
                  {monthKeys.map((month) => (
                    <td key={month} className="px-2 py-2 text-center">
                      <input
                        type="number"
                        value={row[month] || ''}
                        onChange={(e) => handleValueChange(skuIndex, month, e.target.value)}
                        className="w-full px-2 py-1 text-sm text-center border border-gray-300 rounded focus:ring-2 focus:ring-[#ED1C24] focus:border-[#ED1C24]"
                        placeholder="0"
                      />
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center text-sm font-bold text-gray-900 bg-blue-50">
                    {getRowTotal(skuIndex).toFixed(1)}
                  </td>
                </tr>
              ))}
              <tr className="bg-blue-50 font-bold">
                <td className="sticky left-0 z-10 bg-blue-50 px-6 py-4 text-sm uppercase text-gray-700">
                  Monthly Total
                </td>
                {monthKeys.map((month) => (
                  <td key={month} className="px-4 py-4 text-center text-sm text-gray-900">
                    {getMonthTotal(month).toFixed(1)}
                  </td>
                ))}
                <td className="px-6 py-4 text-center text-sm text-gray-900">
                  {monthKeys.reduce((sum, month) => sum + getMonthTotal(month), 0).toFixed(1)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> You can paste data directly from Excel. Click any cell and use Ctrl+V (Cmd+V on Mac).
          </p>
        </div>
      </main>
    </div>
  );
}
