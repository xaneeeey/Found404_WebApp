import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaFilm, FaTv, FaSmile, FaSearch } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
}

interface NavLinkProps {
  href: string;
  className: string;
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const NavLink: React.FC<NavLinkProps> = ({ href, className, children }) => {
    const isActive = currentPath === href;
    
    // If already on the page, use div instead of Link
    if (isActive) {
      return (
        <div className={`${className} ${isActive ? 'text-primary-400' : ''}`}>
          {children}
        </div>
      );
    }
    
    return (
      <Link href={href} className={`${className} ${isActive ? 'text-primary-400' : ''}`}>
        {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-card sticky top-0 z-50 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink href="/" className="text-2xl font-bold flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
            <FaFilm className="text-primary-500" />
            <span>Found404</span>
          </NavLink>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink href="/" className="hover:text-primary-400 transition-colors">
              Home
            </NavLink>
            <NavLink href="/movies" className="hover:text-primary-400 transition-colors flex items-center gap-1">
              <FaFilm /> Movies
            </NavLink>
            <NavLink href="/tv-shows" className="hover:text-primary-400 transition-colors flex items-center gap-1">
              <FaTv /> TV Shows
            </NavLink>
            <NavLink href="/mood" className="hover:text-primary-400 transition-colors flex items-center gap-1">
              <FaSmile /> Mood
            </NavLink>
          </nav>
          
          <div className="flex items-center gap-4">
            <NavLink href="/search" className="custom-btn !py-2 flex items-center gap-2">
              <FaSearch />
              <span className="hidden md:inline">Search</span>
            </NavLink>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="glass-card mt-auto">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <NavLink href="/" className="text-xl font-bold flex items-center gap-2">
                <FaFilm className="text-primary-500" />
                <span>Found404</span>
              </NavLink>
              <p className="mt-2 text-sm text-gray-400">Find your perfect movie or TV show based on your mood.</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h3 className="font-semibold mb-2">Navigate</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li><NavLink href="/" className="hover:text-white transition-colors">Home</NavLink></li>
                  <li><NavLink href="/movies" className="hover:text-white transition-colors">Movies</NavLink></li>
                  <li><NavLink href="/tv-shows" className="hover:text-white transition-colors">TV Shows</NavLink></li>
                  <li><NavLink href="/mood" className="hover:text-white transition-colors">Mood</NavLink></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Legal</h3>
                <ul className="space-y-1 text-sm text-gray-400">
                  <li><NavLink href="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink></li>
                  <li><NavLink href="/terms" className="hover:text-white transition-colors">Terms of Service</NavLink></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Found404. Powered by TMDB API.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 