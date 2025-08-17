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
};

export default function Header({ userProfile, onProfileUpdate }: HeaderProps) {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between 
                       border-b border-gray-200/40 bg-gradient-to-r from-white via-blue-50 to-green-50 
                       px-4 md:px-8 shadow-sm backdrop-blur-md">
      {/* Left Logo */}
      <div className="flex items-center gap-3">
        <Logo className="h-9 w-9 text-blue-600" />
        <h1 className="text-2xl font-extrabold font-headline tracking-tight 
                       bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          Sarkari Sahayak
        </h1>
      </div>

      {/* Right Side */}
      {loading ? null : user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-11 w-11 rounded-full hover:scale-105 transition-transform">
              <Avatar className="h-11 w-11 ring-2 ring-blue-500/40 shadow-md">
                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-green-500 text-white font-bold">
                  {getInitials(user.displayName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 rounded-xl shadow-lg border border-gray-100" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-gray-900">{user.displayName}</p>
                <p className="text-xs leading-none text-gray-500">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ProfileDialog userProfile={userProfile} onProfileUpdate={onProfileUpdate}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer hover:bg-blue-50">
                <User className="mr-2 h-4 w-4 text-blue-600" />
                <span>Profile</span>
              </DropdownMenuItem>
            </ProfileDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => signOut()} 
              className="cursor-pointer hover:bg-red-50 text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button 
          onClick={signInWithGoogle} 
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium shadow-md 
                     hover:from-green-500 hover:to-blue-500 transition-all duration-300 rounded-full px-5"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Sign In with Google
        </Button>
      )}
    </header>
  );
}
