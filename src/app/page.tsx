'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { signInWithGoogle } from '@/services/auth-service';
import { useAuth } from '@/hooks/use-auth';
import Header from '@/components/header';
import Dashboard from '@/components/dashboard';
import Chatbot from '@/components/chatbot';
import { useState, useMemo, useEffect } from 'react';
import type { UserProfile, Scheme, ApplicationStatus } from '@/lib/types';
import { defaultProfile } from '@/lib/data';
import { getAllSchemes } from '@/services/scheme-service';
import { recommendSchemes } from '@/ai/flows/recommend-schemes';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Globe, Zap } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [allSchemes, setAllSchemes] = useState<Scheme[]>([]);
  const [recommendedSchemes, setRecommendedSchemes] = useState<Scheme[]>([]);
  const [isLoadingSchemes, setIsLoadingSchemes] = useState(true);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    category: 'all',
    state: 'all',
  });
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<Set<string>>(new Set());
  const [appliedSchemes, setAppliedSchemes] = useState<Record<string, ApplicationStatus>>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setIsLoadingSchemes(true);
        const schemes = await getAllSchemes();
        setAllSchemes(schemes);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load government schemes. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingSchemes(false);
      }
    };
    fetchSchemes();
  }, [toast]);

  useEffect(() => {
    if (allSchemes.length === 0 || !user) return;

    const fetchRecommendations = async () => {
      setIsLoadingRecommendations(true);
      try {
        const recommendations = await recommendSchemes({ profile: userProfile, schemes: allSchemes });
        const fullRecommendedSchemes = recommendations
          .map((rec) => {
            const fullScheme = allSchemes.find((s) => s.name === rec.name);
            return fullScheme ? { ...fullScheme, summary: rec.summary } : null;
          })
          .filter((s): s is Scheme => s !== null);
        setRecommendedSchemes(fullRecommendedSchemes);
      } catch {
        toast({
          title: "AI Error",
          description: "Could not get AI recommendations. Please check your profile and try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [userProfile, allSchemes, toast, user]);

  const filteredSchemes = useMemo(() => {
    return allSchemes.filter((scheme) => {
      const searchMatch =
        scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = filters.category === 'all' || scheme.category === filters.category;
      return searchMatch && categoryMatch;
    });
  }, [searchTerm, filters, allSchemes]);

  if (loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 text-center relative overflow-hidden">
        
        {/* Floating gradient blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <Logo className="h-20 w-20 mx-auto text-green-500 mb-6" />
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-emerald-500 bg-clip-text text-transparent mb-6">
            Sarkari Sahayak
          </h1>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your trusted AI-powered guide to <span className="font-semibold text-blue-600">government schemes</span>.  
            Find benefits faster, apply smarter, and unlock opportunities 🚀
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg shadow-green-200 transition-all duration-300 transform hover:scale-105"
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </motion.div>

        {/* Features section */}
        <motion.div
          className="mt-24 grid gap-8 md:grid-cols-3 max-w-6xl z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            { 
              title: "AI Recommendations", 
              desc: "Schemes tailored to your profile instantly.", 
              icon: <Lightbulb className="h-8 w-8 text-green-500" /> 
            },
            { 
              title: "All Schemes in One Place", 
              desc: "No more searching 1000+ websites manually.", 
              icon: <Globe className="h-8 w-8 text-blue-500" /> 
            },
            { 
              title: "Easy Applications", 
              desc: "Auto-filled forms for faster access to benefits.", 
              icon: <Zap className="h-8 w-8 text-emerald-500" /> 
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white rounded-3xl shadow-lg p-8 text-left border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 text-lg">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 text-gray-900">
      <Header userProfile={userProfile} onProfileUpdate={setUserProfile} />
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <Dashboard
          userProfile={userProfile}
          recommendedSchemes={recommendedSchemes}
          isLoadingRecommendations={isLoadingRecommendations || isLoadingSchemes}
          allSchemes={filteredSchemes}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          filters={filters}
          onFiltersChange={setFilters}
          bookmarkedSchemes={bookmarkedSchemes}
          appliedSchemes={appliedSchemes}
          onToggleBookmark={(name) =>
            setBookmarkedSchemes((prev) => {
              const newSet = new Set(prev);
              newSet.has(name) ? newSet.delete(name) : newSet.add(name);
              return newSet;
            })
          }
          onUpdateStatus={(name, status) =>
            setAppliedSchemes((prev) => ({ ...prev, [name]: status }))
          }
        />
      </div>
      <Chatbot />
    </div>
  );
}
