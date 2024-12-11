import React from 'react';
import { LogOut } from 'lucide-react';
import type { User } from '../../../types/auth';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-emerald-200">
        Welcome, {user.name}
      </span>
      <button
        onClick={onLogout}
        className="flex items-center space-x-1 hover:text-emerald-200"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
}