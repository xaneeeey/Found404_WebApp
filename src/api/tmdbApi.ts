import axios from 'axios';

// Replace with your TMDB API key or use environment variable
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || 'YOUR_TMDB_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
  genre_ids: number[];
}

export interface MoodMap {
  [key: string]: {
    genres: number[];
    keywords?: string[];
    type?: 'movie' | 'tv' | 'both';
  };
}

// Map moods to genre IDs
export const moodMap: MoodMap = {
  happy: { 
    genres: [35, 10751, 12], // Comedy, Family, Adventure
    type: 'both'
  },
  sad: { 
    genres: [18, 10749], // Drama, Romance
    type: 'both'
  },
  excited: { 
    genres: [28, 12, 14], // Action, Adventure, Fantasy
    type: 'both' 
  },
  scared: { 
    genres: [27, 9648, 53], // Horror, Mystery, Thriller
    type: 'both'
  },
  relaxed: { 
    genres: [35, 16, 10751], // Comedy, Animation, Family
    type: 'both'
  },
  bored: { 
    genres: [28, 12, 878], // Action, Adventure, Science Fiction
    type: 'both'
  },
  romantic: { 
    genres: [10749, 35], // Romance, Comedy
    type: 'both'
  },
  thoughtful: { 
    genres: [18, 36, 99], // Drama, History, Documentary
    type: 'both'
  },
};

// Genre map for reference
export const genreMap = {
  movie: {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  },
  tv: {
    10759: 'Action & Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    10762: 'Kids',
    9648: 'Mystery',
    10763: 'News',
    10764: 'Reality',
    10765: 'Sci-Fi & Fantasy',
    10766: 'Soap',
    10767: 'Talk',
    10768: 'War & Politics',
    37: 'Western',
  },
};

// Search for movies/TV shows
export const searchMedia = async (query: string, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query,
        page,
      },
    });
    
    return response.data.results.filter(
      (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
    );
  } catch (error) {
    console.error('Error searching media:', error);
    return [];
  }
};

// Get movie recommendations based on a movie ID
export const getMovieRecommendations = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/recommendations`, {
      params: {
        api_key: API_KEY,
      },
    });
    
    return response.data.results.map((movie: any) => ({
      ...movie,
      media_type: 'movie',
    }));
  } catch (error) {
    console.error('Error getting movie recommendations:', error);
    return [];
  }
};

// Get TV show recommendations based on a TV show ID
export const getTvRecommendations = async (tvId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${tvId}/recommendations`, {
      params: {
        api_key: API_KEY,
      },
    });
    
    return response.data.results.map((tv: any) => ({
      ...tv,
      media_type: 'tv',
    }));
  } catch (error) {
    console.error('Error getting TV recommendations:', error);
    return [];
  }
};

// Get trending movies and TV shows
export const getTrending = async (mediaType: 'movie' | 'tv' | 'all' = 'all', timeWindow: 'day' | 'week' = 'week') => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/${mediaType}/${timeWindow}`, {
      params: {
        api_key: API_KEY,
      },
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error getting trending media:', error);
    return [];
  }
};

// Get recommendations based on mood
export const getMoodBasedRecommendations = async (mood: string, mediaType: 'movie' | 'tv' | 'both' = 'both') => {
  try {
    if (!moodMap[mood]) {
      throw new Error(`Invalid mood: ${mood}`);
    }
    
    const { genres } = moodMap[mood];
    const moodMediaType = moodMap[mood].type || 'both';
    
    // Determine which API endpoints to query based on mediaType and moodMediaType
    const endpoints: ('movie' | 'tv')[] = [];
    if ((mediaType === 'movie' || mediaType === 'both') && (moodMediaType === 'movie' || moodMediaType === 'both')) {
      endpoints.push('movie');
    }
    if ((mediaType === 'tv' || mediaType === 'both') && (moodMediaType === 'tv' || moodMediaType === 'both')) {
      endpoints.push('tv');
    }
    
    // Query all relevant endpoints
    const results: Movie[] = [];
    for (const endpoint of endpoints) {
      const response = await axios.get(`${BASE_URL}/discover/${endpoint}`, {
        params: {
          api_key: API_KEY,
          with_genres: genres.join(','),
          sort_by: 'popularity.desc',
        },
      });
      
      results.push(...response.data.results.map((item: any) => ({
        ...item,
        media_type: endpoint,
      })));
    }
    
    // Randomize results to get a mix of movies and TV shows
    return results.sort(() => Math.random() - 0.5).slice(0, 20);
  } catch (error) {
    console.error(`Error getting ${mood} recommendations:`, error);
    return [];
  }
};

// Get movie or TV show details
export const getMediaDetails = async (id: number, mediaType: 'movie' | 'tv') => {
  try {
    const response = await axios.get(`${BASE_URL}/${mediaType}/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    
    return {
      ...response.data,
      media_type: mediaType,
    };
  } catch (error) {
    console.error(`Error getting ${mediaType} details:`, error);
    return null;
  }
}; 