import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaClock, FaFilm, FaTv } from 'react-icons/fa';

import MovieCard from '../../components/MovieCard';
import { 
  getMediaDetails, 
  getMovieRecommendations, 
  getTvRecommendations, 
  Movie, 
  genreMap 
} from '../../api/tmdbApi';

interface Genre {
  id: number;
  name: string;
}

interface MediaDetails {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  runtime?: number;
  episode_run_time?: number[];
  genres: Genre[];
  tagline?: string;
  status: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  media_type: 'movie' | 'tv';
}

interface MediaDetailsProps {
  mediaDetails: MediaDetails;
  recommendations: Movie[];
  mediaType: 'movie' | 'tv';
}

interface Context {
  params?: {
    mediaType?: string;
    id?: string;
  };
}

export const getServerSideProps: GetServerSideProps = async (context: Context) => {
  const { mediaType, id } = context.params || {};
  
  // Validate mediaType
  if (mediaType !== 'movie' && mediaType !== 'tv') {
    return {
      notFound: true,
    };
  }
  
  // Get media details
  const mediaDetails = await getMediaDetails(Number(id), mediaType as 'movie' | 'tv');
  
  if (!mediaDetails) {
    return {
      notFound: true,
    };
  }
  
  // Get recommendations
  let recommendations = [];
  if (mediaType === 'movie') {
    recommendations = await getMovieRecommendations(Number(id));
  } else {
    recommendations = await getTvRecommendations(Number(id));
  }
  
  return {
    props: {
      mediaDetails,
      recommendations,
      mediaType,
    },
  };
};

export default function MediaDetailsPage({ mediaDetails, recommendations, mediaType }: MediaDetailsProps) {
  const [showFullOverview, setShowFullOverview] = useState(false);
  
  const {
    title,
    name,
    poster_path,
    backdrop_path,
    overview,
    vote_average,
    release_date,
    first_air_date,
    runtime,
    episode_run_time,
    genres,
    tagline,
    status,
    number_of_seasons,
    number_of_episodes,
  } = mediaDetails;
  
  const mediaTitle = title || name || '';
  const releaseDate = release_date || first_air_date || '';
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : '';
  
  // Handle missing poster and backdrop
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/placeholder-poster.jpg';
  
  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : '/placeholder-backdrop.jpg';
  
  // Format runtime
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${remainingMinutes}m`;
  };
  
  // Get duration based on media type
  const getDuration = () => {
    if (mediaType === 'movie' && runtime) {
      return formatRuntime(runtime);
    } else if (mediaType === 'tv' && episode_run_time && episode_run_time.length > 0) {
      return `${formatRuntime(episode_run_time[0])} per episode`;
    }
    return 'N/A';
  };
  
  return (
    <div className="space-y-12 -mt-8">
      {/* Hero Section with Backdrop */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent z-10" />
        <Image
          src={backdropUrl}
          alt={mediaTitle}
          fill
          priority
          className="object-cover"
        />
        
        <div className="absolute inset-0 flex items-end z-20">
          <div className="container mx-auto px-4 pb-12 pt-32">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Poster */}
              <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                <div className="aspect-[2/3] relative overflow-hidden rounded-xl glass-card">
                  <Image
                    src={posterUrl}
                    alt={mediaTitle}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
              
              {/* Details */}
              <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className={`px-2 py-1 rounded ${mediaType === 'movie' ? 'bg-primary-700' : 'bg-secondary-700'}`}>
                    {mediaType === 'movie' ? <FaFilm className="inline mr-1" /> : <FaTv className="inline mr-1" />}
                    {mediaType === 'movie' ? 'Movie' : 'TV Series'}
                  </span>
                  <span className="text-gray-300">
                    {status}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {mediaTitle} {releaseYear && <span className="text-gray-400">({releaseYear})</span>}
                </h1>
                
                {tagline && (
                  <p className="text-xl italic text-gray-300">{tagline}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    <span>{releaseDate ? new Date(releaseDate).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{getDuration()}</span>
                  </div>
                  
                  {mediaType === 'tv' && (
                    <div>
                      <span>{number_of_seasons} {number_of_seasons === 1 ? 'Season' : 'Seasons'}</span>
                      <span className="mx-1">•</span>
                      <span>{number_of_episodes} Episodes</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {genres && genres.map((genre: Genre) => (
                    <span 
                      key={genre.id} 
                      className="px-3 py-1 glass-card text-sm rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className={`text-gray-300 ${!showFullOverview && 'line-clamp-4'}`}>
                    {overview || 'No overview available.'}
                  </p>
                  {overview && overview.length > 280 && (
                    <button 
                      onClick={() => setShowFullOverview(!showFullOverview)} 
                      className="text-primary-400 hover:text-primary-300 mt-1"
                    >
                      {showFullOverview ? 'Show Less' : 'Read More'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recommendations.slice(0, 10).map((item: Movie) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 