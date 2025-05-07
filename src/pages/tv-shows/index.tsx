import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';

import MovieCard from '../../components/MovieCard';
import { getTrending, Movie } from '../../api/tmdbApi';

export default function TVShowsPage() {
  const [tvShows, setTVShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        const results = await getTrending('tv', 'week');
        setTVShows(results);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching TV shows:', err);
        setError('Failed to fetch TV shows. Please try again later.');
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  return (
    <>
      <Head>
        <title>Popular TV Shows - Found404</title>
        <meta name="description" content="Browse trending and popular TV series" />
      </Head>

      <div className="space-y-8">
        {/* Header */}
        <section className="relative py-16 bg-gradient-to-r from-secondary-700 to-secondary-900 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-opacity-50 glass-card"></div>
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Popular TV Shows</h1>
            <p className="text-xl max-w-3xl">
              Discover the most popular and trending TV series right now. Updated weekly with fresh content.
            </p>
          </div>
        </section>

        {/* TV Shows Grid */}
        <section>
          {loading ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
              <FaSpinner className="text-4xl animate-spin mb-4" />
              <p>Loading TV shows...</p>
            </div>
          ) : error ? (
            <div className="min-h-[30vh] flex items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : tvShows.length === 0 ? (
            <div className="min-h-[30vh] flex items-center justify-center">
              <p>No TV shows found. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {tvShows.map((show: Movie) => (
                <MovieCard key={show.id} movie={show} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
} 