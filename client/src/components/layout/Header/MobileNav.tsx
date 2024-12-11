import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../../../types/auth';

interface MobileNavProps {
  isOpen: boolean;
  user: User | null;
  onLogout: () => void;
}

export function MobileNav({ isOpen, user, onLogout }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 space-y-4">
      <Link to="/dashboard" className="block py-2 hover:text-emerald-200">Dashboard</Link>
      <Link to="/marketplace" className="block py-2 hover:text-emerald-200">Marketplace</Link>
      <Link to="/learn" className="block py-2 hover:text-emerald-200">Learn</Link>
      <Link to="/community" className="block py-2 hover:text-emerald-200">Community</Link>
      {user && (
        <>
          <div className="py-2 text-emerald-200">Welcome, {user.name}</div>
          <button
            onClick={onLogout}
            className="block w-full text-left py-2 hover:text-emerald-200"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}