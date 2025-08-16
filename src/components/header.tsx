'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from './logo';
import ProfileDialog from './profile-dialog';
import type { UserProfile } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';
import { signInWithGoogle, signOut } from '@/services/auth-service';
import { User as AuthUser } from 'firebase/auth';
import { LogIn, LogOut, User } from 'lucide-react';

interface HeaderProps {
  userProfile: UserProfile;
  onProfileUpdate: (newProfile: UserProfile) => void;
}

const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length - 1][0];
    }
    return name[0];
}

export default function Header({ userProfile, onProfileUpdate }: HeaderProps) {
  const { user, loading } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Logo className="h-8 w-8 text-accent" />
        <h1 className="text-xl font-bold font-headline tracking-tight text-foreground">
          Sarkari Sahayak
        </h1>
      </div>
      {loading ? null : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ProfileDialog userProfile={userProfile} onProfileUpdate={onProfileUpdate}>
               <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                 <User className="mr-2 h-4 w-4" />
                 <span>Profile</span>
               </DropdownMenuItem>
            </ProfileDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={signInWithGoogle}>
            <LogIn className="mr-2 h-4 w-4" />
            Sign In with Google
        </Button>
      )}
    </header>
  );
}
