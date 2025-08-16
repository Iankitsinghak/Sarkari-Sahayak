'use client';

import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import ProfileDialog from './profile-dialog';
import type { UserProfile } from '@/lib/types';
import { User } from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  onProfileUpdate: (newProfile: UserProfile) => void;
}

export default function Header({ userProfile, onProfileUpdate }: HeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Logo className="h-8 w-8 text-accent" />
        <h1 className="text-xl font-bold font-headline tracking-tight text-foreground">
          Sarkari Sahayak
        </h1>
      </div>
      <ProfileDialog userProfile={userProfile} onProfileUpdate={onProfileUpdate}>
        <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            Profile
        </Button>
      </ProfileDialog>
    </header>
  );
}
