import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { Movie } from '../api/tmdbApi';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, priority = false }) => {
  const {
    id,
    title,
    name,
    poster_path,
    vote_average,
    media_type,
    release_date,
    first_air_date,
  } = movie;

  // Handle missing poster
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : '/placeholder-poster.jpg';

  // Format date (release_date for movies, first_air_date for TV)
  const date = release_date || first_air_date || '';
  const year = date ? new Date(date).getFullYear() : '';

  return (
    <div className="movie-card group">
      <Link href={`/${media_type}/${id}`}>
        <div className="aspect-[2/3] relative overflow-hidden">
          <Image
            src={posterUrl}
            alt={title || name || 'Media poster'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105 duration-300"
            priority={priority}
          />
          <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <FaStar />
            <span>{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          <div className="movie-info">
            <h3 className="font-semibold text-lg truncate">
              {title || name}
            </h3>
            <div className="flex items-center justify-between mt-1 text-sm text-gray-300">
              <span>
                {media_type === 'movie' ? 'Movie' : 'TV'}
                {year ? ` • ${year}` : ''}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard; 