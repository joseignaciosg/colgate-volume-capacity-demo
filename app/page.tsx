'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sites } from '@/lib/data';

export default function Home() {
  const [expandedWaterRisk, setExpandedWaterRisk] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Needs Review':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getWaterRiskColor = (risk: number) => {
    if (risk >= 4) return 'text-red-500';
    if (risk === 3) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getWaterRiskLabel = (risk: number) => {
    if (risk >= 4) return 'High';
    if (risk === 3) return 'Medium';
    return 'Low';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b-4 border-[#ED1C24]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Colgate Volume & Capacity Planning
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manufacturing Sites Overview
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/puts-takes"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Puts & Takes
              </Link>
              <Link
                href="/consolidation"
                className="px-4 py-2 bg-[#ED1C24] text-white rounded-lg hover:bg-red-700 transition"
              >
                Consolidation View
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Site Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Categories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1 justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                    Risk
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sites.map((site) => (
                <tr key={site.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {site.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{site.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {site.region}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{site.products}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        site.status
                      )}`}
                    >
                      {site.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center relative">
                    <button
                      onClick={() => setExpandedWaterRisk(expandedWaterRisk === site.id ? null : site.id)}
                      className={`inline-flex items-center gap-1 text-sm font-medium ${getWaterRiskColor(site.waterRisk)} hover:opacity-75 transition`}
                      title="Click for details"
                    >
                      <span className="text-base">💧</span>
                      <span>{site.waterRisk}</span>
                    </button>
                    {expandedWaterRisk === site.id && (
                      <div className="absolute z-10 right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border p-3 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <span>{'💧'.repeat(site.waterRisk)}</span>
                          <span className={`text-sm font-bold ${getWaterRiskColor(site.waterRisk)}`}>
                            {getWaterRiskLabel(site.waterRisk)} Risk
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {site.waterRisk >= 4 && 'High water stress area. Monitor closely.'}
                          {site.waterRisk === 3 && 'Moderate water stress. Review mitigation plans.'}
                          {site.waterRisk < 3 && 'Low water stress. Continue monitoring.'}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedWaterRisk(null);
                          }}
                          className="mt-2 text-xs text-gray-400 hover:text-gray-600"
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      href={`/site/${site.id}`}
                      className="text-[#ED1C24] hover:text-red-700 font-medium"
                    >
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Total Sites
            </h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{sites.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              High Water Risk Sites
            </h3>
            <p className="mt-2 text-3xl font-bold text-red-600">
              {sites.filter((s) => s.waterRisk >= 4).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 uppercase">
              Needs Review
            </h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {sites.filter((s) => s.status === 'Needs Review').length}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
