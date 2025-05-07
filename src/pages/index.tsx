import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaSearch, FaFilm, FaTv, FaSmile } from 'react-icons/fa';
import { useRouter } from 'next/router';

import MovieCard from '../components/MovieCard';
import MoodCard from '../components/MoodCard';
import { getTrending, Movie } from '../api/tmdbApi';

interface HomeProps {
  trendingMovies: Movie[];
  trendingTVShows: Movie[];
}

export const getStaticProps: GetStaticProps = async () => {
  const trendingAll = await getTrending('all', 'week');
  
  // Split results into movies and TV shows
  const trendingMovies = trendingAll
    .filter((item: any) => item.media_type === 'movie')
    .slice(0, 6);
  
  const trendingTVShows = trendingAll
    .filter((item: any) => item.media_type === 'tv')
    .slice(0, 6);
  
  return {
    props: {
      trendingMovies,
      trendingTVShows,
    },
    revalidate: 3600, // Revalidate every hour
  };
};

export default function Home({ trendingMovies, trendingTVShows }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  // Mood cards data
  const moodCards = [
    {
      mood: 'Happy',
      icon: 'happy',
      description: 'Comedies and feel-good movies to brighten your day',
    },
    {
      mood: 'Sad',
      icon: 'sad',
      description: 'Dramas and tearjerkers for a good emotional release',
    },
    {
      mood: 'Excited',
      icon: 'excited',
      description: 'Action-packed adventures to get your adrenaline pumping',
    },
    {
      mood: 'Scared',
      icon: 'scared',
      description: 'Spine-tingling horrors and thrillers for a frightful night',
    },
    {
      mood: 'Relaxed',
      icon: 'relaxed',
      description: 'Light-hearted and easy-watching content to unwind',
    },
    {
      mood: 'Bored',
      icon: 'bored',
      description: 'Exciting and engaging movies to break the monotony',
    },
    {
      mood: 'Romantic',
      icon: 'romantic',
      description: 'Love stories and rom-coms to make your heart flutter',
    },
    {
      mood: 'Thoughtful',
      icon: 'thoughtful',
      description: 'Thought-provoking dramas and documentaries',
    },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden rounded-xl -mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-light to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>
        <Image
          src="/placeholder-backdrop.jpg"
          alt="Hero image"
          fill
          priority
          className="object-cover"
        />
        
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find Your Perfect Movie Match
            </h1>
            <p className="text-xl mb-8">
              Discover movies and TV shows based on your mood or find similar content to your favorites.
            </p>
            
            {/* Search Bar */}
            <form 
              onSubmit={handleSearch}
              className="glass-card p-2 pr-4 flex items-center gap-2 max-w-md"
            >
              <input
                type="text"
                placeholder="Search for a movie or TV show..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent border-none outline-none p-2"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-primary-600 to-primary-700 p-2 rounded-md"
              >
                <FaSearch className="text-white" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
      
      {/* Quick Links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/movies" className="glass-card p-6 flex items-center gap-4 hover:bg-white/20 transition-all">
          <FaFilm className="text-primary-500 text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">Movies</h3>
            <p className="text-sm text-gray-300">Browse popular and trending movies</p>
          </div>
        </Link>
        
        <Link href="/tv-shows" className="glass-card p-6 flex items-center gap-4 hover:bg-white/20 transition-all">
          <FaTv className="text-primary-500 text-2xl" />
          <div>
            <h3 className="font-semibold text-lg">TV Shows</h3>
            <p className="text-sm text-gray-300">Discover series and episodes to binge</p>
          </div>
        </Link>
        
        {router.pathname !== "/mood" ? (
          <Link href="/mood" className="glass-card p-6 flex items-center gap-4 hover:bg-white/20 transition-all">
            <FaSmile className="text-primary-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg">Mood-Based</h3>
              <p className="text-sm text-gray-300">Find content that matches your mood</p>
            </div>
          </Link>
        ) : (
          <div className="glass-card p-6 flex items-center gap-4 bg-white/20">
            <FaSmile className="text-primary-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg">Mood-Based</h3>
              <p className="text-sm text-gray-300">Find content that matches your mood</p>
            </div>
          </div>
        )}
      </section>
      
      {/* Trending Movies */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Trending Movies</h2>
          <Link href="/movies" className="text-primary-400 hover:text-primary-300">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
      
      {/* Trending TV Shows */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Trending TV Shows</h2>
          <Link href="/tv-shows" className="text-primary-400 hover:text-primary-300">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingTVShows.map((show) => (
            <MovieCard key={show.id} movie={show} />
          ))}
        </div>
      </section>
      
      {/* Mood Selection */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Browse by Mood</h2>
          {router.pathname !== "/mood" && (
            <Link href="/mood" className="text-primary-400 hover:text-primary-300">
              View All
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moodCards.map((mood) => (
            <MoodCard
              key={mood.mood}
              mood={mood.mood}
              icon={mood.icon as any}
              description={mood.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
} 