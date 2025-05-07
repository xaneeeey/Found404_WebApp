import React from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';

import MoodCard from '../../components/MoodCard';

export default function MoodPage() {
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

  return (
    <>
      <Head>
        <title>Browse by Mood - Found404</title>
        <meta name="description" content="Find movies and TV shows based on your current mood" />
      </Head>

      <div className="space-y-8">
        {/* Header */}
        <section className="relative py-16 bg-gradient-to-r from-primary-800 to-secondary-800 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-opacity-50 glass-card"></div>
          <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                How Are You Feeling Today?
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Select a mood and we'll recommend the perfect movies and TV shows to match how you're feeling.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mood Cards Grid */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </>
  );
} 