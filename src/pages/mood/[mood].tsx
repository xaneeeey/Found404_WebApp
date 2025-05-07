import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaSpinner, FaFilm, FaTv } from 'react-icons/fa';

import MovieCard from '../../components/MovieCard';
import { getMoodBasedRecommendations, Movie, moodMap } from '../../api/tmdbApi';

export default function MoodPage() {
  const router = useRouter();
  const { mood } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [mediaType, setMediaType] = useState<'movie' | 'tv' | 'both'>('both');
  
  // Get background image and title based on mood
  const getMoodData = () => {
    switch (mood) {
      case 'happy':
        return {
          title: 'Happy',
          description: 'Comedies and feel-good content to brighten your day',
          bgImage: '/images/mood-happy.jpg',
          color: 'from-yellow-500 to-yellow-600',
        };
      case 'sad':
        return {
          title: 'Sad',
          description: 'Dramas and emotional stories for a good cry',
          bgImage: '/images/mood-sad.jpg',
          color: 'from-blue-500 to-blue-600',
        };
      case 'excited':
        return {
          title: 'Excited',
          description: 'Action-packed adventures to get your adrenaline pumping',
          bgImage: '/images/mood-excited.jpg',
          color: 'from-green-500 to-green-600',
        };
      case 'scared':
        return {
          title: 'Scared',
          description: 'Spine-tingling horrors and thrillers for a frightful night',
          bgImage: '/images/mood-scared.jpg',
          color: 'from-purple-500 to-purple-600',
        };
      case 'relaxed':
        return {
          title: 'Relaxed',
          description: 'Light-hearted and easy-watching content to unwind',
          bgImage: '/images/mood-relaxed.jpg',
          color: 'from-teal-500 to-teal-600',
        };
      case 'bored':
        return {
          title: 'Bored',
          description: 'Exciting and engaging movies to break the monotony',
          bgImage: '/images/mood-bored.jpg',
          color: 'from-gray-500 to-gray-600',
        };
      case 'romantic':
        return {
          title: 'Romantic',
          description: 'Love stories and rom-coms to make your heart flutter',
          bgImage: '/images/mood-romantic.jpg',
          color: 'from-red-500 to-red-600',
        };
      case 'thoughtful':
        return {
          title: 'Thoughtful',
          description: 'Thought-provoking dramas and documentaries',
          bgImage: '/images/mood-thoughtful.jpg',
          color: 'from-indigo-500 to-indigo-600',
        };
      default:
        return {
          title: 'Mood',
          description: 'Find content that matches your mood',
          bgImage: '/images/mood-default.jpg',
          color: 'from-primary-500 to-primary-600',
        };
    }
  };
  
  const moodData = getMoodData();
  
  // Fetch recommendations based on mood and media type
  useEffect(() => {
    if (!mood) return;
    
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        
        // Check if mood is valid
        if (typeof mood === 'string' && !moodMap[mood.toLowerCase()]) {
          setError('Invalid mood selection');
          setLoading(false);
          return;
        }
        
        const results = await getMoodBasedRecommendations(
          typeof mood === 'string' ? mood.toLowerCase() : '',
          mediaType
        );
        
        setRecommendations(results);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to fetch recommendations. Please try again.');
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [mood, mediaType]);
  
  // Handle media type filter change
  const handleMediaTypeChange = (type: 'movie' | 'tv' | 'both') => {
    setMediaType(type);
  };
  
  if (!mood) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden rounded-xl">
        <div className={`absolute inset-0 bg-gradient-to-r ${moodData.color} opacity-80 z-10`} />
        <div className="absolute inset-0 glass-card opacity-30" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
              {moodData.title} Mood
            </h1>
            <p className="text-xl">
              {moodData.description}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="flex gap-4">
        <button
          onClick={() => handleMediaTypeChange('both')}
          className={`custom-btn ${mediaType === 'both' ? 'bg-white/20' : ''}`}
        >
          All Content
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
      
      {/* Recommendations */}
      <section>
        {loading ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <FaSpinner className="text-4xl animate-spin mb-4" />
            <p>Finding the perfect content for your mood...</p>
          </div>
        ) : error ? (
          <div className="min-h-[30vh] flex items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="min-h-[30vh] flex items-center justify-center">
            <p>No recommendations found for this mood. Try another mood or media type.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {recommendations.map((item: Movie) => (
              <MovieCard key={`${item.media_type}-${item.id}`} movie={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 