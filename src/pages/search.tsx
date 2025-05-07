import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaSpinner, FaFilm, FaTv } from 'react-icons/fa';

import MovieCard from '../components/MovieCard';
import { searchMedia, Movie } from '../api/tmdbApi';

export default function SearchPage() {
  const router = useRouter();
  const { q } = router.query;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mediaType, setMediaType] = useState<'all' | 'movie' | 'tv'>('all');
  
  // Set search query from URL
  useEffect(() => {
    if (q && typeof q === 'string') {
      setSearchQuery(q);
    }
  }, [q]);
  
  // Perform search when query changes
  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
    
    const performSearch = async () => {
      try {
        setLoading(true);
        setError('');
        
        const searchResults = await searchMedia(searchQuery);
        
        // Filter results based on media type
        let filteredResults = searchResults;
        if (mediaType !== 'all') {
          filteredResults = searchResults.filter((item: Movie) => item.media_type === mediaType);
        }
        
        setResults(filteredResults);
        setLoading(false);
      } catch (err) {
        console.error('Error searching:', err);
        setError('Failed to search. Please try again.');
        setLoading(false);
      }
    };
    
    performSearch();
  }, [searchQuery, mediaType]);
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search query
    router.push({
      pathname: '/search',
      query: { q: searchQuery },
    }, undefined, { shallow: true });
  };
  
  // Handle media type filter change
  const handleMediaTypeChange = (type: 'all' | 'movie' | 'tv') => {
    setMediaType(type);
  };
  
  return (
    <div className="space-y-8">
      <section className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Movies & TV Shows</h1>
        
        <form 
          onSubmit={handleSearch}
          className="glass-card p-3 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Search for a movie or TV show..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="flex-grow bg-transparent border-none outline-none p-2"
          />
          <button 
            type="submit"
            className="bg-gradient-to-r from-primary-600 to-primary-700 p-3 rounded-md"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : <FaSearch />}
          </button>
        </form>
      </section>
      
      {/* Filters */}
      {results.length > 0 && (
        <section className="flex gap-4">
          <button
            onClick={() => handleMediaTypeChange('all')}
            className={`custom-btn ${mediaType === 'all' ? 'bg-white/20' : ''}`}
          >
            All Results
          </button>
          <button
            onClick={() => handleMediaTypeChange('movie')}
            className={`custom-btn flex items-center gap-2 ${mediaType === 'movie' ? 'bg-white/20' : ''}`}
          >
            <FaFilm /> Movies Only
          </button>
          <button
            onClick={() => handleMediaTypeChange('tv')}
            className={`custom-btn flex items-center gap-2 ${mediaType === 'tv' ? 'bg-white/20' : ''}`}
          >
            <FaTv /> TV Shows Only
          </button>
        </section>
      )}
      
      {/* Results */}
      <section>
        {loading ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <FaSpinner className="text-4xl animate-spin mb-4" />
            <p>Searching for "{searchQuery}"...</p>
          </div>
        ) : error ? (
          <div className="min-h-[30vh] flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : results.length === 0 && searchQuery ? (
          <div className="min-h-[30vh] flex items-center justify-center">
            <p>No results found for "{searchQuery}". Try a different search term.</p>
          </div>
        ) : results.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">
              Search Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {results.map((item: Movie) => (
                <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
              ))}
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
} 