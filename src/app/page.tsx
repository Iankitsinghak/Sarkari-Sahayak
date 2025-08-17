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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo className="h-20 w-20 mx-auto text-green-500 mb-6" />
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-4">
            Sarkari Sahayak
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Discover every government scheme you’re eligible for — powered by AI, made for India 🇮🇳
          </p>
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg"
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </motion.div>

        {/* Features section */}
        <motion.div
          className="mt-20 grid gap-6 md:grid-cols-3 max-w-5xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            { title: "AI Recommendations", desc: "Get schemes tailored to your profile instantly." },
            { title: "All Schemes in One Place", desc: "No more searching 1000+ websites manually." },
            { title: "Easy Applications", desc: "Auto-filled forms, faster access to benefits." },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="bg-white rounded-2xl shadow-md p-6 text-left border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-white text-gray-900">
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
