'use client';

import type { UserProfile, Scheme, ApplicationStatus } from '@/lib/types';
import { schemeCategories } from '@/lib/data';
import SchemeCard from './scheme-card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Landmark, Search } from 'lucide-react';

interface DashboardProps {
  userProfile: UserProfile;
  recommendedSchemes: Scheme[];
  isLoadingRecommendations: boolean;
  allSchemes: Scheme[];
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  filters: { [key: string]: string };
  onFiltersChange: (filters: { [key: string]: string }) => void;
  bookmarkedSchemes: Set<string>;
  appliedSchemes: Record<string, ApplicationStatus>;
  onToggleBookmark: (schemeName: string) => void;
  onUpdateStatus: (schemeName: string, status: ApplicationStatus) => void;
}

export default function Dashboard({
  userProfile,
  recommendedSchemes,
  isLoadingRecommendations,
  allSchemes,
  searchTerm,
  onSearchTermChange,
  filters,
  onFiltersChange,
  bookmarkedSchemes,
  appliedSchemes,
  onToggleBookmark,
  onUpdateStatus,
}: DashboardProps) {
  
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, {userProfile.fullName}!</h1>
        <p className="text-muted-foreground">Here are government schemes tailored for you and a directory to explore.</p>
      </div>

      {/* Recommended Schemes */}
      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Recommended For You</h2>
        {isLoadingRecommendations ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
          </div>
        ) : recommendedSchemes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.name}
                scheme={scheme}
                isBookmarked={bookmarkedSchemes.has(scheme.name)}
                applicationStatus={appliedSchemes[scheme.name] || 'Not Applied'}
                onToggleBookmark={onToggleBookmark}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </div>
        ) : (
          <Alert>
            <Landmark className="h-4 w-4" />
            <AlertTitle>No Recommendations Yet</AlertTitle>
            <AlertDescription>
              We couldn't find specific recommendations based on your profile. Try exploring all schemes below or refining your profile.
            </AlertDescription>
          </Alert>
        )}
      </section>

      {/* All Schemes */}
      <section>
        <h2 className="text-2xl font-semibold font-headline mb-4">Explore All Schemes</h2>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by scheme name or keyword..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
            />
          </div>
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {schemeCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {allSchemes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.name}
                scheme={scheme}
                isBookmarked={bookmarkedSchemes.has(scheme.name)}
                applicationStatus={appliedSchemes[scheme.name] || 'Not Applied'}
                onToggleBookmark={onToggleBookmark}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No schemes found matching your criteria.</p>
        )}
      </section>
    </div>
  );
}
