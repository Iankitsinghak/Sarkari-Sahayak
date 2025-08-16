'use client';

import { useState, useMemo, useEffect } from 'react';
import type { UserProfile, Scheme, ApplicationStatus } from '@/lib/types';
import { schemes as allSchemes, defaultProfile } from '@/lib/data';
import Header from '@/components/header';
import Dashboard from '@/components/dashboard';
import Chatbot from '@/components/chatbot';
import { recommendSchemes } from '@/ai/flows/recommend-schemes';

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [recommendedSchemes, setRecommendedSchemes] = useState<Scheme[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    category: 'all',
    state: 'all',
  });

  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<Set<string>>(new Set());
  const [appliedSchemes, setAppliedSchemes] = useState<Record<string, ApplicationStatus>>({});

  useEffect(() => {
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
        // Optionally, show a toast to the user
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [userProfile]);

  const filteredSchemes = useMemo(() => {
    return allSchemes.filter((scheme) => {
      const searchMatch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) || scheme.category.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = filters.category === 'all' || scheme.category === filters.category;
      // Note: State filtering is not implemented on mock data, but this is where it would go
      // const stateMatch = filters.state === 'all' || scheme.eligibility.toLowerCase().includes(filters.state.toLowerCase());
      return searchMatch && categoryMatch;
    });
  }, [searchTerm, filters]);

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

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      <Header userProfile={userProfile} onProfileUpdate={setUserProfile} />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Dashboard
            userProfile={userProfile}
            recommendedSchemes={recommendedSchemes}
            isLoadingRecommendations={isLoadingRecommendations}
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
        </main>
        <aside className="hidden w-[350px] flex-shrink-0 border-l border-border bg-card p-4 lg:flex">
          <Chatbot />
        </aside>
      </div>
    </div>
  );
}
