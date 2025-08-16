'use client';

import { useState, useMemo, useEffect } from 'react';
import type { UserProfile, Scheme, ApplicationStatus } from '@/lib/types';
import { defaultProfile } from '@/lib/data';
import { getAllSchemes } from '@/services/scheme-service';
import Header from '@/components/header';
import Dashboard from '@/components/dashboard';
import Chatbot from '@/components/chatbot';
import { recommendSchemes } from '@/ai/flows/recommend-schemes';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { signInWithGoogle } from '@/services/auth-service';
import { User as AuthUser } from 'firebase/auth';

const mapAuthUserToProfile = (user: AuthUser, existingProfile: UserProfile): UserProfile => {
  return {
    ...existingProfile,
    fullName: user.displayName || existingProfile.fullName,
  }
}

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
    if (user) {
        setUserProfile(mapAuthUserToProfile(user, defaultProfile))
    }
  }, [user]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setIsLoadingSchemes(true);
        const schemes = await getAllSchemes();
        setAllSchemes(schemes);
      } catch (error) {
        console.error("Failed to fetch schemes:", error);
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
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
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
      const searchMatch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || scheme.category.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = filters.category === 'all' || scheme.category === filters.category;
      return searchMatch && categoryMatch;
    });
  }, [searchTerm, filters, allSchemes]);

  const toggleBookmark = (schemeName: string) => {
    setBookmarkedSchemes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(schemeName)) {
        newSet.delete(schemeName);
      } else {
        newSet.add(schemeName);
      }
      return newSet;
    });
  };

  const updateApplicationStatus = (schemeName: string, status: ApplicationStatus) => {
    setAppliedSchemes((prev) => ({
      ...prev,
      [schemeName]: status,
    }));
  };
  
  if (loading) {
    return null; // AuthProvider shows a global loader
  }

  if (!user) {
    return (
       <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground p-8 text-center">
            <Logo className="h-16 w-16 text-accent mb-6" />
            <h1 className="text-4xl font-bold font-headline mb-2">Welcome to Sarkari Sahayak</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">Your personal AI guide to discovering and applying for government schemes. Sign in to get personalized recommendations.</p>
            <Button size="lg" onClick={signInWithGoogle}>Sign In with Google</Button>
        </div>
    )
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <Header userProfile={userProfile} onProfileUpdate={setUserProfile} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
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
          onToggleBookmark={toggleBookmark}
          onUpdateStatus={updateApplicationStatus}
        />
      </div>
      <Chatbot />
    </div>
  );
}
