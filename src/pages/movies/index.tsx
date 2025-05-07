import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';

import MovieCard from '../../components/MovieCard';
import { getTrending, Movie } from '../../api/tmdbApi';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const results = await getTrending('movie', 'week');
        setMovies(results);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <Head>
        <title>Popular Movies - Found404</title>
        <meta name="description" content="Browse trending and popular movies" />
      </Head>

      <div className="space-y-8">
        {/* Header */}
        <section className="relative py-16 bg-gradient-to-r from-primary-700 to-primary-900 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-opacity-50 glass-card"></div>
          <div className="relative z-10 container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Popular Movies</h1>
            <p className="text-xl max-w-3xl">
              Discover the most popular and trending movies right now. Updated weekly with fresh content.
            </p>
          </div>
        </section>

        {/* Movies Grid */}
        <section>
          {loading ? (
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
              <FaSpinner className="text-4xl animate-spin mb-4" />
              <p>Loading movies...</p>
            </div>
          ) : error ? (
            <div className="min-h-[30vh] flex items-center justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : movies.length === 0 ? (
            <div className="min-h-[30vh] flex items-center justify-center">
              <p>No movies found. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
} 