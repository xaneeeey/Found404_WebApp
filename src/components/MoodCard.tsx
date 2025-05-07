import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaSmile, 
  FaSadTear, 
  FaRunning, 
  FaGhost, 
  FaCouch, 
  FaMeh, 
  FaHeart, 
  FaBook 
} from 'react-icons/fa';

interface MoodCardProps {
  mood: string;
  icon: 'happy' | 'sad' | 'excited' | 'scared' | 'relaxed' | 'bored' | 'romantic' | 'thoughtful';
  description: string;
}

const MoodCard: React.FC<MoodCardProps> = ({ mood, icon, description }) => {
  const router = useRouter();
  const currentPath = router.asPath;
  const targetPath = `/mood/${mood.toLowerCase()}`;
  const isCurrentPath = currentPath === targetPath;

  const getIcon = () => {
    switch (icon) {
      case 'happy':
        return <FaSmile className="text-yellow-400 text-4xl" />;
      case 'sad':
        return <FaSadTear className="text-blue-400 text-4xl" />;
      case 'excited':
        return <FaRunning className="text-green-400 text-4xl" />;
      case 'scared':
        return <FaGhost className="text-purple-400 text-4xl" />;
      case 'relaxed':
        return <FaCouch className="text-teal-400 text-4xl" />;
      case 'bored':
        return <FaMeh className="text-gray-400 text-4xl" />;
      case 'romantic':
        return <FaHeart className="text-red-400 text-4xl" />;
      case 'thoughtful':
        return <FaBook className="text-indigo-400 text-4xl" />;
      default:
        return <FaSmile className="text-yellow-400 text-4xl" />;
    }
  };

  // Card content
  const CardContent = () => (
    <div className="mood-card h-full flex flex-col items-center justify-center text-center py-8">
      <div className="mb-4 transform transition-transform group-hover:scale-110">
        {getIcon()}
      </div>
      <h3 className="text-xl font-semibold mb-2 capitalize">{mood}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );

  if (isCurrentPath) {
    return <CardContent />;
  }

  return (
    <Link href={targetPath}>
      <CardContent />
    </Link>
  );
};

export default MoodCard; 