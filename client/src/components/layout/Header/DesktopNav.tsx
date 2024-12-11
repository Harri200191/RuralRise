import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, BookOpen, Users, Home } from 'lucide-react';
import { UserMenu } from './UserMenu';
import type { User } from '../../../types/auth';

interface DesktopNavProps {
  user: User | null;
  onLogout: () => void;
}

export function DesktopNav({ user, onLogout }: DesktopNavProps) {
  return (
    <div className="hidden md:flex items-center space-x-6">
      <Link to="/dashboard" className="flex items-center space-x-1 hover:text-emerald-200">
        <Home size={18} />
        <span>Dashboard</span>
      </Link>
      <Link to="/marketplace" className="flex items-center space-x-1 hover:text-emerald-200">
        <ShoppingBag size={18} />
        <span>Marketplace</span>
      </Link>
      <Link to="/learn" className="flex items-center space-x-1 hover:text-emerald-200">
        <BookOpen size={18} />
        <span>Learn</span>
      </Link>
      <Link to="/community" className="flex items-center space-x-1 hover:text-emerald-200">
        <Users size={18} />
        <span>Community</span>
      </Link>
      
      {user && <UserMenu user={user} onLogout={onLogout} />}
    </div>
  );
}