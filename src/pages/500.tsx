import React from 'react';
import Link from 'next/link';
import { FaHome, FaRedo } from 'react-icons/fa';

export default function Custom500() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <h2 className="text-2xl font-semibold mb-6">Server Error</h2>
      <p className="text-lg mb-8 max-w-md">
        We're sorry, but something went wrong on our end. 
        Our team has been notified and we're working to fix the issue.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="custom-btn flex items-center justify-center gap-2">
          <FaHome /> Go to Homepage
        </Link>
        <button 
          onClick={() => window.location.reload()}
          className="custom-btn flex items-center justify-center gap-2"
        >
          <FaRedo /> Try Again
        </button>
      </div>
    </div>
  );
} 