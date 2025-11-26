import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Default fallback content
const defaultContent = {
  badgeLabel: "Powering UK's Businesses",
  headline: 'We power your business with the best energy deals',
  subheadline: "Orca Business Solutions is a new name, but we're built on real experience.",
  primaryCta: { label: 'Explore Us', link: '/about' },
  secondaryCta: { label: 'Contact Us', link: '/contact' },
  background: {
    type: 'video',
    videoUrl: '/videos/hero-bg-video.mp4',
    imageUrl: '',
    overlay: false,
    overlayOpacity: 40
  },
  particles: {
    enabled: true,
    count: 80,
    color: '#ffffff',
    size: 3,
    speed: 2,
    lineColor: '#ffffff',
    lineOpacity: 0.4,
    interactivity: true
  }
};

/**
 * Custom hook to fetch and manage hero content from API
 * Falls back to default content if API fails or returns no data
 * @returns {Object} { heroContent, loading, error }
 */
export const useHeroContent = () => {
  const [heroContent, setHeroContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchHeroContent = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/hero/active`);
        
        if (isMounted) {
          if (response.data.success && response.data.data) {
            setHeroContent(response.data.data);
          } else {
            // Use default if no active hero
            setHeroContent(defaultContent);
          }
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching hero content:', err);
        if (isMounted) {
          // Use default content on error
          setHeroContent(defaultContent);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHeroContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return { heroContent, loading, error };
};

export default useHeroContent;


