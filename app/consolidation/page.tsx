'use client';

import Link from 'next/link';
import { sites, mockVolumeData, products } from '@/lib/data';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function ConsolidationPage() {
  // Aggregate data by region
  const regionData = sites.reduce((acc, site) => {
    const existing = acc.find((item) => item.region === site.region);
    if (existing) {
      existing.siteCount += 1;
    } else {
      acc.push({
        region: site.region,
        siteCount: 1,
        plannedVolume: Math.floor(Math.random() * 500000) + 300000, // Mock data
      });
    }
    return acc;
  }, [] as { region: string; siteCount: number; plannedVolume: number }[]);

  // Product category data
  const productData = products.map((product) => ({
    product,
    volume: Math.floor(Math.random() * 400000) + 200000, // Mock data
    capacity: Math.floor(Math.random() * 30) + 60, // Mock capacity %
  }));

  const handleExportCSV = () => {
    const csvHeader = 'Region,Site Count,Planned Volume\n';
    const csvRows = regionData
      .map((row) => `${row.region},${row.siteCount},${row.plannedVolume}`)
      .join('\n');
    const csv = csvHeader + csvRows;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `colgate-consolidation-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-4 border-[#ED1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="text-[#ED1C24] hover:text-red-700 text-sm font-medium">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Consolidation View</h1>
          <p className="mt-1 text-sm text-gray-500">
            Aggregate volume planning across regions and products
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Regional Overview</h2>
          <button
            onClick={handleExportCSV}
            className="px-6 py-3 bg-[#ED1C24] text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export to CSV
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Planned Volume by Region
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="plannedVolume" fill="#ED1C24" name="Planned Volume (units)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Volume by Product Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="volume" fill="#2563eb" name="Volume (units)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Regional Summary</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Sites
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {regionData.map((row) => (
                  <tr key={row.region}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {row.region}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.siteCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.plannedVolume.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Product Summary</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Volume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Capacity %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productData.map((row) => (
                  <tr key={row.product}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.volume.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#ED1C24] h-2 rounded-full"
                            style={{ width: `${row.capacity}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{row.capacity}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Sites</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{sites.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Total Volume</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {regionData.reduce((sum, r) => sum + r.plannedVolume, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">Avg Capacity</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {Math.round(productData.reduce((sum, p) => sum + p.capacity, 0) / productData.length)}
              %
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">High Risk Sites</h3>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {sites.filter((s) => s.waterRisk >= 4).length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
