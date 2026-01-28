'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple auth - enhance with proper backend later
    if (username === 'ceci' && password === '17289ohldasjlhdaus7d891!') {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('username', username);
      router.push('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#ED1C24] rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
          <h1 className="text-3xl font-bold text-[#ED1C24]">Colgate</h1>
          <p className="text-gray-600 mt-2">Volume & Capacity Planning</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED1C24] focus:border-[#ED1C24]"
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ED1C24] focus:border-[#ED1C24]"
              placeholder="Enter password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#ED1C24] text-white py-3 rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Demo credentials: <span className="font-mono">colgate / colgate2024</span>
          </p>
        </div>
      </div>
    </div>
  );
}
