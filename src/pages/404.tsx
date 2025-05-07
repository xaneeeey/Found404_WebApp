import React from 'react';
import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';

export default function Custom404() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="custom-btn flex items-center justify-center gap-2">
          <FaHome /> Go to Homepage
        </Link>
        <Link href="/search" className="custom-btn flex items-center justify-center gap-2">
          <FaSearch /> Search for Movies
        </Link>
      </div>
    </div>
  );
} 