import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-emerald-700 text-white">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">RuralRise</Link>
          
          <DesktopNav user={user} onLogout={handleLogout} />

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <MobileNav
          isOpen={isMenuOpen}
          user={user}
          onLogout={handleLogout}
        />
      </nav>
    </header>
  );
}