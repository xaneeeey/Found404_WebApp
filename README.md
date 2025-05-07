# Found404 - Movie and TV Show Recommendation System

A web application that recommends movies and TV shows based on your mood or similar to other movies you like. The website features an aesthetically pleasing UI with modern design elements.

## Features

- **Mood-Based Recommendations**: Find content based on how you're feeling
- **Similar Content Recommendations**: Discover movies and shows similar to your favorites
- **Search Functionality**: Search for movies and TV shows by title
- **Detailed Information**: View comprehensive details about each movie and TV show
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **TMDB API**: The Movie Database API for content data

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- TMDB API key (get one from [themoviedb.org](https://www.themoviedb.org/))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/movie-mood.git
   cd movie-mood
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your TMDB API key
   ```
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/
├── src/
│   ├── api/            # API services and types
│   ├── components/     # Reusable React components
│   ├── pages/          # Next.js pages
│   │   ├── _app.tsx    # Custom App component
│   │   ├── index.tsx   # Home page
│   │   ├── search.tsx  # Search page
│   │   ├── mood/       # Mood-based recommendation pages
│   │   └── [mediaType]/# Dynamic routes for movies and TV shows
│   └── styles/         # Global styles
├── public/             # Static assets
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Building for Production

```bash
npm run build
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their comprehensive movie and TV show database
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations 